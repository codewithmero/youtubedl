import mongoose, { Schema } from 'mongoose';

const likedVideoSchema = new Schema({
    liked_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    video_liked: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }
}, { timestamps: true });

export const LikeVideo = mongoose.model("LikeVideo", likedVideoSchema);