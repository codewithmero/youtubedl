import { asyncHandler } from "../utils/asyncHandler.js";
import { fileSizeCalc } from "../utils/commonMethods.js";
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';
import { Video } from "../models/video.models.js"; 
import { User } from "../models/user.models.js";

const viewAllUsers = asyncHandler(async (req, res) => {

    let users = await User.find().select("-createdAt -updatedAt -is_deleted")

    if(!users)
        throw new Error("Unable to fetch users. Some error occured!");

    return res.status(200)?.json({
        success: true,
        users,
        msg: "Users listed successfully"
    })
});

const createNewUser = asyncHandler(async (req, res) => {
    if(Object.keys(req.body)?.length === 0)
        throw new Error("Please provide the appropriate user details!");

    let newUser = await User.create(req.body);

    if(!newUser)
        throw new Error("Unable to create a new user. Some error occured!");
    

    return res.status(200)?.json({
        success: true,
        newUser,
        msg: "User created successfully"
    });
});

export { createNewUser, viewAllUsers };