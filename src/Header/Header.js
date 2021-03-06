export class Header {

    HTMLHeader;
    rowPattern = [];

    constructor({table, rows}) {
        this.initHTML(table);
        this.initRows(rows);
    }

    initHTML(table) {
        this.HTMLHeader = document.createElement('thead');
        table.appendChild(this.HTMLHeader);
    }

    initRows(rows) {

        const rowsArray = Object.values(rows);

        rowsArray.forEach((row, index) => {
            const lastRow = index === rowsArray.length - 1
            this.addRow(row, lastRow);
        });

    }

    addRow(row, lastRow) {
        const HTMLRow = document.createElement('tr');

        row.forEach(el => {
            const newCell = document.createElement('th');

            el.parentId && newCell.setAttribute('parent-id', el.parentId);
            el.colspan && newCell.setAttribute('colspan', el.colspan);
            el.rowspan && newCell.setAttribute('rowspan', el.rowspan);

            if(el.measureVal) {
                let valList = '';
                el.measureVal.forEach(val => valList += `${val.value},`);
                newCell.setAttribute('measure-val', valList);
            }

            newCell.setAttribute('self-id', el.id);
            newCell.textContent = el.label;

            HTMLRow.append(newCell);

            lastRow && this.createDataPath(newCell);

        })
        this.HTMLHeader.appendChild(HTMLRow);
    }

    createDataPath(cell) {
        const path = [];
        getParent(cell);
        const pathAttr = path.reverse();

        pathAttr.push(cell.getAttribute('self-id'));

        this.rowPattern.push(pathAttr);

        cell.setAttribute('path', pathAttr)

        function getParent(cell) {
            const parent = cell.getAttribute('parent-id');
            if(parent) {
                path.push(parent);
                const parentCell = document.querySelector(`[self-id=${parent}]`)
                getParent(parentCell);
            }
        }

    }
}