import { Model, model, Document, Types } from "mongoose";
import userSchema from "../schema/user";

interface IUserDocument extends Document {
    name: string;
    pass: string;
    email: string;
}

interface IUserModel extends Model<IUserDocument> {
    makeValidation: (a:string, b:string) => Promise<IUserDocument & {
        _id: Types.ObjectId;
    }>;
}

const User = model<IUserDocument, IUserModel>('User', userSchema)

export default User