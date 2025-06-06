import express from 'express'
import { generateImage } from '../Controllers/GenerateAIImage.controller.js'

const generatedImageRouter = express.Router()

generatedImageRouter.post("/", generateImage)

export default generatedImageRouter