function HandleHttpErrors(message, code) {
    this.message = message;
    this.code = code
}

HandleHttpErrors.prototype = Error.prototype;

export default HandleHttpErrors