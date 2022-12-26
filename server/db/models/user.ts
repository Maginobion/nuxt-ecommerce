import mongoose, { Model, model, Document, Types } from "mongoose";
import userSchema from "../schema/user";

export interface IUserDocument extends Document {
    name: string;
    pass: string;
    email: string;
    role: number;
    cart: {
        items: {
            total_price: number;
            productId: string,
            productName: string,
            quantity: number
        }[];
    };
    addToCart: (a:number)=>void
}

export interface IUserModel extends Model<IUserDocument> {
    makeValidation: (a:string, b:string) => Promise<{
        status: Boolean
        user: IUserDocument & {_id: Types.ObjectId;}
    }>;
}

const User = mongoose.models.User || model<IUserDocument, IUserModel>('User', userSchema)

export default User