const referenceSchema  = {
    id:{
        type: "number",
        label: "Modifier référence",
        gridDisplay: "edit",
        width: 200,
        inputDisplay:"none",
        primaryKey : true,
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
        regex : /^-?[\d]*$/g,
        errorInfo : 'La saisie doit être un nombre'
    },
    main_category:{
        type : "number",
        label : "Id Catégorie",
        gridDisplay : "normal",
        width : 150,
        inputDisplay :  'select',
        apiList :       'categories',
        apiListValueProp : 'id',
        apiListLabelProp : 'name',
        blocTitle :     'Classification',
        bloc :              2,     
    },
    tag:{
        type : "number",
        label : "tag",
        gridDisplay : "array",
        gridArrayProp : 'name',
        width : 250,
        inputDisplay : 'chipList',
        apiList : 'tags',
        apiListValueProp : 'id',
        apiListLabelProp : 'name',
        bloc : 2
    },
    reference:{
        type : "number",
        label : "article",
        gridDisplay : "none",
        //gridArrayProp : 'name',
        width : 250,
        inputDisplay : 'datagrid',
        schema : 'articleSchema',
        reducer : 'articles',
        apiList : 'referenceSchema',
        apiListValueProp : 'id',
        apiListLabelProp : 'name',
        bloc : 4
    }
}

export {referenceSchema}
