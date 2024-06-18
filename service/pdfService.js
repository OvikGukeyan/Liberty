import { PDFDocument } from "pdf-lib";

class pdfService {

  async createBill(bookingDetails) {
    const { firstName, lastName, room, date, hours } = bookingDetails;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText(`Bill for Booking`, { x: 50, y: 350, size: 20 });
    page.drawText(`Name: ${firstName}`, { x: 50, y: 320, size: 15 });
    page.drawText(`Last Name: ${lastName}`, { x: 50, y: 300, size: 15 });
    page.drawText(`Room: ${room}`, { x: 50, y: 280, size: 15 });
    page.drawText(`Date: ${date}`, { x: 50, y: 260, size: 15 });
    page.drawText(`Hours: ${hours.join(", ")}`, { x: 50, y: 240, size: 15 });
    // page.drawText(`Total Amount: $${totalAmount}`, { x: 50, y: 220, size: 15 });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }
}

export default new pdfService;
