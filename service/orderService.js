import orderModel from "../models/orderModel.js";
class OrderService {
    async addOrder(data) {
        const newOrder = {
            bookings: data.map(item => item._id),
            totalPrice: data.reduce((acc, item) => acc + item.price, 0),
            paymentMethod: data[0].paymentMethod,
            user: data[0].user,
            invoiceNumber: data[0].invoiceNumber
        }
        const order = await orderModel.create(newOrder)
        return order
    }
}

export default new OrderService()