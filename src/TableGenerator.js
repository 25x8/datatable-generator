import {Header} from "./Header/Header";
import {Body} from "./Body/Body";

export class TableGenerator {
    HTMLWrapper;
    HTMLTable;
    header;


    constructor({container, headerData}) {
        this.createWrapper(container);
        this.createTable();
        this.createHeader(headerData);
    }

    createWrapper(container) {
        this.HTMLWrapper = document.createElement('div');
        this.HTMLWrapper.classList.add('table-wrapper');
        container.appendChild(this.HTMLWrapper);
    }

    createTable() {

        this.HTMLTable = document.createElement('table');
        this.HTMLTable.setAttribute('id', 'example');
        this.HTMLTable.setAttribute('cellSpacing', '0');
        this.HTMLTable.setAttribute('width', '100%');
        this.HTMLTable.className = 'display';
        this.HTMLWrapper.appendChild(this.HTMLTable);
    }



    createHeader(headerData) {
        this.header = new Header({
            table: this.HTMLTable,
            rows: headerData
        })
    }

    createBody(bodyData) {
        this.body = new Body({
            table: this.HTMLTable,
            rows: bodyData
        })
    }

    insertAddButton(container) {
        ControlButtons.createAddButton({
            cellHTML: container,
            tableController: this
        })
    }

    updateBody(newData, addFn) {
        this.currentData = newData;
        if(this.dataTransformator) {
            const transformedData = this.dataTransformator(newData);
            this.body.updateBody(transformedData, addFn);
        } else {
            this.body.updateBody(newData, addFn);
        }
    }

    getRowPattern() {
        return this.header.rowPattern;
    }

    setDataTransformator(fn) {
        this.dataTransformator = fn;
    }
}