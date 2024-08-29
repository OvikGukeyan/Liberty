import { Schema, model } from "mongoose";


export const BookingSchema = new Schema({
    date: { type: Date, required: true },
    hours: { type: [String], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    additions: { type: Object },
    invoiceNumber: { type: Number },
    numberOfVisitors: { type: Number },
    price: { type: Number, required: true, default: 0 },
},
    {
        timestamps: true
    });

export default model('Booking', BookingSchema);
