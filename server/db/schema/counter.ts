import { Schema } from 'mongoose'
import { Counter } from '../models/counter';

export const counterSchema = new Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
})

counterSchema.statics.counterValue = async (id) => {
    const res = await Counter.findOneAndUpdate({_id: id}, {$inc: {seq: 1}}, {new: true})
    return res
}