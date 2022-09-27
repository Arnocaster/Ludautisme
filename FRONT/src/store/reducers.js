import details from './features/Admin/Details';
import users from './features/Admin/UsersList';
import references from './features/Admin/ReferencesList';

const reducer = {
    details: details.reducer,
    users : users.reducer,
    references : references.reducer,
}

const actions = {
    details: details.actions,
    users : users.actions,
    references : references.actions,
}

export {reducer, actions, references};
