//Liste des requetes api
export const adminCategories = {
    // getUser:'',
    getCategories: { query:() => '/categorie' },       //useGetCategoriesQuery
    addCategory:{type:'POST',query:'/categorie/'},    //useAddCategoryMutation
    updateCategory:{type:'PUT',query:'/categorie/'}, //useUpdateCategoryMutation
    // deleteOne:'',
}
