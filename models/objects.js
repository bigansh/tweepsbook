var objects = {}

objects.bmTweet = {
	status: String,
	tag: String,
	id: String,
}

objects.usr = {
	email: String,
	profile: String,
	name: String,
	id: String,
}

objects.params = {
	status: String,
	in_reply_to_status_id: String,
	auto_populate_reply_metadata: Boolean,
}

objects.bmtTag = {
	tag: String,
	id: String,
}

module.exports = objects
