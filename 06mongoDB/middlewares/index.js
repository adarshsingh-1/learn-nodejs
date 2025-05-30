const fs = require('fs');

function logReqRes(fileName) {
    return (req, res, next) => {
        fs.appendFile(
            fileName,
            `${Date.now()}:${req.ip} ${req.method} ${req.path}\n`,
            (err, data) => {
                next();  // Move to next middleware
            }
        );
    };
}

module.exports = {
    logReqRes,
};