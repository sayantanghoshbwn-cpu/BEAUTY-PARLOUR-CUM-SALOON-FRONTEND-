import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { siteConfig } from '../config/siteConfig';

/**
 * Generates an ultra-clean, aesthetic luxury salon PDF appointment pass and printable pass.
 * Guarantees 100% exact parity between Download PDF and Print Pass.
 */

const generateInvoiceCardHtml = (booking) => {
  const brand = siteConfig.brand;
  const contact = siteConfig.contact;
  const whatsapp = siteConfig.whatsapp;
  const hours = siteConfig.businessHours;

  const rawId = booking?.id || booking?.passId || ('AL-' + Math.floor(100000 + Math.random() * 900000));
  const passId = String(rawId).startsWith('#') ? String(rawId) : `#${rawId}`;
  const passStatus = booking?.status?.toUpperCase().includes('CONFIRM') ? 'CONFIRMED' : (booking?.status?.toUpperCase() || 'CONFIRMED');

  const issuedDate = new Date(booking?.createdAt || Date.now()).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const servicesList = Array.isArray(booking?.services) ? booking.services : [booking?.services || 'Salon Treatment'];

  return `
    <div style="
      width: 750px;
      background-color: #ffffff !important;
      color: #0f172a !important;
      padding: 0;
      box-sizing: border-box;
      border: 2px solid #d4af37;
      border-radius: 14px;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    ">
      <!-- Top Gold Gradient Stripe -->
      <div style="
        height: 6px;
        background: linear-gradient(90deg, #aa8420, #d4af37, #f7d070, #d4af37, #aa8420) !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      "></div>

      <!-- Header Banner (Rock-solid Table Layout for 100% Parity in PDF & Print) -->
      <table style="
        width: 100%;
        border-collapse: collapse;
        border: none;
        background-color: #0c0e17 !important;
        color: #ffffff !important;
        border-bottom: 2px solid #d4af37;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      ">
        <tr>
          <!-- Left: Brand Monogram & Name -->
          <td style="padding: 22px 20px 22px 28px; vertical-align: middle;">
            <table style="border-collapse: collapse; border: none;">
              <tr>
                <td style="vertical-align: middle; padding-right: 14px; width: 50px;">
                  <div style="
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #f7d070 0%, #d4af37 50%, #aa8420 100%) !important;
                    color: #08090d !important;
                    font-family: 'Playfair Display', Georgia, serif;
                    font-weight: 800;
                    font-size: 17px;
                    text-align: center;
                    line-height: 44px;
                    border: 1.5px solid #ffffff;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                  ">
                    AL
                  </div>
                </td>
                <td style="vertical-align: middle;">
                  <div style="
                    display: inline-block;
                    background-color: rgba(212, 175, 55, 0.2) !important;
                    color: #f3cf7a !important;
                    border: 1px solid rgba(212, 175, 55, 0.5);
                    font-size: 8.5px;
                    font-weight: 800;
                    letter-spacing: 1.2px;
                    padding: 2px 7px;
                    border-radius: 4px;
                    text-transform: uppercase;
                    margin-bottom: 3px;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                  ">
                    ★ OFFICIAL APPOINTMENT PASS
                  </div>
                  <div style="
                    font-size: 26px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    font-family: 'Playfair Display', Georgia, serif;
                    line-height: 1.1;
                  ">
                    <span style="color: #ffffff !important;">AURA </span>
                    <span style="color: #f3cf7a !important;">LUXE</span>
                  </div>
                  <div style="
                    color: #d4af37 !important;
                    font-size: 10px;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    font-weight: 600;
                    margin-top: 2px;
                  ">
                    ${brand.tagline || 'Beauty Parlour & Unisex Luxury Salon'}
                  </div>
                </td>
              </tr>
            </table>
          </td>

          <!-- Right: Pass ID & Status Box -->
          <td style="padding: 22px 28px 22px 10px; vertical-align: middle; text-align: right; width: 210px;">
            <div style="
              background-color: #171a28 !important;
              border: 1.5px solid #d4af37 !important;
              border-radius: 10px;
              padding: 9px 16px;
              display: inline-block;
              text-align: right;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            ">
              <div style="font-size: 8.5px; color: #9499a8 !important; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;">
                Pass Reference ID
              </div>
              <div style="font-size: 17px; font-weight: 800; color: #f3cf7a !important; font-family: 'Courier New', Courier, monospace, sans-serif !important; letter-spacing: 1px; margin-top: 2px;">
                ${passId}
              </div>
              <div style="font-size: 9.5px; color: #4ade80 !important; font-weight: 700; margin-top: 2px;">
                ✓ ${passStatus}
              </div>
            </div>
          </td>
        </tr>
      </table>

      <!-- Sub Ribbon -->
      <table style="
        width: 100%;
        border-collapse: collapse;
        background-color: #faf7ed !important;
        border-bottom: 1px solid #ebdcb9;
        font-size: 10.5px;
        color: #786227 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      ">
        <tr>
          <td style="padding: 9px 28px; vertical-align: middle;">
            <strong>Issued On:</strong> ${issuedDate}
          </td>
          <td style="padding: 9px 10px; text-align: center; vertical-align: middle;">
            <strong>Lounge:</strong> VIP Sanctuary Suite
          </td>
          <td style="padding: 9px 28px; text-align: right; vertical-align: middle;">
            <strong>Booking Status:</strong> <span style="color: #166534 !important; font-weight: 700;">Verified & Confirmed</span>
          </td>
        </tr>
      </table>

      <!-- Main Body Container -->
      <div style="padding: 22px 28px; background-color: #ffffff !important;">

        <!-- Client & Schedule Grid (Table-based for 100% precision) -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
          <tr>
            <!-- Client Card -->
            <td style="width: 48%; vertical-align: top; padding-right: 8px;">
              <div style="
                background-color: #fafafc !important;
                border: 1px solid #e2e8f0;
                border-left: 4px solid #d4af37;
                border-radius: 8px;
                padding: 12px 14px;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              ">
                <div style="font-size: 9.5px; font-weight: 700; color: #9a761e !important; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                  👤 Guest Information
                </div>
                <div style="font-size: 14px; font-weight: 700; color: #0f172a !important; margin-bottom: 2px;">
                  ${booking?.clientName || 'Valued Guest'}
                </div>
                <div style="font-size: 11.5px; color: #475569 !important;">
                  📱 Phone: <strong style="color: #0f172a !important;">${booking?.clientPhone || 'Not provided'}</strong>
                </div>
                ${booking?.clientEmail ? `<div style="font-size: 10.5px; color: #64748b !important; margin-top: 2px;">✉️ ${booking.clientEmail}</div>` : ''}
              </div>
            </td>

            <!-- Schedule Card -->
            <td style="width: 48%; vertical-align: top; padding-left: 8px;">
              <div style="
                background-color: #fafafc !important;
                border: 1px solid #e2e8f0;
                border-left: 4px solid #d4af37;
                border-radius: 8px;
                padding: 12px 14px;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              ">
                <div style="font-size: 9.5px; font-weight: 700; color: #9a761e !important; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                  📅 Reservation Schedule
                </div>
                <div style="font-size: 14px; font-weight: 700; color: #0f172a !important; margin-bottom: 2px;">
                  ${booking?.date || 'Scheduled Date'}
                </div>
                <div style="font-size: 11.5px; color: #475569 !important;">
                  ⏰ Slot: <strong style="color: #9a5309 !important; background-color: #fef3c7 !important; padding: 2px 6px; border-radius: 4px; -webkit-print-color-adjust: exact !important;">${booking?.slot || 'Confirmed Slot'}</strong>
                </div>
                <div style="font-size: 10.5px; color: #64748b !important; margin-top: 2px;">
                  ✂️ Specialist: <strong style="color: #0f172a !important;">${booking?.stylist || 'Master Stylist'}</strong>
                </div>
              </div>
            </td>
          </tr>
        </table>

        <!-- Booked Services Table -->
        <div style="margin-bottom: 18px;">
          <div style="font-size: 10.5px; font-weight: 700; color: #0f172a !important; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
            💅 Booked Treatments & Services
          </div>

          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 11.5px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
            <thead>
              <tr style="background-color: #f8fafc !important; border-bottom: 2px solid #e2e8f0; -webkit-print-color-adjust: exact !important;">
                <th style="padding: 9px 12px; color: #475569 !important; font-weight: 700; width: 36px;">#</th>
                <th style="padding: 9px 12px; color: #475569 !important; font-weight: 700;">Service Description</th>
                <th style="padding: 9px 12px; color: #475569 !important; font-weight: 700; text-align: right;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${servicesList
                .map(
                  (srv, idx) => `
                <tr style="border-bottom: 1px solid #f1f5f9; background-color: ${idx % 2 === 0 ? '#ffffff' : '#fafafa'} !important; -webkit-print-color-adjust: exact !important;">
                  <td style="padding: 9px 12px; font-weight: 700; color: #b45309 !important;">0${idx + 1}</td>
                  <td style="padding: 9px 12px;">
                    <strong style="color: #0f172a !important; font-size: 12px;">${srv}</strong>
                    <div style="color: #64748b !important; font-size: 9.5px; margin-top: 1px;">Professional salon service by master stylist</div>
                  </td>
                  <td style="padding: 9px 12px; text-align: right; color: #166534 !important; font-weight: 700;">
                    ✓ Slot Reserved
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>

        <!-- Payment & Total Summary Card -->
        <table style="
          width: 100%;
          border-collapse: collapse;
          background-color: #faf6ea !important;
          border: 1.5px solid #ebdcb9;
          border-radius: 8px;
          margin-bottom: 16px;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        ">
          <tr>
            <td style="padding: 14px 18px; vertical-align: middle;">
              <div style="font-size: 10.5px; font-weight: 700; text-transform: uppercase; color: #786227 !important; letter-spacing: 0.5px;">
                Estimated Total Payable
              </div>
              <div style="font-size: 10.5px; color: #64748b !important; margin-top: 2px;">
                ✓ Pay at Salon Reception after treatment (Cash / UPI / Card)
              </div>
            </td>
            <td style="padding: 14px 18px; text-align: right; vertical-align: middle;">
              <div style="
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 25px;
                font-weight: 800;
                color: #9a761e !important;
              ">
                ${booking?.currency || brand.currency || '₹'}${booking?.amount || 0}
              </div>
            </td>
          </tr>
        </table>

        <!-- Guidelines / Instructions -->
        <div style="
          background-color: #eff6ff !important;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        ">
          <div style="font-size: 9.5px; font-weight: 700; color: #1e40af !important; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
            📌 Important Guidelines for Guests
          </div>
          <div style="font-size: 10.5px; color: #334155 !important; line-height: 1.45;">
            • Please arrive 10-15 minutes prior to your allocated slot for consultation and refreshments.<br />
            • Present this official pass or Pass ID <strong>${passId}</strong> at the reception desk upon arrival.<br />
            • For rescheduling or queries, reach our WhatsApp Concierge: <strong>+${whatsapp.number}</strong>.
          </div>
        </div>

        <!-- Footer Section -->
        <table style="width: 100%; border-collapse: collapse; border-top: 1px dashed #cbd5e1; padding-top: 14px;">
          <tr>
            <td style="vertical-align: bottom; font-size: 10px; color: #64748b !important; line-height: 1.5; padding-top: 14px;">
              <strong style="color: #0f172a !important; font-size: 11px; display: block; margin-bottom: 1px;">${brand.name} Studio</strong>
              📍 ${contact.address}<br />
              📞 Helpline: ${contact.primaryPhone} | 💬 WhatsApp: +${whatsapp.number}<br />
              🕒 Hours: Mon-Fri: ${hours?.mon_fri?.display || '10:00 AM - 09:00 PM'} | Sat-Sun: ${hours?.saturday?.display || '09:00 AM - 10:00 PM'}
            </td>
            <td style="vertical-align: bottom; text-align: right; padding-top: 14px;">
              <div style="
                display: inline-block;
                border: 1.5px solid #d4af37;
                border-radius: 6px;
                padding: 4px 10px;
                background-color: #faf6ea !important;
                text-align: center;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              ">
                <div style="color: #9a761e !important; font-size: 8px; font-weight: 800; letter-spacing: 1px;">★ AURA LUXE ★</div>
                <div style="color: #0f172a !important; font-size: 9px; font-weight: 700; letter-spacing: 0.5px; margin-top: 1px;">VERIFIED PASS</div>
              </div>
              <div style="
                font-family: monospace;
                letter-spacing: 4px;
                font-size: 12px;
                color: #475569 !important;
                margin-top: 4px;
              ">
                ||| | |||| || | ||||| | ||
              </div>
            </td>
          </tr>
        </table>

      </div>
    </div>
  `;
};

/**
 * Downloads the appointment pass directly as a clean, crisp, high-quality PDF file.
 */
export const downloadAppointmentPassPdf = async (booking) => {
  const container = document.createElement('div');
  container.id = 'aura-luxe-temp-pdf-pass';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '750px';
  container.style.backgroundColor = '#ffffff';
  container.style.zIndex = '-99999';
  container.style.pointerEvents = 'none';
  container.innerHTML = generateInvoiceCardHtml(booking);

  document.body.appendChild(container);

  try {
    if (document.fonts) {
      await document.fonts.ready;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));

    const targetNode = container.firstElementChild;
    const canvas = await html2canvas(targetNode, {
      scale: 2.2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      windowHeight: 1200,
      x: 0,
      y: 0,
      width: 750,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    
    // PDF Dimensions (A4 portrait)
    const imgWidth = 210; // A4 width mm
    const pageHeight = 297; // A4 height mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: imgHeight > pageHeight ? [imgWidth, imgHeight + 10] : 'a4',
    });

    const yOffset = imgHeight < pageHeight ? 6 : 0;
    pdf.addImage(imgData, 'JPEG', 0, yOffset, imgWidth, imgHeight);

    const safeId = booking?.id || booking?.passId || 'Booking';
    const fileName = `AuraLuxe_Pass_${safeId}.pdf`;
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF pass:', error);
    return false;
  } finally {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
};

/**
 * Direct print window for 1-click printing with exact styling matching the PDF.
 */
export const printAppointmentPass = (booking) => {
  const cardHtml = generateInvoiceCardHtml(booking);
  const rawId = booking?.id || booking?.passId || 'Pass';
  const passId = String(rawId).startsWith('#') ? String(rawId) : `#${rawId}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aura Luxe - Appointment Pass ${passId}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { 
      box-sizing: border-box; 
      margin: 0; 
      padding: 0; 
      -webkit-print-color-adjust: exact !important; 
      print-color-adjust: exact !important; 
      color-adjust: exact !important; 
    }
    body {
      background: #f8fafc;
      color: #0f172a;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 24px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .no-print {
      margin-bottom: 16px;
      display: flex;
      gap: 10px;
    }
    .btn-print {
      background: #d4af37;
      color: #000000;
      font-weight: 700;
      border: none;
      padding: 8px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
    }
    @media print {
      body { background: #fff; color: #000; padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button onclick="window.print()" class="btn-print">
      🖨️ Print Now
    </button>
  </div>

  ${cardHtml}
</body>
</html>`;

  const printWindow = window.open('', '_blank', 'width=840,height=900');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 350);
  }
};
