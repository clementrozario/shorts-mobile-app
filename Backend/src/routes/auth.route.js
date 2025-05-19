import express from 'express'
import { signup } from '../controllers/auth.controller.js'

const router = express.Router();

router.post("/signup",signup);

router.get('/test', (req, res) => {
    console.log('Test endpoint hit');
    res.send('Test OK');
});


export default router;