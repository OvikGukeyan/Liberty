import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking', required: true }],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    invoiceNumber: { type: Number },
},
    {
        timestamps: true
    }
);

export default model('Order', OrderSchema);
