import express from "express";
import cors from "cors";
import { message } from "./personas/index.js";
import { hitesh } from "./personas/hc.js";
import { piyush } from "./personas/pg.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.post("/persona/hc", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const response = await message(hitesh, prompt);
    res.status(200).json({
      success: true,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Persona Collapsed !",
    });
  }
});

app.post("/persona/pg", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const response = await message(piyush, prompt);
    res.status(200).json({
      success: true,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Persona Collapsed !",
    });
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
