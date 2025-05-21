# Shorts Video (v0)
A Node.js + Express backend for a short-video mobile app, supporting user authentication, video upload, video feed, likes, and AWS S3 integration.

## Features:
- User registration & login (JWT-based authentication)
- Video upload (with title & description)
- Video storage on AWS S3
- Auto-generated video thumbnails (ffmpeg)
- List all videos (with signed S3 URLs for video and thumbnail)
- Like a video (one like per user per video)
- MongoDB Atlas for data storage
- Protected API endpoints

## Techstack :
- Node.js + Express
- MongoDB Atlas + Mongoose
- AWS S3 (video & thumbnail storage)
- Multer (file uploads)
- fluent-ffmpeg (thumbnail generation)
- jsonwebtoken (JWT auth)
- bcryptjs (password hashing)
- CORS (for frontend integration)

## Setup Instructions:
1. Clone the repository:
   ### git clone https://github.com/clementrozario/shorts-mobile-app.git
2. Install dependencies:
   ### npm install
3. Set up your .env file:
   ### - PORT=5000
   ### - MONGODB_URI=your_mongodb_atlas_connection_string
   ### - JWT_SECRET=your_jwt_secret
   ### - AWS_ACCESS_KEY_ID=your_aws_access_key
   ### - AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   ### - AWS_S3_BUCKET=your_s3_bucket_name
   ### - AWS_REGION=your_s3_bucket_region
4. Start the server:
   ### npm run dev

## Testing:
Used Postman to test endpoints.

## Future Improvement:
React native to connect the backend
