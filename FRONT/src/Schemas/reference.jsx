const referenceSchema  = {
    id:{
        type: "number",
        label: "Modifier référence",
        gridDisplay: "edit",
        width: 200,
        inputDisplay:"none"
    },
    name:{
        type : "string",
        label : "Nom",
        gridDisplay : "normal",
        width : 250,
        bloc : 1,
        blocTitle : 'Identification',
        title : 1,
    },
    description:{
        type : "string",
        label : "Description",
        gridDisplay : "normal",
        width : 400,
        inputDisplay : 'textArea',
        bloc : 3,
    },
    valorisation:{
        type : "number",
        label : "Valorisation",
        gridDisplay : "normal",
        width : 150,
        bloc : 1,
    },
    main_category:{
        type : "number",
        label : "Id Catégorie",
        gridDisplay : "normal",
        width : 150,
        inputDisplay :  'select',
        apiList :       'Categories',
        blocTitle :     'Classification',
        bloc :              2,     
    },
    tag:{
        type : "number",
        label : "tag",
        gridDisplay : "array",
        gridArrayProp : 'name',
        width : 250,
        apiList : 'tags',
        apiListValueProp : 'id',
        apiListLabelProp : 'name',
        inputDisplay : 'chipList',
        bloc : 2
    }
}

export {referenceSchema}
