//Liste des requetes api
export const adminBookings = {
    // getUser:'',
    getBookings: { query:() => '/booking' },       //useGetBookingsQuery
    addBookings:{type:'POST',query:'/booking/add'},    //useAddBookingsMutation
    updateBookings:{type:'PUT',query:'/booking/'}, //useUpdateBookingsMutation
    // deleteOne:'',
}
