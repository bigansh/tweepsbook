import mongoose from 'mongoose'

import { TagDocument } from './Tag'

export interface BookmarkSchema {
    twitter_status_id: string
    discord_message_id: string
    reddit_post_id: string
    pinterest_post_id: string
    profile_id: string
    read: boolean
    archived: boolean
    tags: TagDocument[]
}

export interface BookmarkDocument extends BookmarkSchema, mongoose.Document {}

export interface BookmarkModel extends mongoose.Model<BookmarkDocument> {}
