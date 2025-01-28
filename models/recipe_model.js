const slugify = require("slugify");
const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  slug: { type: String, unique: true }, // Add a slug field
  ingredients: { type: String, required: true },
  steps: { type: String, required: true },
  calories: { type: String, required: true },
  imageUrl: { type: String, default: "" },
});

RecipeSchema.pre("save", function (next) {
  this.slug = slugify(this.recipeName, { lower: true, strict: true });
  next();
});

//module.exports = mongoose.model("Recipes", RecipeSchema);

module.exports = mongoose.model("Recipes", RecipeSchema, "recipes");
