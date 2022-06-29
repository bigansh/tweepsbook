import mongoose from 'mongoose'

import { TagDocument } from './Tag'

export interface BookmarkSchema {
	twitter_status_id: string
	discord_message_id: string
	reddit_post_id: string
	pinterest_post_id: string
	bookmarkSource: string
	bookmarkMethod: string
	profile_id: string
	read: boolean
	share: boolean
	tags: TagDocument[]
	notes: string
}

export interface BookmarkDocument extends BookmarkSchema, mongoose.Document {}

export interface BookmarkModel extends mongoose.Model<BookmarkDocument> {}
