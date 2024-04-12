import OpenAI from 'openai';



export const imageGeneration = async (req, res) => {
  const { prompt } = req.body;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",   
      prompt: prompt,
      n: 1, // Number of images to generate
      size: "1024x1024" // Image size, adjust as needed
    });

    console.log("response: ", response);

    // Assuming you want to send the first image's URL back
    // Corrected way to access the URL based on your provided response structure
    if (response && response.data && response.data.length > 0) {
      const imageUrl = response.data[0].url;
      res.json({ imageUrl });
    } else {
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Error generating image with OpenAI' });
  }
};
