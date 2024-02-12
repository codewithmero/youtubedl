import express from 'express';
import { 
    likeVideo, 
    uploadVideo, 
    viewAllVideos, 
    getVideoById
} from "../controllers/video.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/")
.get(viewAllVideos)
.post(upload.single("video"), uploadVideo);

router.route("/:videoId")
    .get(getVideoById)

router.route("/like")
    .post(likeVideo);

export default router;