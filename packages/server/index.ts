import express, { response } from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(express.json());
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY_1 || '');
const port = process.env.PORT || 3000;
let lastResponseId: string | null = null;
app.post('/api/chat', async (req: Request, res: Response) => {
   const { prompt } = req.body;

   try {
      const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' }); // إرسال الطلب
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return res.json({ message: (response as any).responseId, text });
   } catch (error) {
      console.error('Google API Error:', error);
      return res.status(500).json({ error: 'Failed to communicate with AI' });
   }
});
app.post('/api/chatopenai', async (req: Request, res: Response) => {
   const { prompt } = req.body;
   console.log(prompt);
   const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
   });

   return res.json({ message: response.output_text });
});
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
