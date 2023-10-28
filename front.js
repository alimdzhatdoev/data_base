import {
    addData,
    getData,
    delOne,
    editOne,
    saveOneImg,
    generateId,
    delOneImg,
    getTextEditor,
    showData
} from './library.js';

import {
    menu_tabs,
    comeBack,
    createMenuNames,
    createMenuTabs
} from './menu_tabs.js';

import {
    schema
} from './config_db.js';


function makeData(idBlock) {
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


createMenuTabs(schema());

createMenuNames(schema(), getTextEditor());

menu_tabs();

makeData("news");
makeData("events");