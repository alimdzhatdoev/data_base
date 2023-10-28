export function schema() {
    return ({
            "news" : {
                "menuName" : "Новости",
                "title": {
                    "name" : "Название новости",
                    "element" : "input",
                    "type": "text",
                    "required": true
                },
                "text": {
                    "name" : "Текст новости",
                    "element" : "textarea",
                    "type": "text",
                    "required": true
                },
                "img": {
                    "name" : "Картинка новости",
                    "element" : "input",
                    "type": "file",
                    "required": true
                },
            },
            "events" : {
                "menuName" : "Мероприятия",
                "title": {
                    "name" : "Название мероприятия",
                    "element" : "input",
                    "type": "text",
                    "required": true
                },
                "desc": {
                    "name" : "Описание мероприятия",
                    "element" : "input",
                    "type": "text",
                    "required": true
                },
                "text": {
                    "name" : "Текст мероприятия",
                    "element" : "textarea",
                    "type": "text",
                    "required": true
                },
                "img": {
                    "name" : "Картинка мероприятия",
                    "element" : "input",
                    "type": "file",
                    "required": true
                },
            }
        }
    )
}