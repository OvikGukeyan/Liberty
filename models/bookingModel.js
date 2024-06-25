import { Schema, model } from "mongoose";


const BookingSchema = new Schema ({
    date: {type: Date, required: true},
    hours: {type: [String], required: true },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    room: {type: String, required: true},
    paymentMethod: {type: String, required: true},
    additions: {type: Object},
    invoiceNumber: { type: Number, unique: true }

})

export default model('Boking', BookingSchema);
