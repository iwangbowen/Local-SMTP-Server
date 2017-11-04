const sendmail = require('sendmail')();

sendmail({
    from: 'no-reply@gmail.com',
    to: 'iwangbowen@sohu.com',
    subject: '游玩',
    html: '中国美国日本',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});