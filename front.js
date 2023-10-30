import {
    addData,
    getData,
    delOne,
    editOne,
    saveImg,
    generateId,
    delImg,
    showData,
    makeData,
    menu_tabs,
    comeBack,
    createMenuNames,
    createMenuTabs,
    createFilesFromConfig,
    addTextEdit
} from './library.js';

import {
    schema
} from './config_db.js';


createFilesFromConfig(schema)

createMenuTabs(schema());

createMenuNames(schema());

menu_tabs();

const data = schema();

for (const category in data) {
    makeData(category);
}
