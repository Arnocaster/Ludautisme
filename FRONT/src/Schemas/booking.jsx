const bookingSchema  = {
    id:{
        type: "number",
        label: "Modifier réservation",
        gridDisplay: "edit",
        width: 125,
        primaryKey : true,
        inputDisplay : 'none',
        title : 1,
        titlePrefix : 'Réservation #',

    },
    delivered:{
        type : "boolean",
        label : "Délivrée",
        gridDisplay : "delivered",
        width : 125,
        inputDisplay : 'checkbox',
        bloc : 3,
        blocTitle : 'Statut'
    },
    closed:{
        type : "boolean",
        label : "Clôturée",
        gridDisplay : "closed",
        width : 125,
        inputDisplay : 'checkbox',
        bloc : 3,
    },
    overdue:{
        type : "boolean",
        label : "Retard",
        gridDisplay : "overdue",
        width : 150,
        inputDisplay : 'normal',
        bloc : 2,
        field : 3,
    },
    id_user:{
        type : "string",
        label : "identifiant adhérent",
        gridDisplay : "none",
        width : 150,
        inputDisplay : 'none',      
    },
    member_number:{
        type : "string",
        label : "n° Adhérent",
        gridDisplay : "normal",
        width : 150,
        inputDisplay : 'normal',
        bloc : 1,
        blocTitle : 'Infos Adhérent'
    },
    first_name:{
        type : "string",
        label : "Prénom",
        gridDisplay : "normal",
        width : 150,
        inputDisplay : 'normal',
        bloc : 1,
        title : 2
    },
    last_name:{
        type : "string",
        label : "Nom",
        gridDisplay : "normal",
        width : 150,
        inputDisplay : 'normal',
        bloc : 1,
        title : 3
    },
    email:{
        type : "string",
        label : "Email",
        gridDisplay : "normal",
        width : 150,
        inputDisplay : 'normal',
        bloc : 1,
    },
    id_permanency:{
        type : "number",
        label : "id Permanence",
        gridDisplay : "none",
        width : 150,
        inputDisplay : 'none',
    },
    date_permanency:{
        type : "string",
        label : "Date emprunt",
        gridDisplay : "date",
        width : 150,
        inputDisplay : 'date',
        bloc : 2,
        field : 1,
        blocTitle : 'Infos Réservation'
    },
    return_date_permanency:{
        type : "string",
        label : "Date retour",
        gridDisplay : "date",
        width : 150,
        inputDisplay : 'date',
        bloc : 2,
        field : 2,
        blocTitle : 'Infos Réservation'
    },
    borrowed_articles:{
        type : "number",
        label : "",
        gridDisplay : "none",
        //gridArrayProp : 'name',
        width : 250,
        inputDisplay : 'datagrid',
        schema : 'articleSchema',
        reducer : 'articles',
        filterProp : 'id',  //Datagrid filter key
        filterValue :'id',
        toolbar : false,
        hideFooter : true,
        bloc : 4,
        blocTitle : 'Articles',
        blocAddButton : true,
    }
}

export {bookingSchema}
