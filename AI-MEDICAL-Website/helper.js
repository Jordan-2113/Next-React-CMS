const STORAGE_USE_COOKIES = "ACCEPT_COOKIES";
const Role = {
    admin: 1,
    editor: 2
}
const SALT_ROUNDS = 10;
const DefaultJoiConfig = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
}

const stripHTML = str => {
    return str.replace(/(<([^>]+)>)/gi, "").replace(/\&nbsp;/g, '');
}

module.exports = {
    STORAGE_USE_COOKIES, Role, SALT_ROUNDS, DefaultJoiConfig, stripHTML
}