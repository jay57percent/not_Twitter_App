import express from 'express';
import { imageGeneration } from '../controllers/imageGeneration.js';

const router = express.Router();

router.post("/generate-image", imageGeneration);

export default router;