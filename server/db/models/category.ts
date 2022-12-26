import mongoose, { model } from "mongoose";
import categorySchema from "../schema/category";

const Category = mongoose.models.Category || model('Category', categorySchema)

export default Category