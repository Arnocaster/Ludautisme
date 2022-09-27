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
        blocTitle : 'Identification'
    },
    description:{
        type : "string",
        label : "Description",
        gridDisplay : "normal",
        width : 400,
    },
    valorisation:{
        type : "number",
        label : "Valorisation",
        gridDisplay : "normal",
        width : 150,
        bloc : 1,
    },
    id_maincat:{
        type : "number",
        label : "Id Catégorie",
        gridDisplay : "normal",
        width : 150,
        bloc : 2,
        blockTitle : 'Classification'
    },
    name_maincat:{
        type : "string",
        label : "Nom Catégorie",
        gridDisplay : "normal",
        width : 150,
        bloc : 2
    },
    /*tag:{
        type : "string",
        label : "tag",
        gridDisplay : "normal",
        width : 250,
    }*/
}

export {referenceSchema}
