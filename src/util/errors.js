exports.authError = (msg) => {
    return {
        error: {
            auth: {
                message: msg
            }
        }
    }
};

exports.inputError = (error) => {
    const { details } = error;

    const errors = details.map((d) => {
        const { context, message } = d;
        const { key, value } = context;

        return {
            key,
            [key]: value,
            message,
        }
    });

    return { error: errors };
};

exports.paramError = (name, value, msg) => {
    return {
        error: {
            key: name,
            [name]: value,
            message: msg,
        }
    }
};

exports.postError = (id, msg) => {
    return {
        error: {
            postId: id,
            messages: msg,
        }
    };
};

exports.loginError = (msg) => {
    return {
        error: {
            login: {
                message: msg
            }
        }
    };
};

exports.internalError = (msg) => {
    return {
        error: {
            message: msg
        }
    }
};
