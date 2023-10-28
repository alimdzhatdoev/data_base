import {
  schema
} from './config_db.js';

import {
  menu_tabs,
  comeBack,
  createMenuNames,
  createMenuTabs
} from './menu_tabs.js';

export async function addData(data, fileName) {
  const jsonData = JSON.stringify(data);
  const id = generateId();

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "./dataBase/server/save-json.php",
      data: {
        id: id,
        json: jsonData,
        docName: fileName
      },
      success: function (response) {
        resolve(response); // Разрешение обещания с ответом
      },
      error: function (err) {
        reject(err); // Отклонение обещания с ошибкой
        console.error(err);
      }
    });
  });
}

export async function editOne(data, fileName, schema) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    const schemaData = JSON.stringify(schema[fileName]);

    $.ajax({
      type: "POST",
      url: "./dataBase/server/edit-json.php",
      data: {
        schemaData: schemaData,
        json: jsonData,
        docName: fileName
      },
      success: function (response) {
        resolve(response); // Разрешение обещания с ответом
      },
      error: function (err) {
        reject(err); // Отклонение обещания с ошибкой
        console.error(err);
      }
    });
  });
}

export async function getData(fileName, id = "") {
  let timestamp = new Date().getTime();
  const jsonFile = "./dataBase/storage/" + fileName + ".json" + '?t=' + timestamp;

  return new Promise((resolve, reject) => {
    fetch(jsonFile)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (id) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
              resolve(data[i]);
              return;
            }
          }
        } else {
          resolve(data);
        }
      })
      .catch(error => {
        reject(error);
        console.error('There was a problem with the fetch operation:', error);
      });
  });
}

export async function delOne(fileName, id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "./dataBase/server/del-json.php",
      data: {
        id: id,
        docName: fileName
      },
      success: function (response) {
        resolve(response); // Разрешение обещания с ответом
      },
      error: function (err) {
        reject(err); // Отклонение обещания с ошибкой
        console.error(err);
      }
    });
  });
}

// img

export async function saveOneImg(imgID) {
  return new Promise((resolve, reject) => {
    var fileInput = $(`${imgID}`)[0];
    var file = fileInput.files[0];

    if (file) {
      var formData = new FormData();
      formData.append('file', file);

      $.ajax({
        url: "./dataBase/server/save-one-img.php",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error);
        }
      });
    } else {
      reject('Файл не выбран.');
    }
  });
}

export async function delOneImg(fileName, id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "./dataBase/server/del-img.php",
      data: {
        id: id,
        fileName: fileName
      },
      success: function (response) {
        resolve(response); // Разрешение обещания с ответом
      },
      error: function (err) {
        reject(err); // Отклонение обещания с ошибкой
        console.error(err);
      }
    });
  });
}

// end img

export function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getTextEditor(fileName) {
  return (
    tinymce.init({
      selector: fileName,
      plugins: [
        'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
        'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
        'table', 'emoticons', 'template', 'help'
      ],
      toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
        'forecolor backcolor emoticons | help',
      menubar: 'favs file edit view insert format tools table help',
    })
  )
}


export function showData(fileName) {
  getData(fileName)
      .then(response => {
          $(`.admin_info__elem[data_info = ${fileName}] .admin_info__item___content`).text("");
          for (let i = response.length - 1; i >= 0; i--) {
              $(`.admin_info__elem[data_info = ${fileName}] .admin_info__item___content`).append(`
              <div class="admin_info__item___content____element">
                  <div class="admin_info__item___content____element_____title">
                      <img src="img/${response[i].img}" alt="" />
                      ${response[i].title}
                  </div>
                  <div class="admin_info__item___content____element_____btnHover">
                      <div class="admin_info__item___content____element_____btnHover______title ${fileName}Edit" idToEdit="${response[i].id}">Изменить
                      </div>
                      <div class="admin_info__item___content____element_____btnHover______title ${fileName}Delete delete" idTodel="${response[i].id}">
                          Удалить</div>
                  </div>
              </div>
          `)
          }
      })
      .catch(error => {
          console.error('Ошибка:', error);
      });
}


