import express from 'express'
import upload from '../middleware/upload.js';
import {uploadVideo} from '../controllers/video.controller.js'
import {protectRoute} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/upload',protectRoute,upload.single('video'),uploadVideo);

export default router;