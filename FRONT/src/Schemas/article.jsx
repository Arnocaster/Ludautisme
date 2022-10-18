const articleSchema  = {
    id: {
        type: "number",
        label: "Id",
        gridDisplay: "normal",
        width: 125
    },
    id_ref:{
        type: "number",
        label: "Id_ref",
        gridDisplay: "none",
        width: 125
    },
    number:{
        type : "number",
        label : "n° Article",
        gridDisplay : "normal",
        width : 150,
    },
    name_ref:{
        type : "string",
        label : "Nom",
        gridDisplay : "none",
        width : 250,
    },
    origin:{
        type : "string",
        label : "Origine",
        gridDisplay : "normal",
        width : 150,
    },
    main_category:{
        type : "string",
        label : "Catégorie principale",
        gridDisplay : "none",
        width : 400,
    },
    date_buy:{
        type : "string",
        label : "Date d'achat",
        gridDisplay : "normal",
        width : 150,
    },
    available:{
        type : "boolean",
        label : "Disponible",
        gridDisplay : "toggle",
        width : 85,
    },
    archived:{
        type : "boolean",
        label : "Archivé",
        gridDisplay : "toggle",
        width : 85,
    }
}

export {articleSchema}
