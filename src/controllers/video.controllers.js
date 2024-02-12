import { asyncHandler } from "../utils/asyncHandler.js";
import { fileSizeCalc } from "../utils/commonMethods.js";
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';
import { Video } from "../models/video.models.js"; 
import mongoose from "mongoose";
import { LikeVideo } from "../models/like.models.js";

const viewAllVideos = asyncHandler(async (req, res) => {

    let videos = await Video.find().select("-createdAt -updatedAt -is_deleted")

    if(!videos)
        throw new Error("Unable to fetch videos. Some error occured!");

    return res.status(200)?.json({
        success: true,
        videos,
        msg: "Videos listed successfully"
    })
});

const uploadVideo = asyncHandler(async (req, res) => {
    let { path: localFilePath } = req.file;

    if(Object.keys(req.body)?.length === 0)
        throw new Error("Please provide the appropriate video details!");

    if(!localFilePath)
        throw new Error("Please provide the video file to upload!");

    // calculating file size;
    let fileSizeInMB = fileSizeCalc(localFilePath);

    if(fileSizeInMB >= 100) {
        fs.unlinkSync(localFilePath);
        return res.status(404)?.json({
            success: false,
            msg: "Video has exceeded the maximum upload limit"
        });
    }

    let response = await uploadFileOnCloudinary(localFilePath);

    if(!response)
        throw new Error("Unable to upload the new Video. Some error occured!");

    let newVideo = await Video.create({
        ...req.body,
        size: fileSizeInMB?.toFixed(2),
        uploaded_by: new mongoose.Types.ObjectId(req.body?.uploaded_by),
        url: response?.url
    });

    if(!newVideo)
        throw new Error("Unable to create a new video entry");
    

    return res.status(200)?.json({
        success: true,
        newVideo,
        msg: "Video uploaded successfully"
    });
});

const likeVideo = asyncHandler(async (req, res) => {

    let { videoId, userId } = req.body;

    let liked = await LikeVideo?.create({
        liked_by: new mongoose.Types.ObjectId(userId),
        video_liked: new mongoose.Types.ObjectId(videoId)
    });

    if(!liked)
        throw new Error("Unable to like the video. Some error occured!");

    return res.status(200)?.json({
        success: true,
        liked,
        msg: "Video has been liked successfully"
    });
});

const getVideoById = asyncHandler(async (req, res) => {

    let { videoId } = req.params;
    if(!videoId) 
        throw new Error("Please provide a video ID.");

    // let video = await Video.get

    return res.status(200)?.json({
        success: true,
        msg: "Video detail fetched successfully"
    });
});

export { uploadVideo, viewAllVideos, likeVideo, getVideoById };