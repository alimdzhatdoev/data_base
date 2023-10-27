import {
    addData,
    getData,
    delOne,
    editOne,
    saveOneImg,
    generateId,
    delOneImg
} from './library.js';

import {
    menu_tabs,
    showModal,
    hideModal
} from './menu_tabs.js';

menu_tabs();

function showNews() {
    getData("news")
        .then(response => {
            $(".admin_info__item___content").text("");
            for (let i = response.length - 1; i >= 0; i--) {
                $(".admin_info__item___content").append(`
                    <div class="admin_info__item___content____element">
                        <div class="admin_info__item___content____element_____title">
                            <img src="img/${response[i].img}" alt="" />
                            ${response[i].title}
                        </div>
                        <div class="admin_info__item___content____element_____btnHover">
                            <div class="admin_info__item___content____element_____btnHover______title newEdit" idToEdit="${response[i].id}">Изменить
                            </div>
                            <div class="admin_info__item___content____element_____btnHover______title newDelete delete" idTodel="${response[i].id}">
                                Удалить</div>
                        </div>
                    </div>
                `)
            }

            showModal("newEdit");
            hideModal();
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

showNews()

$("#saveNews").click(function () {
    let title = $("#new_title").val();
    let text = $("#new_text").val();

    saveOneImg('#new_img')
        .then(
            (response) => {
                const data = {
                    title: title,
                    img: response,
                    text: text
                };

                addData(data, "news")
                    .then(response => {
                        showNews()
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                    });

                $("#new_title").val("");
                $("#new_img").val("");
                $("#new_text").val("");

                alert("Запись сохранена");
            },
        )
        .catch((error) => {
            console.error('Ошибка:', error);
        });
});

$('.admin_info__item___content').on('click', '.newDelete', function () {
    let id = $(this).attr("idTodel");

    delOne("news", id)
        .then(response => {
            showNews();
            alert("Запись удалена");
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });

    delOneImg("news", id)
        .catch(error => {
            console.error('Ошибка:', error);
        });
})

$('.admin_info__item___content').on('click', '.newEdit', function () {
    let id = $(this).attr("idToEdit");
    getData("news", id)
        .then(response => {
            $(".admin_info__elem").hide();

            $(".admin_info__elem[data_info='edit_element']").show();

            $(".admin_info__changeElem___data").empty();

            $(".admin_info__changeElem___data").append(
                `<div class="comeBack"><img src="img/icons/left-arrow.png" />Вернуться назад</div>`
            );

            $(".admin_info__changeElem___data").append(
                `
                    <div class="admin_info__changeElem___data____header">Название новости</div>
                    <input type="text" class="admin_info__changeElem___data____title" value="${response.title}" />
                `
            );

            $(".admin_info__changeElem___data").append(`
                <div class="admin_info__changeElem___data____header">Картинка новости</div>
                <div class="admin_info__changeElem___data____img">
                    <img src="img/${response.img}" alt="" />
                </div>
                <input type="file" class="admin_info__changeElem___data____file" />
            `);

            $(".admin_info__changeElem___data").append(
                `
                <div class="admin_info__changeElem___data____header">Текст новости</div>
                <textarea class="admin_info__changeElem___data____text" >${response.text} </textarea>
                `
            );

            $(".admin_info__changeElem___data").append(
                `<button class="admin_info__changeElem___data____btn" new_change_id="${id}">Сохранить изменения</button>`
            );
        })
})

$(".admin_info__elem").on("click", ".comeBack", function () {
    let tabData = localStorage.getItem('tab_name');

    let blocks = $(".admin_info__elem");
    blocks.each(function () {
        if ($(this).attr("data_info") == tabData) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
})

$(".admin_info__elem").on("click", ".admin_info__changeElem___data____btn", function(){
    // let title = $(".admin_info__changeElem___data____title").val();
    // let text = $(".admin_info__changeElem___data____text").val();
    // let id = $(this).attr("new_change_id");

    // saveOneImg('.admin_info__changeElem___data____file')
    //     .then(
    //         (response) => {
    //             const data = {
    //                 id: id,
    //                 title: title,
    //                 img: response,
    //                 text: text
    //             };

    //             editOne(data, "news")
    //                 .then(response => {
    //                     console.log(response);
    //                 })
    //                 .catch(error => {
    //                     console.error('Ошибка:', error);
    //                 });

    //             alert("Запись сохранена");
    //         },
    //     )
    //     .catch((error) => {
    //         console.error('Ошибка:', error);
    //     });
})