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

export async function editOne(data, fileName) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);

    $.ajax({
      type: "POST",
      url: "./dataBase/server/edit-json.php",
      data: {
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
  const jsonFile = "./dataBase/storage/" + fileName + ".json";

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

export async function saveOneImg(imgID) {
  return new Promise((resolve, reject) => {
    var fileInput = $(`#${imgID}`)[0];
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

export function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}