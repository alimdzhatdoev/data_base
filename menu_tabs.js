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

export function showModal(className) {
    $(".admin_info__item___content").on("click", `.${className}`, function () {
        $(".admin_info__changeElem").show();
        $(".admin_info__changeElem").css("display", "flex");
    })
}

export function hideModal() {
    $(".admin_info__changeElem___editBlock____close").click(function () {
        $(".admin_info__changeElem").hide();
    })
}