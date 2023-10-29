import {
    addData,
    getData,
    delOne,
    editOne,
    saveImg,
    generateId,
    delImg,
    getTextEditor,
    showData,
    makeData,
    menu_tabs,
    comeBack,
    createMenuNames,
    createMenuTabs,
    createFilesFromConfig
} from './library.js';

import {
    schema
} from './config_db.js';

createMenuTabs(schema());

createMenuNames(schema(), getTextEditor());

menu_tabs();

const data = schema();

for (const category in data) {
    makeData(category);
}

createFilesFromConfig(schema)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {});