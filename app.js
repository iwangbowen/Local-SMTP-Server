const SMTPServer = require('smtp-server').SMTPServer;
const _ = require('lodash');
const sendmail = require('sendmail')();
const userDao = require('./userDao');

const server = new SMTPServer({
    logger: true,
    hideSTARTTLS: true,
    onAuth(auth, session, callback) {
        if (!userDao.findUser(auth)) {
            return callback(new Error('Invalid username or password'));
        }
        callback(null, {
            user: {
                username: 'wangbowen'
            }
        });
    },
    onData(stream, session, callback) {
        let str = '';
        stream.on('data', buffer => {
            str += buffer.toString('utf8');
        });
        stream.on('end', () => {
            // 邮件头之间用换行符分隔，最后一个邮件头和邮件的
            // 具体内容之间包含一个空行，所以用两个换行符分隔
            // 邮件头和邮件内容(注意：邮件正文同样有可能包含\r\n\r\n)
            let mail = str.split('\r\n\r\n');
            let headers = _.first(mail)
                .split('\r\n')
                .reduce((prev, v) => {
                    prev[v.split(': ').shift()] = _.trim(v.split(': ').pop());
                    return prev;
                }, {});
            // 包含非ASCII码的正文会被base64编码，包含Content-Transfer-Encoding消息头
            let content = '';
            if (headers['Content-Transfer-Encoding'] && headers['Content-Transfer-Encoding'] == 'base64') {
                content = new Buffer(_.tail(mail).join('\r\n\r\n'), 'base64').toString('utf8');
            } else {
                content = _.tail(mail).join('\r\n\r\n');
            }
            sendmail({
                from: headers.From,
                to: headers.To,
                subject: headers.Subject,
                html: content,
            }, function (err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
            });
            callback();
        });
    }
});

server.listen(25);