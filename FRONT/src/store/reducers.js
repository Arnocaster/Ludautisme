import details from './features/Admin/Details';
import users from './features/Admin/UsersList';
import references from './features/Admin/ReferencesList';
import categories from './features/Admin/CategoryList';

const reducer = {
    details: details.reducer,
    users : users.reducer,
    references : references.reducer,
    categories : categories.reducer,
}

const actions = {
    details: details.actions,
    users : users.actions,
    references : references.actions,
    categories : categories.actions,
}

export {reducer, actions, references};
