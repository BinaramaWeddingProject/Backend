import mongoose, { Document, Schema } from "mongoose";

// Subcategory interface
interface SubCategory {
  name: string;
  quantity: number;
}

// Category interface
interface Category {
  name: string;
  packagePrice: number;
  subCategories: SubCategory[];
}

// Main FoodPackage interface
interface IFoodPackage extends Document {
  vegCategory: Category;
  nonVegCategory: Category;
}

// FoodPackage schema
const FoodPackageSchema = new Schema<IFoodPackage>(
  {
    vegCategory: {
      name: { type: String, default: "Veg" },
      packagePrice: { type: Number, required: true },
      subCategories: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true }
        }
      ]
    },
    nonVegCategory: {
      name: { type: String, default: "Non-Veg" },
      packagePrice: { type: Number, required: true },
      subCategories: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true }
        }
      ]
    }
  },
  { timestamps: true }
);


export const FoodPackage = mongoose.model<IFoodPackage>("FoodPackage", FoodPackageSchema);
