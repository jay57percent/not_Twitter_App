import express from 'express';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import apiRoutes from './routes/api.js'
import { verifyToken } from './middleware/auth.js';
import { createPost } from './controllers/posts.js';



/*Configuration*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
  
const app = express();
/**/ 
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

/*File Storage*/

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null,"public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname) 
    }
})

const upload = multer({storage});

/*Routes*/
app.post(
    "/auth/register", 
    upload.fields([
      { name: 'picture', maxCount: 1 },
      { name: 'coverPicture', maxCount: 1 }
    ]), 
    register
  );
app.post("/post", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
/*Mongoose setup*/ 
const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

})
.catch((error) => console.log(`${error} did not connect`));