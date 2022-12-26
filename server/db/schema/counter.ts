import mongoose, { Schema, Types, model, Model } from 'mongoose'

export interface ICounterDocument extends Document {
    _id: string;
    seq: number;
}

export interface ICounterModel extends Model<ICounterDocument> {
    counterValue: (id:string) => Promise<{
        res: ICounterDocument
    }>;
}

export const counterSchema = new Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
})

counterSchema.statics.counterValue = async (id) => {
    const res = await Counter.findOneAndUpdate({_id: id}, {$inc: {seq: 1}}, {new: true})
    return res
}

export const Counter = mongoose.models.Counter || model<ICounterDocument, ICounterModel>('Counter', counterSchema)

// export const counterValue = async () => {
//     const res = await CounterModel.findOneAndUpdate({_id: 'invoice'}, {$inc: {seq: 1}}, {new: true})
//     return res
// }