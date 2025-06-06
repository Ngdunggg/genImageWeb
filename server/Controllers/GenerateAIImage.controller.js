import { Modality } from "@google/genai";
import ai from "../configs/genai.js";
import { createError } from "../error.js";

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return next(createError(400, "Prompt không hợp lệ!"));
    }

    console.log(prompt);

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: prompt,
        config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
    });

    const imageData = response.candidates[0].content.parts?.[1]?.inlineData?.data

    console.log(imageData)

    if (!imageData) {
      throw new Error("Không nhận được dữ liệu ảnh từ Gemini");
    }

    return res.status(201).json({ photo: imageData });
  } catch (err) {
    next(createError(err.status || 500, err?.response?.data?.error?.message || err?.message));
  }
};
