/*
Full prop example
 id:{
        type: "number",
        label: "Editer profil",
        gridDisplay: "edit",
        gridArrayProp : 'name',            //For gridDisplay = array, object prop used to display data
        width: 100,
        titlePrefix : '#',                  //Add a prefix in title only
        title : 3,                          //Display order in title only,   if missing => Not in
        inputDisplay : 'none' | 'input' | 'checkbox' | 'intCheckbox' | 'date' | 'chipList' | 'imageGallery' | 'datagrid'
        forceApiUsage : true                //Force to send prop in api even if display none
        bloc  : 1,                          //Bloc affectation,              if missing  => In the 'default' bloc at bottom of the page
        blocTitle : 'Identité',             //BlocTitle, need to be on first field of each block,id no order field, takes the first found if missing => no block title
        field : 1,                          //Field order,                   if missing  => at the end bloc end by prop order in this schema
        apiCall : 'tag',                    //For inputs who needs to load all entity data to display (Select,ChipList)
        apiCallProp : 'tag',                //For inputs who needs to load all entity data to display (Select,ChipList) if none use schema prop 
    },


*/

const referenceSchema  = {
    id:{
        type: "number",
        label: "Modifier",
        gridDisplay: "edit",
        width: 100,
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
        gridDisplay : "none",
        width : 150,
        inputDisplay :  'select',
        apiList :       'categories',
        apiListValueProp : 'id',
        apiListLabelProp : 'name',
        blocTitle :     'Classification',
        bloc :              2,     
    },
    name_category:{
        type : "string",
        label : "Nom categorie",
        gridDisplay : "normal",
        width : 150,
        inputDisplay :  'none',     
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
        linkedProp : 'id_ref',  //Keep link with parent element
        filterOriginReducer : 'articles',
        filterProp : 'id_ref',  //Datagrid filter key
        filterValue :'id',
        toolbar : false,
        hideFooter : true,
        bloc : 4,
        blocTitle : 'Articles',
        blocAddButton : true,
    }
}

export {referenceSchema}
