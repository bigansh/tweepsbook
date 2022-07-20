import mongoose from 'mongoose'

export interface TagSchema {
    tag: string
    profile_id: string
}

export interface TagDocument extends TagSchema, mongoose.Document {}

export interface TagModel extends mongoose.Model<TagDocument> {}
