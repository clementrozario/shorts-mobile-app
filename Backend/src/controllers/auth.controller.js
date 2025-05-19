import User from '../models/user.model.js'
import {generateToken} from '../lib/utils.js'
import bcrypt from 'bcryptjs'

export const signup = async (req,res)=>{
    console.log("Signup endpoint hit");
    const {email,password} = req.body;
    try{
        if(!email || !password){
           return res.status(400).json({message:'All fields are required'});
        }
        if(password.length<6){
            return res.status(400).json({message:'password must have atleast 6 charectors'});
        }
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:'Email already exists'})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            email,
            password:hashedPassword
        })
        await newUser.save();

        generateToken(newUser._id,res);

        return res.status(201).json({
            _id:newUser._id,
            email:newUser.email,
        })    
    }catch(error){
        console.log("error in signup controller",error.message);
        return res.status(500).json({message:"Internal server Error"});
    }
}