// let user = JSON.parse(localStorage.getItem('user'));
const INITIAL_STATE = { users: [], isLoad: true }

const usersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_USERS':
            return {
                users: action.users, 
                isLoad: false,
            }
        default:
            return state
    }
};

export default usersReducer;