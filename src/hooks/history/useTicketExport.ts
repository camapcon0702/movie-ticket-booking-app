import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import QRCode from "qrcode";
import type { BookingResource } from "../../types/response/BookingRespones";
import { formatDate, formatTime } from "../../utils/formatters";

(pdfMake as any).vfs = (pdfFonts as any).vfs;

export const exportTicketPDF = async (booking:BookingResource) => {
  const qrDataUrl = await QRCode.toDataURL(
    `QNT-${booking.id}`,
    { width: 200 }
  );

  const docDefinition = {
    pageSize: {
      width: 300,
      height: "auto",
    },
    pageMargins: [16, 16, 16, 16],

    content: [
      {
        text: "QNT CINEMA",
        alignment: "center",
        fontSize: 20,
        bold: true,
        color: "#F84565",
        marginBottom: 4,
      },
      {
        text: "VÉ XEM PHIM",
        alignment: "center",
        fontSize: 12,
        marginBottom: 10,
      },

      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              { text: "Phim", bold: true },
              booking.nameMovie,
            ],
            [
              { text: "Ngày", bold: true },
             formatDate(booking.startTime),
            ],
            [
              { text: "Giờ", bold: true },
            formatTime(booking.startTime),
            ],
            [
              { text: "Phòng", bold: true },
              booking.tickets[0]?.auditoriumName || "N/A",
            ],
            [
              { text: "Ghế", bold: true },
              booking.tickets.map(t => t.seatName).join(", "),
            ],
          ],
        },
        layout: "noBorders",
        marginBottom: 12,
      },

      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 260,
            y2: 0,
            dash: { length: 5 },
          },
        ],
        marginBottom: 10,
      },

      {
        columns: [
          { text: "Tổng tiền", bold: true },
          {
            text: booking.total.toLocaleString("vi-VN") + " đ",
            alignment: "right",
            bold: true,
            color: "#F84565",
          },
        ],
        marginBottom: 10,
      },

      {
        image: qrDataUrl,
        width: 120,
        alignment: "center",
        marginBottom: 8,
      },
      {
        text: `Mã vé: #${booking.id}`,
        alignment: "center",
        fontSize: 10,
      },

      {
        text: "Vui lòng xuất trình vé tại quầy hoặc cổng soát vé",
        alignment: "center",
        fontSize: 9,
        marginTop: 10,
        color: "#666",
      },
    ],
  };

  pdfMake.createPdf(docDefinition as any).download(
  `ticket-${booking.id}.pdf`
);
};
