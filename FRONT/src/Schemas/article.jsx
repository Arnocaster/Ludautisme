const articleSchema  = {
    id: {
        type: "number",
        label: "Modifier",
        gridDisplay: "edit",
        inputDisplay:"none",
        primaryKey: true,
        width: 75
    },
    id_ref:{
        type: "number",
        label: "Id_ref",
        gridDisplay: "none",
        inputDisplay:"none",
        width: 125,
        titlePrefix : 'Article N°',
        title:1
    },
    number:{
        type : "number",
        label : "n° Article",
        gridDisplay : "normal",
        width : 75,
        bloc : 1,
        blocTitle:'Informations'
    },
    name_ref:{
        type : "string",
        label : "Nom",
        gridDisplay : "none",
        inputDisplay:"none",
        width : 250,
    },
    origin:{
        type : "string",
        label : "Origine",
        gridDisplay : "normal",
        width : 150,
        bloc : 3
    },
    main_category:{
        type : "string",
        label : "Catégorie principale",
        gridDisplay : "none",
        inputDisplay : "none",
        width : 400,
    },
    date_buy:{
        type : "string",
        label : "Date d'achat",
        gridDisplay : "date",
        inputDisplay : "date",
        width : 100,
        bloc : 3
    },
    available:{
        type : "boolean",
        label : "Disponible",
        gridDisplay : "toggle",
        inputDisplay : "checkbox",
        width : 85,
        bloc : 2
    },
    archived:{
        type : "boolean",
        label : "Archivé",
        gridDisplay : "toggle",
        width : 85,
        inputDisplay : "checkbox",
        bloc : 2
    }
}

export {articleSchema}
