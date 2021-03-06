var passport = require("passport");

var passObj ={}

passObj.initialize = passport.initialize();
passObj.session = passport.session();

module.exports = passObj;