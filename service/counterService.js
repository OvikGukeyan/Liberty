import counterModel from "../models/counterModel.js";


class CounterService {
    async getNextInvoiceNumber() {
        const counter = await counterModel.findOneAndUpdate(
            { name: 'invoiceNumber' },
            { $inc: { value: 1 } },
            { new: true, upsert: true }
          );
          return counter.value;
    }
}


export default new CounterService();