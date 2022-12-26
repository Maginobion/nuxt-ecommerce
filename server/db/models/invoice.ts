import mongoose, { model } from "mongoose";
import invoiceSchema from "../schema/invoice";

const Invoice = mongoose.models.Invoice || model('Invoice', invoiceSchema)

export default Invoice