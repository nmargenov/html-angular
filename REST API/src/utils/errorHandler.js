exports.formatErrorMessage=(error)=> {
    if (Array.isArray(error)) {
        if (error.length > 0 && error[0].kind === 'user defined') {
            return error[0].message;
        }
    } else if (typeof error === 'string') {
        return error;
    }

    return 'Unknown error occurred.';
}