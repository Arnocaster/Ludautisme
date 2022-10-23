//Liste des requetes api
export const adminUsers = {
    // getUser:'',
    getUsers: { query:() => '/users' },
    addUsers:{type:'POST',query:'/users/'},  //useAddUserMutation
    updateUsers:{type:'PUT',query:'/users/'}, //useUpdateUserMutation
    // deleteOne:'',
}
