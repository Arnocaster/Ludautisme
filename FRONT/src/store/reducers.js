import details from './features/Admin/Details';
import users from './features/Admin/UsersList';
import references from './features/Admin/ReferencesList';
import articles from './features/Admin/ArticlesList';
import categories from './features/Admin/CategoryList';
import tags from './features/Admin/TagList';
import bookings from './features/Admin/BookingsList';

const reducer = {
    details: details.reducer,
    users : users.reducer,
    references : references.reducer,
    articles : articles.reducer,
    categories : categories.reducer,
    tags : tags.reducer,
    bookings : bookings.reducer,
}

const actions = {
    details: details.actions,
    users : users.actions,
    references : references.actions,
    articles : articles.actions,
    categories : categories.actions,
    tags : tags.actions,
    bookings : bookings.actions,
}

export {reducer, actions, references};
