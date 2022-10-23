/* eslint-disable no-useless-escape */
/*
Full object example
 id:{
        type: "number",
        label: "Editer profil",
        gridDisplay: "edit",
        gridArrayProp : 'name',            //For gridDisplay = array, object prop used to display data
        width: 100,
        titlePrefix : '#',                  //Add a prefix in title only
        title : 3,                          //Display order in title only,   if missing => Not in
        inputDisplay : 'none' | 'input' | 'checkbox' | 'intCheckbox' | 'date' | 'chipList' | 'imageGallery' | 'datagrid'
        bloc  : 1,                          //Bloc affectation,              if missing  => In the 'default' bloc at bottom of the page
        blocTitle : 'Identité',             //BlocTitle, need to be on first field of each block,id no order field, takes the first found if missing => no block title
        field : 1,                          //Field order,                   if missing  => at the end bloc end by prop order in this schema
        apiCall : 'tag',                    //For inputs who needs to load all entity data to display (Select,ChipList)
        apiCallProp : 'tag',                //For inputs who needs to load all entity data to display (Select,ChipList) if none use schema prop 
    },


*/


const userSchema  = {
    id:{
        type: "number",
        label: "Editer profil",
        gridDisplay: "edit",
        width: 100,
        inputDisplay : 'none',
         primaryKey : true,
    },
    member_number:{
        type : "number",
        label : "n° Membre",
        gridDisplay : "normal",
        width : 100,
        titlePrefix : '#',
        title : 3,
        bloc : 1,
        field : 3,
        regex : /^-?[\d]*$/g,
        errorInfo : 'La saisie doit être un nombe entier'
    },
    email:{
        type : "string",
        label : "Email",
        gridDisplay : "normal",
        width : 150,
        bloc  : 3,
        blocTitle : 'Contact',
        field : 1,
        regex : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        errorInfo : 'La saisie doit être du type adresse@nomdedomaine.ext',
    },
    last_name:{
        type : "string",
        label : "Nom",
        gridDisplay : "normal",
        width : 125,
        title : 2,
        bloc  : 1,
        field : 2,
    },
    first_name:{
        type : "string",
        label : "Prénom",
        gridDisplay : "normal",
        width : 125,
        title : 1,
        bloc  : 1,
        blocTitle : 'Identité',
        field : 1,
    },
    phone:{
        type : "string",
        label : "Téléphone",
        gridDisplay : "normal",
        width : 100,
        bloc : 3,
        field : 2

    },
    adress_number:{
        type : "number",
        label : "n° Rue",
        gridDisplay : "normal",
        width : 75,
        bloc  : 4,
        blocTitle : 'Adresse',
        field : 1,
    },
    adress_street:{
        type : "string",
        label : "nom Rue",
        gridDisplay : "normal",
        width : 200,
        bloc  : 4,
        field : 2,

    },
    adress_zipcode:{
        type : "number",
        label : "Code Postal",
        gridDisplay : "normal",
        width : 125,
        bloc  : 4,
        field : 3,
    },
    adress_city:{
        type : "string",
        label : "Ville",
        gridDisplay : "normal",
        width : 100,
        bloc  : 4,
        field : 4,
    },
    cotisation_status:{
        type : "boolean",
        label : "Cotisation",
        gridDisplay : "toggle",
        width : 100,
        bloc : 2,
        blocTitle : 'Situation',
        field : 1,
        inputDisplay : 'checkbox',
    },
    cotisation_expiration:{
        type : "date",
        label : "Cotisation Exp",
        gridDisplay : "date",
        width : 150,
        bloc : 2,
        field : 2,
        inputDisplay : 'date',
    },
    caution_status:{
        type : "boolean",
        label : "Caution",
        gridDisplay : "toggle",
        width: 100,
        bloc : 2,
        field : 3,
        inputDisplay : 'checkbox',
        
    },
    caution_expiration:{
        type : "date",
        label : "Caution Exp",
        gridDisplay : "date",
        width : 150,
        bloc : 2,
        field : 4,
        inputDisplay : 'date',
        
    },
    id_role:{
        type : "number",
        label : "Role",
        gridDisplay : "normal",
        width : 75,
        inputDisplay : 'intCheckbox',
        bloc : 2,
        field : 6
    },
    archived:{
        type : "boolean",
        label : "Archivé",
        gridDisplay : "toggle",
        width : 100,
        bloc : 2,
        field : 5,
        inputDisplay : 'checkbox',
    },
}

export {userSchema}
