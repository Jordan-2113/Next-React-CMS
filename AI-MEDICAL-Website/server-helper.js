const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const { users } = require('./db/models');

const dataURItoBlob = dataURI => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
}

const parseRequest = req => {
    const form = formidable({ multiples: true });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            resolve([ fields, files, err ]);
        })
    })
}

const parseJWT = req => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1] || req.headers["x-access-token"] || req.query.token;
        return jwt.verify(token, process.env.JWT_TOKEN);
    } catch (e) {
        return null;
    }
}

const validateToken = handler => {
    return async (req, res) => {
        if (req.method.toUpperCase() !== 'OPTIONS') {
            try {
                const payload = parseJWT(req);
                if (payload == null || (await users.findOne({ where: { id: payload.id }, attributes: ['id'] })) == null) {
                    throw new Error("Token not valid.");
                }
            } catch (e) {
                res.status(401).send({ message: "Token not valid." });
                return;
            }
        }
        return await handler(req, res);
    }
}

module.exports = {
    dataURItoBlob, parseRequest, parseJWT, validateToken
}