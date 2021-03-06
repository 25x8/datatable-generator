export const conf = {
    characteristics: [
        {
            id: "weight",
            label: "Вес",
            dict: false,
            measure: [ {id: "sm", value: "см"}]
        },{
            id: "length",
            label: "Длина",
            dict: false,
            measure: [ {id: "sm", value: "см"}]
        }
    ],
    inputs: [
        {
            id: "inner_diameter",
            label: "Внутренний диаметр",
            dict: true
        },
        {
            id: "outer_diameter",
            label: "Внешний диаметр",
            dict: true
        }
    ],
    grades: [
        {
            id: "premium",
            label: "Премиум"
        },
        {
            id: "secondary",
            label: "Второй класс"
        },
        {
            id: "reject",
            label: "Отбраковка"
        }
    ]
}


export const data = [
    {
        id: "data-1",
        characteristics: [
            {
                id: "weight",
                min: null,
                max: null,
                eq: null,
            },{
                id: "length",
                min: null,
                max: null,
                eq: null,
            }
        ],
        rules: [ //!отфильтровано по классам
            {
                id: "inner_diameter",
                min: 100,
                max: 200,
                eq: 50,
                grade: "premium"
            },
            {
                id: "outer_diameter",
                min: null,
                max: null,
                eq: null,
                grade: "premium"
            },
            {
                id: "inner_diameter",
                min: null,
                max: null,
                eq: null,
                grade: "secondary"
            },
            {
                id: "outer_diameter",
                min: null,
                max: null,
                eq: null,
                grade: "secondary"
            },
            {
                id: "inner_diameter",
                min: null,
                max: null,
                eq: null,
                grade: "reject"
            },
            {
                id: "outer_diameter",
                min: null,
                max: null,
                eq: null,
                grade: "reject"
            },
        ]
    }
]
