import {
    addData,
    getData,
    delOne,
    editOne,
    saveOneImg
} from './library.js';

import {
    menu_tabs
} from './menu_tabs.js';

menu_tabs();

function showNews() {
    getData("news")
        .then(response => {
            $(".admin_info__item___content").text("");
            for (let i = response.length - 1; i >= 0; i--) {
                $(".admin_info__item___content").append(`
                    <div class="admin_info__item___content____element">
                        <div class="admin_info__item___content____element_____title">${response[i].title}</div>
                        <div class="admin_info__item___content____element_____btnHover">
                            <div class="admin_info__item___content____element_____btnHover______title newEdit" idToEdit="${response[i].id}">Изменить
                            </div>
                            <div class="admin_info__item___content____element_____btnHover______title newDelete delete" idTodel="${response[i].id}">
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

showNews()

$("#saveNews").click(function () {
    let id = $("#new_id").val();
    let title = $("#new_title").val();
    let text = $("#new_text").val();

    $('#new_img').change(function () {
        var fileInput = $(this)[0];
        var file = fileInput.files[0];
        var fileName = file.name;
        console.log('Имя файла: ' + fileName);
    });

    saveOneImg('new_img')
        .then(
            (response) => {
                const data = {
                    id: id,
                    title: title,
                    img: response,
                    text: text
                };

                addData(data, "news")
                    .then(response => {
                        console.log('Успешно:', response);
                        showNews()
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                    });

                $("#new_id").val("");
                $("#new_title").val("");
                $("#new_img").val("");
                $("#new_text").val("");
            },
        )
        .catch((error) => {
            console.error('Ошибка:', error);
        });
});

$('.admin_info__item___content').on('click', '.newDelete', function () {
    let id = $(this).attr("idTodel");
    console.log(id);
    
    delOne("news", id)
        .then(response => {
            showNews()
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
})