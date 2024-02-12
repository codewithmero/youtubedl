import mongoose, { Schema } from 'mongoose';

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploaded_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Video = mongoose.model("Video", videoSchema);