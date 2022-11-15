import { model } from "mongoose";
import categorySchema from "../schema/category";

const Category = model('Category', categorySchema)

export default Category