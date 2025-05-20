import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:String,
    description:String,
    s3Key:String,
    thumbnailKey:String,
    likeCount: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt:{type:Date,default:Date.now},
})

const Video = mongoose.model('Video',videoSchema);
export default Video;