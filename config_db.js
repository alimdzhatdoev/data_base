export function schema() {
    return ({
        "news": {
            "menuName": "Новости",
            "title": {
                "name": "Название новости",
                "element": "input",
                "type": "text",
                "required": true
            },
            "text": {
                "name": "Текст новости",
                "element": "textarea",
                "type": "text",
                "required": true
            },
            "img": {
                "name": "Картинки новости",
                "element": "input",
                "type": "file",
                "required": true
            },
        },
        "events": {
            "menuName": "мероприятия",
            "title": {
                "name": "Название новости",
                "element": "input",
                "type": "text",
                "required": true
            },
            "desc": {
                "name": "Название новости1",
                "element": "input",
                "type": "text",
                "required": true
            },
            "text": {
                "name": "Текст новости",
                "element": "textarea",
                "type": "text",
                "required": true
            },
            "img": {
                "name": "Картинки новости",
                "element": "input",
                "type": "file",
                "required": true
            },
        }
    })
}