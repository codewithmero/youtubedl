import express from 'express';
import { viewAllUsers, createNewUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/")
    .get(viewAllUsers)
    .post(createNewUser);

export default router;