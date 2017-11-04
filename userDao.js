const users = require('./users');
const _ = require('lodash');

module.exports = {
    findUser(user) {
        return _.find(users, (v) => {
            return v.username == user.username && v.password == user.password;
        });
    }
}