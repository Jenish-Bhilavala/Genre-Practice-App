const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");
const { Genre, validateGenre } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", authMiddleware, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genres = new Genre({ name: req.body.name });
  genres = await genres.save();

  res.status(201).send(genres);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("Genre Not Found");

  res.send(genre);
});

router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send("Genre Not Found");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre Not Found");
  res.send(genre);
});

module.exports = router;
