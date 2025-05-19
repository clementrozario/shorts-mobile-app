import { uploadFile} from '../lib/s3.js'
import Video from '../models/video.model.js'

export const uploadVideo = async (req,res) => {
    try{
        const file = req.file;
        if(!file){
            res.status(400).json({error:'No file uploaded'})
        }
        const s3Key = await uploadFile(
            file.buffer,
            file.originalname,
            'videos',
            file.mimetype
        );

        const video = new Video({
            user : req.user.id,
            title:req.body.title,
            description:req.body.description,
            s3Key,
        });
        await video.save();
        res.status(201).json({message:'video uploaded',video});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}