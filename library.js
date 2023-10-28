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