export function makeData(idBlock) {
  showData(idBlock)

  $(`#save${idBlock}`).click(function () {
      const data = schema();
      let newObject = {};

      for (const category in data) {
          if (category == idBlock) {
              for (const subItem in data[category]) {
                  if (subItem != "menuName") {
                      if (data[category][subItem].element == "input") {
                          newObject[subItem] = $(`#${category}_${subItem}`).val();
                      }
                      if (data[category][subItem].element == "textarea") {
                          let content = tinymce.get(`${category}_${subItem}`).getContent();
                          let data = {
                              content: content
                          };

                          let jsonContent = JSON.stringify(data);
                          newObject[subItem] = jsonContent;
                      }
                  }
              }
          }
      }

      saveOneImg(`#${idBlock}_img`)
          .then(
              (response) => {
                  newObject["img"] = response;

                  addData(newObject, `${idBlock}`)
                      .then(response => {
                          showData(idBlock)
                      })
                      .catch(error => {
                          console.error('Ошибка:', error);
                      });

                  const data = schema();

                  for (const category in data) {
                      if (category == idBlock) {
                          for (const subItem in data[category]) {
                              if (subItem != "menuName") {
                                  if (data[category][subItem].element == "input") {
                                      $(`#${category}_${subItem}`).val("");
                                  }
                                  if (data[category][subItem].element == "textarea") {
                                      tinymce.get(`${category}_${subItem}`).setContent("");
                                  }
                              }
                          }
                      }
                  }

                  alert("Запись сохранена");
              },
          )
          .catch((error) => {
              console.error('Ошибка:', error);
          });
  });

  $('.admin_info__item___content').on('click', `.${idBlock}Delete`, function () {
      let id = $(this).attr("idTodel");

      delOne(idBlock, id)
          .then(response => {
              showData(idBlock)
              alert("Запись удалена");
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });

      delOneImg(idBlock, id)
          .catch(error => {
              console.error('Ошибка:', error);
          });
  })

  $('.admin_info__item___content').on('click', `.${idBlock}Edit`, function () {
      let id = $(this).attr("idToEdit");

      getData(idBlock, id)
          .then(response => {
              $(".admin_info__elem").hide();

              $(".admin_info__elem[data_info='edit_element']").show();

              $(".admin_info__changeElem___data").empty();

              $(".admin_info__changeElem___data").append(
                  `<div class="comeBack"><img src="img/icons/left-arrow.png" />Вернуться назад</div>`
              );

              const data = schema();

              for (const category in data) {
                  if (category == idBlock) {
                      for (const subItem in data[category]) {
                          if (subItem != "menuName") {
                              if (data[category][subItem].element == "input") {
                                  if (data[category][subItem].type == "file") {
                                      $(".admin_info__changeElem___data").append(`
                                          <div class="admin_info__changeElem___data____header ">${data[category][subItem].name}</div>
                                              <div class="admin_info__changeElem___data____img">
                                                  <img src="img/${response.img}" alt="" />
                                              </div>
                                          <input type="${data[category][subItem].type}" class="admin_info__changeElem___data____file changeBlock_${subItem}" value="${response[subItem]}" />
                                      `);
                                  } else {
                                      $(".admin_info__changeElem___data").append(`
                                          <div class="admin_info__changeElem___data____header">${data[category][subItem].name}</div>
                                          <input type="${data[category][subItem].type}" class="admin_info__changeElem___data____title changeBlock_${subItem}" value="${response[subItem]}" />
                                      `);
                                  }
                              }
                              if (data[category][subItem].element == "textarea") {
                                  $(".admin_info__changeElem___data").append(`
                                      <div class="admin_info__changeElem___data____header">${data[category][subItem].name}</div>
                                      <textarea class="admin_info__changeElem___data____text" id="${subItem}TextEdit" ></textarea>
                                  `);

                                  getTextEditor(`#${subItem}TextEdit`).then(function () {
                                      var data = JSON.parse(response.text);
                                      // console.log(data);
                                      tinymce.get(`${subItem}TextEdit`).setContent(data.content);
                                  });
                              }
                          }
                      }
                  }
              }
              $(".admin_info__changeElem___data").append(
                  `<button class="admin_info__changeElem___data____btn ${idBlock}_change_btn" ${idBlock}_change_id="${id}">Сохранить изменения</button>`
              );
          })
  })

  $(".admin_info__elem").on("click", ".comeBack", function () {
      comeBack();
  })

  $(".admin_info__elem").on("click", `.${idBlock}_change_btn`, function () {
      let fileInput = $(`.admin_info__changeElem___data____file`)[0];

      if (fileInput && fileInput.files && fileInput.files.length > 0) {
          saveOneImg('.admin_info__changeElem___data____file')
              .then((response) => {
                  const data = schema();
                  let newObject = {};

                  for (const category in data) {
                      if (category == idBlock) {
                          for (const subItem in data[category]) {
                              if (subItem != "menuName") {
                                  if (data[category][subItem].element == "input") {
                                      newObject[subItem] = $(`.changeBlock_${subItem}`).val();
                                  }
                                  if (data[category][subItem].element == "textarea") {
                                      let content = tinymce.get(`${subItem}TextEdit`).getContent();
                                      let data = {
                                          content: content
                                      };

                                      let jsonContent = JSON.stringify(data);
                                      newObject[subItem] = jsonContent;
                                  }
                              }
                          }
                      }
                  }

                  newObject.img = response;

                  newObject.id = $(this).attr(`${idBlock}_change_id`);

                  delOneImg(`${idBlock}`, newObject.id)
                      .catch(error => {
                          console.error('Ошибка:', error);
                      });

                  editOne(newObject, `${idBlock}`, schema())
                      .then(response => {
                          comeBack();
                          showData(idBlock);
                          console.log(response);
                      })
                      .catch(error => {
                          console.error('Ошибка:', error);
                      });
              })
              .catch((error) => {
                  console.error('Ошибка:', error);
              });
      } else {
          const data = schema();
          let newObject = {};

          for (const category in data) {
              if (category == idBlock) {
                  for (const subItem in data[category]) {
                      if (subItem != "menuName") {
                          if (data[category][subItem].element == "input") {
                              newObject[subItem] = $(`.changeBlock_${subItem}`).val();
                          }
                          if (data[category][subItem].element == "textarea") {
                              let content = tinymce.get(`${subItem}TextEdit`).getContent();
                              let data = {
                                  content: content
                              };

                              let jsonContent = JSON.stringify(data);
                              newObject[subItem] = jsonContent;
                          }
                      }
                  }
              }
          }

          newObject.id = $(this).attr(`${idBlock}_change_id`);

          editOne(newObject, `${idBlock}`, schema())
              .then(response => {
                  comeBack();
                  showData(idBlock);
                  console.log(response);
              })
              .catch(error => {
                  console.error('Ошибка:', error);
              });
      }
  })
}