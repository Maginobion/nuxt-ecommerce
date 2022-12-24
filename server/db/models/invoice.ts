import { model } from "mongoose";
import invoiceSchema from "../schema/invoice";

const Invoice = model('Invoice', invoiceSchema)

export default Invoice