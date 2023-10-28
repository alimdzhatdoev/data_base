import {
    addData,
    getData,
    delOne,
    editOne,
    saveOneImg,
    generateId,
    delOneImg,
    getTextEditor,
    showData,
    makeData
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

createMenuTabs(schema());

createMenuNames(schema(), getTextEditor());

menu_tabs();

const data = schema();

for (const category in data) {
    makeData(category);
}
