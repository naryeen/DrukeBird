const path = require('path')
/* Forget Password PAGE */

exports.getResetPassword = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'ResetPassword.html'))
}


