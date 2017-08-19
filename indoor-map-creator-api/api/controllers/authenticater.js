var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
const CLIENT_ID = '960174419058-q1pr6ecbo5kmim53ramsc8js9onqr992.apps.googleusercontent.com';
var client = new auth.OAuth2(CLIENT_ID, '', '');

exports.authenticate = function (req, res, next) {
    console.log('Middleware...');
    if (req.method == 'OPTIONS' || req.method == 'PATCH') {
        next();
    } else {
        var token = req.body.token;
        if (token) {

        } else {
            token = req.query.token;
        }
        console.log('Token: ' + token);
        client.verifyIdToken(
            token,
            CLIENT_ID,
            function (e, login) {
                if (e) {
                    console.log(e);
                    res.send(e);
                } else {
                    var payload = login.getPayload();
                    var userId = payload['sub'];
                    // replace the userId param value if present
                    console.log(req.params);
                    req.body.userId = userId;
                    console.log(payload);
                    next();
                }
            });
    }
}