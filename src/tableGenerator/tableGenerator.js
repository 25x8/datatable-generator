import  'datatables.net/js/jquery.dataTables.min';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css';
import 'datatables.net-fixedheader/js/dataTables.fixedHeader.min';
import 'datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css';
import './datatablesEditor/datatablesEditor';

import {TableGenerator} from "../TableGenerator";
import {getBodyRows, getHeaders} from "../utils/transfromData";
import {conf, data} from "../utils/mockData";

let datas = [
    {
        order: 1,
        "first_name": "Tiger",
        "last_name": "324",
        "position": "System Architect",
        "control": `<button class="remove">Удалить</button>
                    <button class="duplicate">Копировать</button>
                    `
    },
    {
        order: 2,
        "first_name": "Garrett",
        "last_name": "Winters",
        "position": "Accountant",
        "control": `<button class="remove">Удалить</button>
                    <button class="duplicate">Копировать</button>
                    `
    }]

let table;
document.body.onload = () => {
    const headerRows = getHeaders(conf);
    const stable = new TableGenerator({
        container: document.getElementById('root'),
        headerData: headerRows,
    });

    const bodyRows = getBodyRows(data, stable.getRowPattern())

    stable.currentData = data;
    stable.createBody(bodyRows);



    table = $('#example')
        .on('init.dt', function (){
            initControlButtons();
        }).DataTable({
        drawCallback: initControlButtons,
        dom: 'lBfrtip',
        fixedHeader: true,

        order: [1, 'asc'],
        buttons: [
            {
                text: 'Добавить столбец',
                action: function ( e, dt, node, config ) {
                    data.push({
                        "first_name": "Tig231432er",
                        "last_name": "3221344",
                        "position": "System Architect",
                        "control": `<button class="remove">Удалить</button>
                                    <button class="duplicate">Копировать</button>
                                    `
                    });

                    table.clear().rows.add(data).draw();

                    initControlButtons();

                }
            }
        ]
    })

    table.MakeCellsEditable({
        onUpdate: myCallbackFunction,
        columns: [0, 1, 2],
        "inputTypes": [
            {
                "column": 0,
                "type": "text",
                "options": null
            },
            {
                "column": 1,
                "type": "list",
                "options": [
                    {"value": "1", "display": "Beaty"},
                    {"value": "2", "display": "Doe"},
                    {"value": "3", "display": "Dirt"}
                ]
            },
            {
                "column": 2,
                "type": "text",
            },
        ]
    });

};

function initControlButtons() {
    $('.remove').on('click',function () {
        const currentData = table.row($(this).parent('td')).data();
        data = data.filter(el => el.order !== currentData.order)
        table.clear().rows.add(data).draw();
        console.log(data)
    });

    $('.duplicate').on('click',  function () {
        console.log(this)
        const currentData = table.row($(this).parent('td')).data()
        const index = data.findIndex(el => el.order === currentData.order);
        data.splice(index + 1, 0, currentData);
        table.clear().rows.add(data).draw();
    })
}

function myCallbackFunction(updatedCell, updatedRow, oldValue) {
    console.log(13424)
    console.log("The new value for the cell is: " + updatedCell.data());
    console.log("The old value for that cell was: " + oldValue);
    console.log("The values for each cell in that row are: ",updatedRow.data());
}
