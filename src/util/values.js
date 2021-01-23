exports.loginResult = (name, email, token, msg) => {
    return {
        login: {
            message: msg,
            ['access-token']: token,
            name,
            email,
        }
    };
};

exports.registerResult = (name, email, msg) => {
    return {
        register: {
            name,
            email,
            message: msg
        }
    };
};
