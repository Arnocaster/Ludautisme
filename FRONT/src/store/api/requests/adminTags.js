//Liste des requetes api
export const adminTags = {
    // getUser:'',
    getTags: { query:() => '/tag' },       //useGetTagsQuery
    addTag:{type:'POST',query:'/tag/'},    //useAddTagMutation
    updateTag:{type:'PUT',query:'/tag/'}, //useUpdateCategoryMutation
    // deleteOne:'',
}
