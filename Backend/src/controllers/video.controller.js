import { uploadFile,getSignedUrl} from '../lib/s3.js'
import { generateThumbnail } from '../lib/generateThumbnail.js'
import Video from '../models/video.model.js'
import { v4 as uuidv4 } from 'uuid'


export const uploadVideo = async (req,res) => {
    try{
        const file = req.file;
        if(!file){
            res.status(400).json({error:'No file uploaded'})
        }

        // uploading the video to s3
        const s3Key = await uploadFile(
            file.buffer,
            file.originalname,
            'videos',
            file.mimetype
        );

        // Genrating a Thumbail
        const thumbnailBuffer = await generateThumbnail(file.buffer);

        // uploading the thumb to s3
        const thumbnailKey = await uploadFile(
            thumbnailBuffer,
            `${uuidv4()}.png`,
            'thumbnails',
            'image/png'
        );

        // save meta data to mongodb
        const video = new Video({
            user : req.user.id,
            title:req.body.title,
            description:req.body.description,
            s3Key,
            thumbnailKey,
        });
        await video.save();
        res.status(201).json({message:'video uploaded',video});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

// get all videos
export const getAllVideos = async (req,res) => {
    try{
        const videos = await Video.find().sort({createdAt: -1});//latest video

        const videosWithUrls = videos.map((video)=>({
            _id:video._id,
            title: video.title,
            description:video.description,
            videoUrl:video.s3Key ? getSignedUrl(video.s3Key) : null,
            thumbnailUrl:video.thumbnailKey ? getSignedUrl(video.thumbnailKey) : null,
            likeCount:video.likeCount || 0,
            createdAt:video.createdAt,
        }));

        res.json(videosWithUrls);

    }catch(err){
        res.status(500).json({error:err.message});
    }
}

//likeing the video

export const likeVideo = async (req,res) => {
    try{
        const videoId = req.params.videoId;
        const userId = req.user.id;

        const video = await Video.findById(videoId);
        if(!video){
            return res.status(404).json({error:'Video not found'});
        }

        if(video.likedBy.includes(userId)){
            return res.status(200).json({message:'already liked',likeCount:video.likeCount});
        }

        video.likedBy.push(userId);
        video.likeCount +=1;
        await video.save();

        res.json({message:'Video liked',likeCount:video.likeCount});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}