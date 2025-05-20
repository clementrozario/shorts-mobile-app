import { uploadFile} from '../lib/s3.js'
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