class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.status = 'error';
        this.statusCode = statusCode;
    }
}

module.exports = ApiError;