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
                    <div class="admin_info__item___title">${data[category].menuName}</div>
                    <div class="admin_info__item___form">

                    </div>
                    <div class="admin_info__item___title">Существующие ${data[category].menuName}</div>

                    <div class="admin_info__item___content">

                    </div>
                </div>
            </div>
        `);
        for (const subItem in data[category]) {
            if (subItem != "menuName") {
                $(`.admin_info__elem[data_info="${category}"] .admin_info__item___form`).append(`
                    <label>${data[category][subItem].name}</label>
                    <${data[category][subItem].element} type="${data[category][subItem].type}"  id="${category}_${subItem}" />
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