import jsPDF from "jspdf";


import type { BookingResource } from "../../types/response/BookingRespones";
import { formatDate, formatTime, formatVND } from "../../utils/formatters";

export const useExportTicketPDF = () => {
  const exportTicketPDF = (booking: BookingResource) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let y = 20;

    pdf.setFontSize(18);
    pdf.text("VÉ XEM PHIM", 105, y, { align: "center" });

    y += 10;
    pdf.setFontSize(11);
    pdf.text(`Booking #${booking.id}`, 105, y, { align: "center" });

    y += 6;
    pdf.line(20, y, 190, y);

    y += 10;
    pdf.setFontSize(14);
    pdf.text(booking.nameMovie, 20, y);

    y += 8;
    pdf.setFontSize(11);
    pdf.text(`Ngày chiếu: ${formatDate(booking.startTime)}`, 20, y);
    pdf.text(`Giờ chiếu: ${formatTime(booking.startTime)}`, 120, y);

    y += 7;
    pdf.text(
      `Phòng: ${booking.tickets[0]?.auditoriumName || "N/A"}`,
      20,
      y
    );

    y += 10;
    pdf.setFontSize(13);
    pdf.text("Ghế:", 20, y);

    y += 6;
    pdf.setFontSize(11);
    const seats = booking.tickets.map(t => t.seatName).join(", ");
    pdf.text(seats, 20, y);

    if (booking.orderedFoods.length > 0) {
      y += 12;
      pdf.setFontSize(13);
      pdf.text("Đồ ăn & Thức uống:", 20, y);

      y += 6;
      pdf.setFontSize(11);
      booking.orderedFoods.forEach(food => {
        pdf.text(
          `• ${food.foodName} x${food.quantity}`,
          22,
          y
        );
        y += 6;
      });
    }

    y += 8;
    pdf.line(20, y, 190, y);

    y += 10;
    pdf.setFontSize(14);
    pdf.text("Tổng thanh toán:", 20, y);
    pdf.text(formatVND(booking.total), 190, y, { align: "right" });

    y += 15;
    pdf.setFontSize(10);
    pdf.text(
      "Vui lòng xuất trình vé này khi vào rạp",
      105,
      y,
      { align: "center" }
    );

    pdf.save(`ticket-booking-${booking.id}.pdf`);
  };

  return { exportTicketPDF };
};
