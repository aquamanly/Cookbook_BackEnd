const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe_model");

// GET /api/recipes - Fetch all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    console.error("Error fetching recipes:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/recipes/:id - Fetch a single recipe by ID
/*router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    console.error("Error fetching recipe:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});*/

router.get("/:slug", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ slug: req.params.slug });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /api/recipes - Create a new recipe
router.post("/", async (req, res) => {
  const { recipeName, ingredients, steps, calories, imageUrl } = req.body;

  try {
    const newRecipe = new Recipe({
      recipeName,
      ingredients,
      steps,
      calories,
      imageUrl,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT /api/recipes/:id - Update an existing recipe
router.put("/:slug", async (req, res) => {
  const { recipeName, ingredients, steps, calories, imageUrl } = req.body;

  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { slug: req.params.slug },
      { recipeName, ingredients, steps, calories, imageUrl },
      { new: true }
    );

    if (!updatedRecipe)
      return res.status(404).json({ message: "Recipe not found" });

    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE /api/recipes/:id - Delete a recipe
router.delete("/:slug", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!deletedRecipe)
      return res.status(404).json({ message: "Recipe not found" });

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
