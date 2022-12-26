import mongoose, { model, Model } from 'mongoose'
import { counterSchema } from '../schema/counter';

export interface ICounterDocument extends Document {
    _id: string;
    seq: number;
}

export interface ICounterModel extends Model<ICounterDocument> {
    counterValue: (id:string) => Promise<{
        res: ICounterDocument
    }>;
}

export const Counter = mongoose.models.Counter || model<ICounterDocument, ICounterModel>('Counter', counterSchema)