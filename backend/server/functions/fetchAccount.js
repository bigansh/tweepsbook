const User = require('../utils/schemas/User')

/**
 * A function that fetches the account information.
 * 
 * @param {String} profile_id 
 */
const fetchAccount = async (profile_id) => {
    try {
        return await User.findOne({profile_id: profile_id}).exec()
    } catch (error) {
        console.log(error);
    }
}

module.exports = fetchAccount