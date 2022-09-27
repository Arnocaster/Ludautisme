//Liste des requetes api
export const adminReferences = {
    // getUser:'',
    getReferences: { query:() => '/references' },       //useGetReferencesQuery
    addReference:{type:'POST',query:'/references/'},    //useAddReferenceMutation
    updateReference:{type:'PUT',query:'/references/'}, //useUpdateReferenceMutation
    // deleteOne:'',
}
