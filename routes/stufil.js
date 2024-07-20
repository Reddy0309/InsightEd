import express from "express";
import stumentor from "../models/stumentor.js";

const filterRoutes = express.Router();

filterRoutes.post("/filter", async (req, res) => {
  const { name } = req.body;
  try {
    const students = await stumentor.find({ "NAME OF THE MENTOR": name });
    res.json({ students });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the data." });
  }
});

export default filterRoutes;
