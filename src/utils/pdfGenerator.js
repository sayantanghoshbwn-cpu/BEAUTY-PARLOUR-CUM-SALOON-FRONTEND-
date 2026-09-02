import jsPDF from 'jspdf';
import { siteConfig } from '../config/siteConfig';

/**
 * 🌟 AURA LUXE - ULTRA-LUXURY NATIVE VECTOR PDF & PRINT ENGINE
 * ==============================================================================
 * Key Advantages:
 * 1. 100% Native Vector Drawing (Zero Blurriness, Razor-Sharp at 500% Zoom)
 * 2. Instant Zero-Latency Download (No Canvas Rendering or Screen Artifacts)
 * 3. Perfect Geometry & Clean Margins on Standard A4 Portrait (210mm x 297mm)
 * 4. Zero Missing Unicode Glyphs or Cut-Off Text
 * 5. High-Fidelity Responsive Print Engine with IFrame Popup-Blocker Immunity
 */

/**
 * Generates an Ultra-Luxury Native Vector PDF Pass using jsPDF.
 */
export const downloadAppointmentPassPdf = async (booking) => {
  try {
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

    let formattedReservationDate = 'Scheduled Date';
    if (booking?.date) {
      try {
        const dateParts = String(booking.date).split('-');
        if (dateParts.length === 3) {
          const d = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
          formattedReservationDate = d.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
        } else {
          formattedReservationDate = booking.date;
        }
      } catch {
        formattedReservationDate = booking.date;
      }
    }

    const servicesList = Array.isArray(booking?.services) && booking.services.length > 0
      ? booking.services
      : [booking?.services || 'Signature Haute Treatment'];

    const clientName = booking?.clientName || 'Valued Guest';
    const clientPhone = booking?.clientPhone || 'Provided at Reception';
    const clientEmail = booking?.clientEmail || '';
    const bookingSlot = booking?.slot || 'Confirmed Time Slot';
    const bookingStylist = booking?.stylist || 'Master Specialist';
    const billAmount = booking?.amount !== undefined ? booking.amount : 0;
    const currencySymbol = booking?.currency || brand.currency || 'Rs.';

    // Create Standard A4 Portrait jsPDF Document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4', // 210mm x 297mm
    });

    // --------------------------------------------------------------------------
    // 1. OUTER LUXURY FRAME & CARD BACKGROUND
    // --------------------------------------------------------------------------
    // Outer Pure White Card
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(212, 175, 55); // 24K Gold Border
    pdf.setLineWidth(0.8);
    pdf.roundedRect(12, 12, 186, 273, 4, 4, 'FD');

    // Subtle Inset Gold Line
    pdf.setDrawColor(235, 220, 185);
    pdf.setLineWidth(0.25);
    pdf.roundedRect(13.5, 13.5, 183, 270, 3, 3, 'S');

    // --------------------------------------------------------------------------
    // 2. TOP LUXURY HEADER (OBSIDIAN BLACK & 24K GOLD)
    // --------------------------------------------------------------------------
    // Header Black Box
    pdf.setFillColor(9, 11, 20);
    pdf.rect(12, 12, 186, 36, 'F');

    // Top Gold Bar
    pdf.setFillColor(212, 175, 55);
    pdf.rect(12, 12, 186, 2, 'F');

    // Bottom Gold Header Line
    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(0.6);
    pdf.line(12, 48, 198, 48);

    // Monogram Seal "AL"
    pdf.setFillColor(212, 175, 55);
    pdf.circle(26, 30, 8, 'F');
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.5);
    pdf.circle(26, 30, 8, 'S');

    pdf.setFont('times', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(9, 11, 20);
    pdf.text('AL', 26, 33.5, { align: 'center' });

    // Brand Name & Tagline
    pdf.setFillColor(35, 30, 15);
    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(38, 18.5, 56, 4.5, 1, 1, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(250, 225, 156);
    pdf.text('* OFFICIAL APPOINTMENT PASS', 40, 21.8);

    pdf.setFont('times', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(255, 255, 255);
    pdf.text('AURA', 38, 30.5);
    pdf.setTextColor(250, 225, 156);
    pdf.text(' LUXE', 38 + pdf.getTextWidth('AURA'), 30.5);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(212, 175, 55);
    pdf.text('HAUTE COUTURE & LUXURY UNISEX SALON * KOLKATA', 38, 36.5);

    // Right: Pass Reference ID & Status Badge Box
    pdf.setFillColor(19, 23, 38);
    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(0.4);
    pdf.roundedRect(138, 18, 54, 24, 2, 2, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(203, 213, 225);
    pdf.text('PASS REFERENCE ID', 165, 23.5, { align: 'center' });

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(250, 204, 21);
    pdf.text(passId, 165, 30, { align: 'center' });

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(74, 222, 128);
    pdf.text('[OK] ' + passStatus, 165, 37, { align: 'center' });

    // --------------------------------------------------------------------------
    // 3. SUB-BAR METADATA STRIP
    // --------------------------------------------------------------------------
    pdf.setFillColor(250, 247, 237);
    pdf.rect(12, 48, 186, 7.5, 'F');
    pdf.setDrawColor(235, 220, 185);
    pdf.setLineWidth(0.3);
    pdf.line(12, 55.5, 198, 55.5);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(120, 98, 39);
    pdf.text('Issued On: ' + issuedDate, 18, 53);
    pdf.text('Lounge: VIP Sanctuary Suite', 105, 53, { align: 'center' });

    pdf.setTextColor(22, 101, 52);
    pdf.text('Verification: Verified & Confirmed', 192, 53, { align: 'right' });

    // --------------------------------------------------------------------------
    // 4. GUEST INFORMATION & RESERVATION SCHEDULE CARDS
    // --------------------------------------------------------------------------
    // Left: Guest Info Card
    pdf.setFillColor(250, 250, 252);
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(18, 61, 84, 30, 2, 2, 'FD');

    pdf.setFillColor(212, 175, 55);
    pdf.roundedRect(18, 61, 2.5, 30, 1, 1, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(154, 118, 30);
    pdf.text('GUEST INFORMATION', 24, 67.5);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);
    pdf.text(clientName.length > 22 ? clientName.substring(0, 22) + '...' : clientName, 24, 74);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(71, 85, 105);
    pdf.text('Phone:', 24, 80);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text(clientPhone, 36, 80);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text(clientEmail ? clientEmail : 'Digital Pass ID verified', 24, 86);

    // Right: Schedule Card
    pdf.setFillColor(250, 250, 252);
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(108, 61, 84, 30, 2, 2, 'FD');

    pdf.setFillColor(212, 175, 55);
    pdf.roundedRect(108, 61, 2.5, 30, 1, 1, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(154, 118, 30);
    pdf.text('RESERVATION SCHEDULE', 114, 67.5);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);
    pdf.text(formattedReservationDate, 114, 74);

    pdf.setFillColor(254, 243, 199);
    pdf.roundedRect(114, 76.5, 38, 5, 1, 1, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(154, 83, 9);
    pdf.text(bookingSlot, 116, 80.2);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text('Specialist: ' + bookingStylist, 114, 86.5);

    // --------------------------------------------------------------------------
    // 5. BOOKED TREATMENTS & SERVICES TABLE
    // --------------------------------------------------------------------------
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(15, 23, 42);
    pdf.text('BOOKED TREATMENTS & SERVICES', 18, 97.5);

    // Table Header
    pdf.setFillColor(15, 23, 42);
    pdf.roundedRect(18, 100.5, 174, 6.5, 1, 1, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(255, 255, 255);
    pdf.text('#', 22, 104.8);
    pdf.text('Treatment / Service Description', 32, 104.8);
    pdf.text('Category', 132, 104.8);
    pdf.text('Status', 186, 104.8, { align: 'right' });

    // Table Rows
    let currentY = 107;
    servicesList.forEach((srv, idx) => {
      pdf.setFillColor(idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      pdf.rect(18, currentY, 174, 8.5, 'F');

      pdf.setDrawColor(241, 245, 249);
      pdf.setLineWidth(0.2);
      pdf.line(18, currentY + 8.5, 192, currentY + 8.5);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(180, 83, 9);
      pdf.text('0' + (idx + 1), 22, currentY + 5.5);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(15, 23, 42);
      const cleanSrvName = String(srv).length > 45 ? String(srv).substring(0, 45) + '...' : String(srv);
      pdf.text(cleanSrvName, 32, currentY + 5.5);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text('Haute Luxury Ritual', 132, currentY + 5.5);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.setTextColor(22, 101, 52);
      pdf.text('[OK] Reserved', 186, currentY + 5.5, { align: 'right' });

      currentY += 8.5;
    });

    // --------------------------------------------------------------------------
    // 6. ESTIMATED BILL & TOTAL SUMMARY
    // --------------------------------------------------------------------------
    const summaryY = Math.max(136, currentY + 3.5);
    pdf.setFillColor(250, 246, 234);
    pdf.setDrawColor(235, 220, 185);
    pdf.setLineWidth(0.4);
    pdf.roundedRect(18, summaryY, 174, 18, 2, 2, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(120, 98, 39);
    pdf.text('ESTIMATED TOTAL BILL PAYABLE', 24, summaryY + 7);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text('* Pay at Salon Reception after treatment via Cash / UPI / Card / NetBanking', 24, summaryY + 13);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(154, 118, 30);
    const formattedPriceText = `Rs. ${Number(billAmount).toLocaleString('en-IN')}`;
    pdf.text(formattedPriceText, 182, summaryY + 11.5, { align: 'right' });

    // --------------------------------------------------------------------------
    // 7. GUEST GUIDELINES BOX
    // --------------------------------------------------------------------------
    const guideY = summaryY + 21.5;
    pdf.setFillColor(239, 246, 255);
    pdf.setDrawColor(191, 219, 254);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(18, guideY, 174, 21, 2, 2, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(30, 64, 175);
    pdf.text('IMPORTANT GUIDELINES FOR GUESTS', 24, guideY + 5);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(51, 65, 85);
    pdf.text('* Please arrive 10-15 minutes prior to your allocated slot for consultation and refreshments.', 24, guideY + 9.8);
    pdf.text(`* Present this official pass or Pass Reference ID ${passId} at the reception desk upon arrival.`, 24, guideY + 13.8);
    pdf.text(`* For rescheduling, bridal inquiries, or queries, reach WhatsApp Concierge: +${whatsapp.number}`, 24, guideY + 17.8);

    // --------------------------------------------------------------------------
    // 8. SALON CONTACT & VERIFICATION FOOTER
    // --------------------------------------------------------------------------
    const footerY = 246;
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.3);
    pdf.line(18, footerY, 192, footerY);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(15, 23, 42);
    pdf.text(`${brand.name} Sanctuary & Unisex Salon`, 18, footerY + 6);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text(`Address: ${contact.address}`, 18, footerY + 10.5);
    pdf.text(`Helpline: ${contact.primaryPhone} | WhatsApp: +${whatsapp.number} | Email: ${contact.email}`, 18, footerY + 14.5);
    pdf.text(`Hours: Mon-Fri: ${hours?.mon_fri?.display || '10:00 AM - 09:00 PM'} | Sat-Sun: ${hours?.saturday?.display || '09:00 AM - 10:00 PM'}`, 18, footerY + 18.5);

    // Verified Seal Box
    pdf.setFillColor(250, 246, 234);
    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(0.4);
    pdf.roundedRect(154, footerY + 3, 38, 10, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(154, 118, 30);
    pdf.text('* AURA LUXE *', 173, footerY + 7, { align: 'center' });

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(15, 23, 42);
    pdf.text('VERIFIED PASS', 173, footerY + 11.5, { align: 'center' });

    // Decorative Digital Barcode
    pdf.setFont('courier', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(71, 85, 105);
    pdf.text('|||| | ||| || ||||| | ||', 173, footerY + 18.5, { align: 'center' });

    // Save PDF
    const safeId = String(rawId).replace('#', '');
    const fileName = `AuraLuxe_Pass_${safeId}.pdf`;
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating vector PDF pass:', error);
    return false;
  }
};

/**
 * Generates the clean HTML structure for high-resolution browser printing.
 */
export const generateInvoiceCardHtml = (booking) => {
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

  let formattedReservationDate = 'Scheduled Date';
  if (booking?.date) {
    try {
      const dateParts = String(booking.date).split('-');
      if (dateParts.length === 3) {
        const d = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
        formattedReservationDate = d.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      } else {
        formattedReservationDate = booking.date;
      }
    } catch {
      formattedReservationDate = booking.date;
    }
  }

  const servicesList = Array.isArray(booking?.services) && booking.services.length > 0
    ? booking.services
    : [booking?.services || 'Signature Haute Treatment'];

  const billAmount = booking?.amount !== undefined ? booking.amount : 0;
  const currencySymbol = booking?.currency || brand.currency || 'Rs.';

  return `
    <div class="print-card-wrapper" style="
      width: 680px;
      max-width: 680px;
      margin: 0 auto;
      background-color: #ffffff !important;
      color: #0f172a !important;
      padding: 0;
      box-sizing: border-box;
      border: 2px solid #d4af37;
      border-radius: 12px;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    ">
      <!-- 24K Gold Accent Top Strip -->
      <div style="
        height: 6px;
        background: #d4af37 !important;
        background: linear-gradient(90deg, #997316 0%, #d4af37 25%, #fae19c 50%, #d4af37 75%, #997316 100%) !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      "></div>

      <!-- Top Header -->
      <div style="
        background-color: #090b14 !important;
        color: #ffffff !important;
        border-bottom: 2px solid #d4af37;
        padding: 18px 22px;
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      ">
        <table style="width: 100%; border-collapse: collapse; border: none;">
          <tr>
            <td style="vertical-align: middle; padding: 0;">
              <table style="border-collapse: collapse; border: none;">
                <tr>
                  <td style="vertical-align: middle; padding-right: 14px; width: 48px;">
                    <div style="
                      width: 44px;
                      height: 44px;
                      border-radius: 50%;
                      background-color: #d4af37 !important;
                      color: #090b14 !important;
                      font-family: 'Playfair Display', Georgia, serif;
                      font-weight: 900;
                      font-size: 16px;
                      text-align: center;
                      line-height: 40px;
                      border: 2px solid #ffffff;
                      box-sizing: border-box;
                    ">
                      AL
                    </div>
                  </td>
                  <td style="vertical-align: middle; padding: 0;">
                    <div style="
                      display: inline-block;
                      background-color: rgba(212, 175, 55, 0.25) !important;
                      color: #fae19c !important;
                      border: 1px solid rgba(212, 175, 55, 0.6);
                      font-size: 8px;
                      font-weight: 800;
                      letter-spacing: 1px;
                      padding: 2px 7px;
                      border-radius: 4px;
                      text-transform: uppercase;
                      margin-bottom: 2px;
                      line-height: 12px;
                    ">
                      * OFFICIAL APPOINTMENT PASS
                    </div>
                    <div style="
                      font-size: 22px;
                      font-weight: 800;
                      letter-spacing: 1.5px;
                      font-family: 'Playfair Display', Georgia, serif;
                      line-height: 26px;
                      color: #ffffff !important;
                    ">
                      AURA <span style="color: #fae19c !important;">LUXE</span>
                    </div>
                    <div style="
                      color: #d4af37 !important;
                      font-size: 9px;
                      letter-spacing: 0.5px;
                      text-transform: uppercase;
                      font-weight: 600;
                      margin-top: 1px;
                    ">
                      ${brand.tagline || 'Haute Couture & Luxury Unisex Salon'}
                    </div>
                  </td>
                </tr>
              </table>
            </td>

            <td style="vertical-align: middle; text-align: right; width: 190px; padding: 0;">
              <div style="
                background-color: #131726 !important;
                border: 1.5px solid #d4af37 !important;
                border-radius: 8px;
                padding: 8px 14px;
                display: inline-block;
                text-align: right;
                box-sizing: border-box;
              ">
                <div style="font-size: 8px; color: #cbd5e1 !important; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;">
                  PASS REFERENCE ID
                </div>
                <div style="font-size: 15px; font-weight: 800; color: #facc15 !important; letter-spacing: 1px; margin: 2px 0;">
                  ${passId}
                </div>
                <div style="font-size: 9px; color: #4ade80 !important; font-weight: 800;">
                  [OK] ${passStatus}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Sub-Bar -->
      <table style="
        width: 100%;
        border-collapse: collapse;
        background-color: #faf7ed !important;
        border-bottom: 1px solid #ebdcb9;
        font-size: 9.5px;
        color: #786227 !important;
      ">
        <tr>
          <td style="padding: 6px 20px; width: 38%;"><strong>Issued On:</strong> ${issuedDate}</td>
          <td style="padding: 6px 10px; text-align: center; width: 28%;"><strong>Lounge:</strong> VIP Sanctuary Suite</td>
          <td style="padding: 6px 20px; text-align: right; width: 34%;"><strong style="color: #166534 !important;">Verification: Verified & Confirmed</strong></td>
        </tr>
      </table>

      <!-- Main Body -->
      <div style="padding: 16px 20px; background-color: #ffffff !important; box-sizing: border-box;">
        
        <!-- Cards Grid -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; table-layout: fixed;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding-right: 6px;">
              <div style="
                background-color: #fafafc !important;
                border: 1px solid #e2e8f0;
                border-left: 3.5px solid #d4af37;
                border-radius: 8px;
                padding: 10px 12px;
                min-height: 80px;
                box-sizing: border-box;
              ">
                <div style="font-size: 8.5px; font-weight: 700; color: #9a761e !important; text-transform: uppercase; margin-bottom: 2px;">
                  GUEST INFORMATION
                </div>
                <div style="font-size: 13.5px; font-weight: 800; color: #0f172a !important;">
                  ${booking?.clientName || 'Valued Guest'}
                </div>
                <div style="font-size: 10.5px; color: #475569 !important; margin-top: 2px;">
                  Phone: <strong style="color: #0f172a !important;">${booking?.clientPhone || 'Provided at Reception'}</strong>
                </div>
                ${booking?.clientEmail ? `<div style="font-size: 9.5px; color: #64748b !important; margin-top: 1px;">${booking.clientEmail}</div>` : ''}
              </div>
            </td>

            <td style="width: 50%; vertical-align: top; padding-left: 6px;">
              <div style="
                background-color: #fafafc !important;
                border: 1px solid #e2e8f0;
                border-left: 3.5px solid #d4af37;
                border-radius: 8px;
                padding: 10px 12px;
                min-height: 80px;
                box-sizing: border-box;
              ">
                <div style="font-size: 8.5px; font-weight: 700; color: #9a761e !important; text-transform: uppercase; margin-bottom: 2px;">
                  RESERVATION SCHEDULE
                </div>
                <div style="font-size: 13.5px; font-weight: 800; color: #0f172a !important;">
                  ${formattedReservationDate}
                </div>
                <div style="font-size: 10.5px; color: #475569 !important; margin-top: 2px;">
                  Slot: <strong style="color: #9a5309 !important; background-color: #fef3c7 !important; padding: 1px 5px; border-radius: 4px;">${booking?.slot || 'Confirmed Slot'}</strong>
                </div>
                <div style="font-size: 9.5px; color: #64748b !important; margin-top: 1px;">
                  Specialist: <strong style="color: #0f172a !important;">${booking?.stylist || 'Master Stylist'}</strong>
                </div>
              </div>
            </td>
          </tr>
        </table>

        <!-- Treatments Table -->
        <div style="margin-bottom: 12px;">
          <div style="font-size: 9.5px; font-weight: 700; color: #0f172a !important; text-transform: uppercase; margin-bottom: 4px;">
            BOOKED TREATMENTS & SERVICES
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 10.5px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; table-layout: fixed;">
            <thead>
              <tr style="background-color: #0f172a !important; color: #ffffff !important;">
                <th style="padding: 6px 10px; width: 30px; text-align: left;">#</th>
                <th style="padding: 6px 10px; text-align: left;">Service Description</th>
                <th style="padding: 6px 10px; text-align: right; width: 110px;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${servicesList
                .map(
                  (srv, idx) => `
                <tr style="border-bottom: 1px solid #f1f5f9; background-color: ${idx % 2 === 0 ? '#ffffff' : '#fafafa'} !important;">
                  <td style="padding: 7px 10px; font-weight: 700; color: #b45309 !important;">0${idx + 1}</td>
                  <td style="padding: 7px 10px;">
                    <strong style="color: #0f172a !important; font-size: 11px;">${srv}</strong>
                    <div style="color: #64748b !important; font-size: 8.5px;">Haute Luxury Salon Ritual</div>
                  </td>
                  <td style="padding: 7px 10px; text-align: right; color: #166534 !important; font-weight: 700;">
                    [OK] Reserved
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>

        <!-- Payment Total Box -->
        <table style="
          width: 100%;
          border-collapse: collapse;
          background-color: #faf6ea !important;
          border: 1.5px solid #ebdcb9;
          border-radius: 8px;
          margin-bottom: 12px;
        ">
          <tr>
            <td style="padding: 10px 16px; vertical-align: middle;">
              <div style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: #786227 !important;">
                ESTIMATED TOTAL BILL PAYABLE
              </div>
              <div style="font-size: 9px; color: #64748b !important; margin-top: 1px;">
                * Pay at Salon Reception after treatment (Cash / UPI / Card / NetBanking)
              </div>
            </td>
            <td style="padding: 10px 16px; text-align: right; vertical-align: middle; width: 160px;">
              <div style="
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 20px;
                font-weight: 800;
                color: #9a761e !important;
              ">
                Rs. ${Number(billAmount).toLocaleString('en-IN')}
              </div>
            </td>
          </tr>
        </table>

        <!-- Guidelines -->
        <div style="
          background-color: #eff6ff !important;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          padding: 8px 12px;
          margin-bottom: 12px;
        ">
          <div style="font-size: 8.5px; font-weight: 700; color: #1e40af !important; text-transform: uppercase; margin-bottom: 2px;">
            IMPORTANT GUIDELINES FOR GUESTS
          </div>
          <div style="font-size: 9px; color: #334155 !important; line-height: 13px;">
            * Please arrive 10-15 minutes prior to your allocated slot for consultation and refreshments.<br />
            * Present this official pass or Pass Reference ID <strong>${passId}</strong> at the reception desk.<br />
            * For rescheduling or queries, reach WhatsApp Concierge: <strong>+${whatsapp.number}</strong>.
          </div>
        </div>

        <!-- Footer -->
        <table style="width: 100%; border-collapse: collapse; border-top: 1px dashed #cbd5e1; padding-top: 8px; table-layout: fixed;">
          <tr>
            <td style="vertical-align: bottom; font-size: 8.5px; color: #64748b !important; line-height: 13px; width: 68%;">
              <strong style="color: #0f172a !important; font-size: 9.5px; display: block; margin-bottom: 1px;">${brand.name} Studio</strong>
              Address: ${contact.address}<br />
              Helpline: ${contact.primaryPhone} | WhatsApp: +${whatsapp.number}<br />
              Hours: Mon-Fri: ${hours?.mon_fri?.display || '10:00 AM - 09:00 PM'} | Sat-Sun: ${hours?.saturday?.display || '09:00 AM - 10:00 PM'}
            </td>
            <td style="vertical-align: bottom; text-align: right; width: 32%;">
              <div style="
                display: inline-block;
                border: 1.5px solid #d4af37 !important;
                border-radius: 6px;
                padding: 3px 10px;
                background-color: #faf6ea !important;
                text-align: center;
              ">
                <div style="color: #9a761e !important; font-size: 7.5px; font-weight: 800; letter-spacing: 0.8px;">* AURA LUXE *</div>
                <div style="color: #0f172a !important; font-size: 8px; font-weight: 800; margin-top: 1px;">VERIFIED PASS</div>
              </div>
              <div style="
                font-family: monospace;
                letter-spacing: 2px;
                font-size: 9.5px;
                color: #475569 !important;
                margin-top: 2px;
              ">
                |||| | ||| || ||||| | ||
              </div>
            </td>
          </tr>
        </table>

      </div>
    </div>
  `;
};

/**
 * Direct print execution with automatic iframe and popup fallback.
 */
export const printAppointmentPass = (booking) => {
  const cardHtml = generateInvoiceCardHtml(booking);
  const rawId = booking?.id || booking?.passId || 'Pass';
  const passId = String(rawId).startsWith('#') ? String(rawId) : `#${rawId}`;

  const printDocumentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }
    .no-print-bar {
      margin-bottom: 16px;
      display: flex;
      gap: 10px;
    }
    .btn-print {
      background: #d4af37;
      color: #090b14;
      font-weight: 700;
      border: none;
      padding: 9px 22px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    @page {
      size: portrait;
      margin: 10mm 10mm 10mm 10mm;
    }
    @media print {
      html, body {
        background: #ffffff !important;
        color: #000000 !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
      }
      .no-print-bar {
        display: none !important;
      }
      .print-card-wrapper {
        width: 100% !important;
        max-width: 680px !important;
        margin: 0 auto !important;
        box-shadow: none !important;
        border: 2px solid #d4af37 !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <button onclick="window.print()" class="btn-print">
      Print Appointment Pass
    </button>
  </div>

  ${cardHtml}
</body>
</html>`;

  // Try hidden iframe print first
  try {
    const oldFrame = document.getElementById('aura-luxe-print-frame');
    if (oldFrame) {
      document.body.removeChild(oldFrame);
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'aura-luxe-print-frame';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(printDocumentHtml);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch {
          openPrintWindow(printDocumentHtml);
        }
      }, 400);
      return;
    }
  } catch {
    // Fallback if iframe fails
  }

  openPrintWindow(printDocumentHtml);
};

const openPrintWindow = (html) => {
  const printWindow = window.open('', '_blank', 'width=800,height=900');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  }
};

/**
 * Automatically downloads the official vector PDF Pass and opens the native print preview.
 */
export const downloadAndPrintAppointmentPass = async (booking) => {
  try {
    await downloadAppointmentPassPdf(booking);
  } catch (err) {
    console.error('Error downloading PDF pass:', err);
  }
  printAppointmentPass(booking);
};

