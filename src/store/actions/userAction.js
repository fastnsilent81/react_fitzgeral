import config from '../../config/common';

const GetUsers = (payload) => {
    return dispatch => {
        fetch(`${config.API_ENDPOINT}/get_users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: 'GET_USERS',
                    users: res
                });
            })
    };
};

const SubmitWorkGroup = (payload) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(`${config.API_ENDPOINT}/work_group`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
                .catch(err => reject(err))
        });
    }
}

export { GetUsers, SubmitWorkGroup }