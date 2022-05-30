import mongoose from 'mongoose'

import { TagDocument } from './Tag'
import { BookmarkDocument } from './Bookmark'

export interface UserSchema {
    email: string
    profile_image: string
    name: string
    profile_id: string
    twitter_id: string
    twitter_auth_tokens: { accessToken: string; refreshToken: string }
    unreadCount: number
    importCount: { twitter: number }
    bookmarks: BookmarkDocument[]
    tags: TagDocument[]
}

export interface UserDocument extends UserSchema, mongoose.Document {}

export interface UserModel extends mongoose.Model<UserDocument> {}
