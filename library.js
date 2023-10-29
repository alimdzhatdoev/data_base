import {
  schema
} from './config_db.js';

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

export async function editOneDeleteImg(data, fileName, schema) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    const schemaData = JSON.stringify(schema[fileName]);

    $.ajax({
      type: "POST",
      url: "./dataBase/server/edit-one-delete-img-json.php",
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

export async function saveImg(imgID) {
  return new Promise((resolve, reject) => {
    var fileInput = $(`${imgID}`)[0];
    var files = fileInput.files;

    if (files.length > 0) {
      var formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file[]', files[i]);
      }

      $.ajax({
        url: "./dataBase/server/save-img.php",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(JSON.parse(response));
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

export async function changeImg(filesToSave) {
  return new Promise((resolve, reject) => {
    if (filesToSave) {
      var formData = new FormData();
      for (let i = 0; i < filesToSave.length; i++) {
        formData.append('file[]', filesToSave[i]);
      }

      $.ajax({
        url: "./dataBase/server/save-img.php",
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

export async function delImg(fileName, id) {
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

export async function delOneImg(fileName, imgName) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "./dataBase/server/del-one-img.php",
      data: {
        imgName: imgName,
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
                      <img src="img/${response[i].img[0]}" alt="" />
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

    saveImg(`#${idBlock}_img`)
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

    delImg(idBlock, id)
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

        function showImgChange(response, type, name) {
          let str = "";
          for (let i = 0; i < response.img.length; i++) {
            str += `
              <div class="admin_info__changeElem___data____img" data_del_block=${response.img[i]}>
                <img src="img/${response.img[i]}" data_change="${response.img[i]}" alt="" />
                <div class="admin_info__changeElem___data____img__delete" data_del_block=${response.img[i]} data_idBlock_toDel=${response.id}>Удалить</div>
              </div>
              <input type="${type}" class="admin_info__changeElem___data____file changeBlock_${name}__${i}" data_del_block=${response.img[i]} oldName=${response.img[i]} />
            `;
          }
          return str;
        }

        $(`.admin_info__changeElem`).on("click", `.admin_info__changeElem___data____img__delete`, function () {
          let thisData = $(this).attr("data_del_block");
          let thisID = $(this).attr("data_idBlock_toDel");

          let removeBlock = $(`.admin_info__changeElem___data____img`);
          let remInput = $(`.admin_info__changeElem___data____file`)

          for (let i = 0; i < removeBlock.length; i++) {

            let removeBlockAttr = removeBlock[i].attributes["data_del_block"].value;
            let remInputAttr = remInput[i].attributes["data_del_block"].value;

            if (thisData == removeBlockAttr) {
              $(`.admin_info__changeElem___data____img[data_del_block="${removeBlockAttr}"]`).remove();
              $(`.admin_info__changeElem___data____file[data_del_block="${remInputAttr}"]`).remove();

              let delImg = {
                img: [thisData],
                id: thisID
              }

              delOneImg(idBlock, thisData);
              editOneDeleteImg(delImg, idBlock, schema())
                .then(response => {
                  console.log(response);
                });
            }

          }


        });

        for (const category in data) {
          if (category == idBlock) {
            for (const subItem in data[category]) {
              if (subItem != "menuName") {
                if (data[category][subItem].element == "input") {
                  if (data[category][subItem].type == "file") {
                    $(".admin_info__changeElem___data").append(`
                        <div class="admin_info__changeElem___data____header ">${data[category][subItem].name}</div>
                        ${showImgChange(response, data[category][subItem].type, subItem)}   
                        
                        <label>Добавить еще картинки</label>
                        <input type="file" multiple class="admin_info__changeElem___data____file changeBlock__${subItem}___addMore" />
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

    let filesToSave = [];
    let filesToDel = [];

    let inputs = $(".admin_info__changeElem___data____file");


    for (let i = 0; i < inputs.length - 1; i++) {
      if (inputs[i].files && inputs[i].files.length > 0) {
        filesToSave.push(inputs[i].files[0]);
        filesToDel.push(inputs[i].attributes["oldName"].nodeValue);
      }
    }

    // console.log(filesToDel);

    let addInputs = $(".changeBlock__img___addMore");

    for (let i = 0; i < addInputs[0].files.length; i++) {
      if (addInputs[0].files[i]) {
        filesToSave.push(addInputs[0].files[i]);
      }
    }

    function removeDuplicateFiles(files) {
      const uniqueFiles = [];
      const seenFileNames = new Set();

      for (const file of files) {
        if (!seenFileNames.has(file.name)) {
          uniqueFiles.push(file);
          seenFileNames.add(file.name);
        }
      }

      return uniqueFiles;
    }

    filesToSave = removeDuplicateFiles(filesToSave);

    if (filesToSave.length > 0) {
      changeImg(filesToSave)
        .then((response) => {
          //response - массив с новыми названиями картинок
          //filesToDel - массив с названиями картинок которые надо удалить

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

          newObject.img = JSON.parse(response);
          newObject.filesToDel = filesToDel;

          newObject.id = $(this).attr(`${idBlock}_change_id`);
          // console.log(newObject);

          for (let i = 0; i < filesToDel.length; i++) {
            delOneImg(`${idBlock}`, filesToDel[i])
              .catch(error => {
                console.error('Ошибка:', error);
              });
          }

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

// menu_tabs
export function menu_tabs() {
  let blocks = $(".admin_info__elem");
  let menu = $(".admin_menu__items li");
  let tabData = localStorage.getItem('tab_name');

  blocks.each(function () {
    if ($(this).attr("data_info") == tabData) {
      $(this).show();
    } else {
      $(this).hide();
    }
  })

  menu.each(function () {
    if ($(this).attr("data_info") == tabData) {
      $(".admin_menu__items li").removeClass("activeItem");
      $(this).addClass("activeItem");
    }
  })

  $(".admin_menu__items li").click(function () {
    $(".admin_menu__items li").removeClass("activeItem");
    $(this).addClass("activeItem");
    let tabName = $(this).attr("data_info");
    localStorage.setItem('tab_name', tabName);

    let blocks = $(".admin_info__elem");
    blocks.each(function () {
      if ($(this).attr("data_info") == tabName) {
        $(this).show();
      } else {
        $(this).hide();
      }
    })
  })
}

export function comeBack() {
  let tabData = localStorage.getItem('tab_name');

  let blocks = $(".admin_info__elem");
  blocks.each(function () {
    if ($(this).attr("data_info") == tabData) {
      $(this).show();
    } else {
      $(this).hide();
    }
  })
}

export function createMenuNames(schema) {
  const data = schema;

  const menuList = $(".admin_menu__items ul:first-child");

  for (const category in data) {
    menuList.append(`
          <li data_info="${category}">${data[category].menuName}<div class="triangle"></div></li>
      `);
  }
}

export function createMenuTabs(schema) {
  const data = schema;

  const menuList = $(".admin_info");

  for (const category in data) {
    menuList.append(`
          <div class="admin_info__elem" data_info="${category}">
              <div class="admin_info__item">
                  <div class="admin_info__item___tabNames">
                    <div class="admin_info__item___tabNames____name ${category}_click_name activeTabName" dataTab="${category}_open_first">
                      Все ${data[category].menuName}
                    </div>
                    <div class="admin_info__item___tabNames____name ${category}_click_name" dataTab="${category}_open_second">
                      Добавить ${data[category].menuName}
                    </div>
                  </div>

                  <div class="admin_info__item___tabBlocks">
                    <div class="admin_info__item___tabBlocks____block ${category}_show_block " dataTab="${category}_open_second">
                        <div class="admin_info__item___form"></div>
                    </div>
                    <div class="admin_info__item___tabBlocks____block ${category}_show_block activeBlockShow" dataTab="${category}_open_first">
                      <div class="admin_info__item___content"></div>
                    </div>
                  </div>
              </div>
          </div>
      `);

    $(".admin_info__elem").on("click", `.${category}_click_name`, function () {
      $(`.${category}_click_name`).removeClass("activeTabName");
      let tabName = $(this).attr("dataTab");
      $(this).addClass("activeTabName");

      let blocks = $(`.${category}_show_block`);

      blocks.each(function () {
        if ($(this).attr("dataTab") == tabName) {
          $(this).show();
        } else {
          $(this).hide();
        }
      })
    })

    for (const subItem in data[category]) {
      if (subItem != "menuName") {
        $(`.admin_info__elem[data_info="${category}"] .admin_info__item___form`).append(`
                  <label>${data[category][subItem].name}</label>
                  <${data[category][subItem].element} type="${data[category][subItem].type}" multiple id="${category}_${subItem}"  />
              `)
      }
    }

    $(`.admin_info__elem[data_info="${category}"] .admin_info__item___form`).append(`
          <button id="save${category}">Добавить ${data[category].menuName}</button>
      `)

    tinymce.init({
      selector: `#${category}_text`,
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
  }

  let tabData = localStorage.getItem('tab_name');

  let blocks = $(".admin_info__elem");

  blocks.each(function () {
    if ($(this).attr("data_info") == tabData) {
      $(this).show();
    } else {
      $(this).hide();
    }
  })
}