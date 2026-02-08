class apiError extends Error {
    constructor (
        statusCode,
        message = 'Something went wrong',
        errors = [],
        statck = ''
    ) {
        super(message)
        this.statusCode = statusCode
        this.errors = errors
        this.data = null
        this.statck = statck
        this.success = false

        if (statck) {
            this.stack = statck
        }else {
            Error.captureStackTrace(this, this.constructor)
        }
    }     
}

export { apiError }