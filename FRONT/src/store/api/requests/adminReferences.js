//Liste des requetes api
export const adminReferences = {
    // getUser:'',
    getReferences: { query:() => '/references' },       //useGetReferencesQuery
    addReferences:{type:'POST',query:'/references'},    //useAddReferencesMutation
    updateReferences:{type:'PUT',query:'/references/'}, //useUpdateReferencesMutation
    // deleteOne:'',
}
