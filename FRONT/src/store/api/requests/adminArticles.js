//Liste des requetes api
export const adminArticles = {
    // getUser:'',
    getArticles: { query:() => '/articles' },       //useGetArticlesQuery
    addArticles:{type:'POST',query:'/articles/add'},//useAddArticlesMutation
    updateArticles:{type:'PUT',query:'/articles/'}, //useUpdateArticlesMutation
    // deleteOne:'',
}
