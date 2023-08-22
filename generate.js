import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const inputA = req.body.inputA || '';
  const inputB = req.body.inputB || '';

  if (inputA.trim().length === 0 || inputB.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter valid input A and input B",
      }
    });
    return;
  }

  try {
    // First API call with input A
    const completion1 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputA,
      temperature: 0.6,
    });

    const outputX = completion1.data.choices[0].text.trim();
    console.log(`First API Output X: ${outputX}`);

    // Second API call with output X
    const completion2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: outputX,
      temperature: 0.6,
    });

    const outputY = completion2.data.choices[0].text.trim();
    console.log(`Second API Output Y: ${outputY}`);

    // Third API call with combined inputs
    const combinedInput = `${inputB}\n${inputA}\n${outputX}`;
    const completion3 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: combinedInput,
      temperature: 0.6,
    });

    const finalOutput = completion3.data.choices[0].text.trim();
    console.log(`Final API Output: ${finalOutput}`);

    console.log("All API calls completed successfully.");
    res.status(200).json({ finalOutput });
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
