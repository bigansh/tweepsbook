const User = require('../utils/schema/User'),
	Tag = require('../utils/schema/Tag'),
	Tweet = require('../utils/schema/Tweet')

const tagFindOrCreate = require('./tagFindOrCreate'),
    tweetFinderAndUpdater = require('./tweetFinderAndUpdater')

/**
 * A function that finds the user & updates the tags.
 *
 * @param {String} profile_id
 * @param {String} tweet_id
 * @param {[String]} tags
 */
const updateTags = (profile_id, tweetId, tags) => {
    const user = await User.findOne({profile_id: profile_id}).populate(['tweets', 'tags']).exec()

    const tweetTags = await tagFindOrCreate(tags, user)

    return await tweetFinderAndUpdater(tweetId, tweetTags, 'tag')
}

module.exports = updateTags
