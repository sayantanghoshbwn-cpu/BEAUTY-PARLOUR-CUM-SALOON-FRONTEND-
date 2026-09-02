/**
 * ==============================================================================
 * 🌟 AURA LUXE - DEVELOPER & ENVIRONMENT CONFIGURATION (REACT VERSION)
 * ==============================================================================
 * Edit any business details, services, prices, team members, coupons, or
 * WhatsApp settings right here! You can also use .env variables.
 */

export const siteConfig = {
  // --- 1. BRAND & BUSINESS IDENTITY ---
  brand: {
    name: import.meta.env.VITE_SALON_NAME || "AURA LUXE",
    tagline: import.meta.env.VITE_SALON_TAGLINE || "Beauty Parlour & Unisex Luxury Salon",
    subheading: "Where Elegance Meets Artistry & Rejuvenation",
    experienceYears: "10+",
    happyClients: "15,000+",
    googleRating: "4.9 ★ (1,850+ Reviews)",
    currency: import.meta.env.VITE_SALON_CURRENCY || "₹",
    logoBadge: "PREMIUM SALON & SPA",
  },

  // --- 2. CONTACT & LOCATION DETAILS ---
  contact: {
    primaryPhone: import.meta.env.VITE_SALON_PHONE || "+91 81019 77247",
    phoneHref: `tel:${(import.meta.env.VITE_SALON_PHONE || "+918101977247").replace(/\s+/g, '')}`,
    email: import.meta.env.VITE_SALON_EMAIL || "appointments@auraluxesalon.com",
    address: import.meta.env.VITE_SALON_ADDRESS || "Plot 42, Park Street Boulevard, 2nd Floor, Opposite City Centre Mall, Kolkata, West Bengal - 700016",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5878235730316!2d88.35122731535745!3d22.55621413921319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277119e7a835b%3A0x7d877e80f4f9fca4!2sPark%20St%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1625564892741!5m2!1sen!2sin",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },

  // --- 3. WHATSAPP INTEGRATION SETTINGS ---
  whatsapp: {
    number: import.meta.env.VITE_SALON_WHATSAPP || "918101977247",
    floatingButtonText: "Chat on WhatsApp",
    chatPromptGreeting: "👋 Hello! Welcome to Aura Luxe Salon & Parlour. How can we make your day fabulous today?",
    quickQueries: [
      "✨ Check Today's Availability",
      "👰 Bridal Package & Quote",
      "💇 Hair Keratin / Spa Inquiry",
      "💰 View Price List & Offers",
    ],
    messageHeader: "🌟 *NEW APPOINTMENT BOOKING REQUEST - AURA LUXE*",
  },

  // --- 4. BUSINESS HOURS & LIVE OPEN/CLOSED INDICATOR ---
  businessHours: {
    mon_fri: { open: 10, close: 21, display: "10:00 AM - 09:00 PM" },
    saturday: { open: 9, close: 22, display: "09:00 AM - 10:00 PM" },
    sunday: { open: 9, close: 22, display: "09:00 AM - 10:00 PM" },
  },

  // --- 5. TOP ANNOUNCEMENT BANNER ---
  announcement: {
    enabled: true,
    badge: "FESTIVE GLOW OFFER",
    text: "Flat 20% OFF on all Bridal Makeovers & Keratin Treatments! Use Code:",
    couponCode: "GLAM20",
    buttonText: "Claim Offer",
  },

  // --- 6. PROMO COUPONS SYSTEM ---
  coupons: [
    {
      code: "GLAM20",
      discountType: "percent",
      discountValue: 20,
      description: "20% discount on entire bill",
      minBill: 500,
    },
    {
      code: "FIRSTVISIT",
      discountType: "flat",
      discountValue: 300,
      description: "Flat ₹300 OFF for first-time guests",
      minBill: 999,
    },
    {
      code: "BRIDAL30",
      discountType: "percent",
      discountValue: 30,
      description: "30% OFF on Bridal Packages",
      minBill: 3000,
    },
    {
      code: "WEEKEND15",
      discountType: "percent",
      discountValue: 15,
      description: "15% off Weekend Glow",
      minBill: 800,
    },
  ],

  // --- 7. SERVICE CATEGORIES ---
  categories: [
    { id: "all", name: "All Services", icon: "Sparkles" },
    { id: "hair", name: "Hair Care & Styling", icon: "Scissors" },
    { id: "skin", name: "Skin & Hydra Facials", icon: "Heart" },
    { id: "bridal", name: "Bridal & Makeovers", icon: "Crown" },
    { id: "spa", name: "Luxury Spa & Massage", icon: "Flower2" },
    { id: "nails", name: "Nails & Lash Art", icon: "Gem" },
    { id: "men", name: "Men's Grooming", icon: "UserCheck" },
  ],

  // --- 8. SERVICE CATALOG ---
  services: [
    // Hair
    {
      id: "h1",
      name: "Brazilian Keratin Hair Treatment",
      category: "hair",
      price: 2999,
      originalPrice: 4500,
      duration: "90 min",
      badge: "Best Seller",
      image: "assets/images/hair_styling.jpg",
      description: "Infuses pure keratin deep into hair cuticles for silky, mirror-shine, frizz-free hair lasting up to 6 months.",
      rating: 4.9,
    },
    {
      id: "h2",
      name: "Balayage & Global Hair Color",
      category: "hair",
      price: 2499,
      originalPrice: 3500,
      duration: "120 min",
      badge: "Trending",
      image: "assets/images/hair_styling.jpg",
      description: "Artisanal hand-painted sun-kissed highlights customized to flatter your skin tone and features perfectly.",
      rating: 4.8,
    },
    {
      id: "h3",
      name: "Luxury Moroccan Oil Hair Spa",
      category: "hair",
      price: 1199,
      originalPrice: 1600,
      duration: "45 min",
      badge: "Popular",
      image: "assets/images/after_hair.jpg",
      description: "Deep conditioning with organic Argan elixir, relaxing scalp pressure point massage, and steam infusion.",
      rating: 4.9,
    },
    {
      id: "h4",
      name: "Signature Designer Haircut & Blowdry",
      category: "hair",
      price: 699,
      originalPrice: 999,
      duration: "40 min",
      badge: "Essential",
      image: "assets/images/hair_styling.jpg",
      description: "Face-framing layered cut, texturizing, hair wash with luxury shampoo, and voluminous blowout finish.",
      rating: 4.7,
    },

    // Skin & Facials
    {
      id: "s1",
      name: "Hydra Oxygen Glow Facial",
      category: "skin",
      price: 1899,
      originalPrice: 2800,
      duration: "60 min",
      badge: "Top Rated",
      image: "assets/images/hydra_facial.jpg",
      description: "9-step vortex extraction, deep hydration with hyaluronic serum, LED light therapy & cooling cryo-massage.",
      rating: 5.0,
    },
    {
      id: "s2",
      name: "24K Royal Gold Radiance Facial",
      category: "skin",
      price: 2499,
      originalPrice: 3800,
      duration: "75 min",
      badge: "Luxury",
      image: "assets/images/hydra_facial.jpg",
      description: "Enriched with 24-carat pure gold leaf foils for cell regeneration, intense glow, and fine line softening.",
      rating: 4.9,
    },
    {
      id: "s3",
      name: "Anti-Acne Deep Pore Detox Cleanse",
      category: "skin",
      price: 1299,
      originalPrice: 1800,
      duration: "50 min",
      badge: "Clinical",
      image: "assets/images/hydra_facial.jpg",
      description: "Salicylic clarifying mask, high-frequency ozone therapy, and soothing botanical green tea infusion.",
      rating: 4.8,
    },

    // Bridal & Makeup
    {
      id: "b1",
      name: "Royal HD Bridal Makeover & Styling",
      category: "bridal",
      price: 6999,
      originalPrice: 10000,
      duration: "180 min",
      badge: "Signature",
      image: "assets/images/bridal_makeover.jpg",
      description: "High-definition waterproof bridal makeup, luxury lashes, jewelry & dupatta draping, floral hair design.",
      rating: 5.0,
    },
    {
      id: "b2",
      name: "Airbrush Celebrity Glam Makeup",
      category: "bridal",
      price: 4999,
      originalPrice: 7500,
      duration: "120 min",
      badge: "Trending",
      image: "assets/images/bridal_makeover.jpg",
      description: "Ultra-fine silicon-based airbrush finish providing 24-hour sweatproof, matte, flawless glass skin look.",
      rating: 4.9,
    },
    {
      id: "b3",
      name: "Party & Reception Glam Makeover",
      category: "bridal",
      price: 2199,
      originalPrice: 3200,
      duration: "75 min",
      badge: "Popular",
      image: "assets/images/bridal_makeover.jpg",
      description: "Shimmer eye styling, sculpted contouring, soft waves or elegant bun, and long-stay lipstick application.",
      rating: 4.8,
    },

    // Spa & Wellness
    {
      id: "sp1",
      name: "Ayurvedic Hot Stone Aromatherapy Spa",
      category: "spa",
      price: 2199,
      originalPrice: 3200,
      duration: "60 min",
      badge: "Deep Relax",
      image: "assets/images/spa_massage.jpg",
      description: "Warm volcanic basalt stones, lavender essential oils, and rhythmic muscle tension release techniques.",
      rating: 4.9,
    },
    {
      id: "sp2",
      name: "Full Body Polish & Rose De-Tan Wrap",
      category: "spa",
      price: 1999,
      originalPrice: 2800,
      duration: "60 min",
      badge: "Glow",
      image: "assets/images/spa_massage.jpg",
      description: "Exfoliating Himalayan salt scrub, organic rose body mud wrap, and rich shea butter moisturizing bath.",
      rating: 4.8,
    },

    // Nails
    {
      id: "n1",
      name: "Luxury Gel Nail Extensions with Gold Art",
      category: "nails",
      price: 1499,
      originalPrice: 2200,
      duration: "60 min",
      badge: "Artistic",
      image: "assets/images/nail_art.jpg",
      description: "Custom acrylic or soft gel extensions, cuticles care, high-gloss UV gel polish with intricate foil nail art.",
      rating: 4.9,
    },
    {
      id: "n2",
      name: "Rose Petal Spa Pedicure & Manicure",
      category: "nails",
      price: 999,
      originalPrice: 1500,
      duration: "50 min",
      badge: "Refreshing",
      image: "assets/images/nail_art.jpg",
      description: "Dead sea salt soak, botanical exfoliation, callus buffing, paraffin wax dip, and relaxing foot massage.",
      rating: 4.8,
    },

    // Men's Grooming
    {
      id: "m1",
      name: "Executive Haircut + Beard Sculpt & Steam",
      category: "men",
      price: 599,
      originalPrice: 850,
      duration: "40 min",
      badge: "Men's Pick",
      image: "assets/images/mens_grooming.jpg",
      description: "Precision clipper/scissor fade, razor sharp beard contouring, hot towel steam, and cooling aftershave balm.",
      rating: 4.9,
    },
    {
      id: "m2",
      name: "Men's Charcoal Detox Facial & Head Spa",
      category: "men",
      price: 1299,
      originalPrice: 1800,
      duration: "50 min",
      badge: "Must Try",
      image: "assets/images/mens_grooming.jpg",
      description: "Activated charcoal blackhead removal, cooling mint head massage, anti-tan facial mask, and stress relief.",
      rating: 4.8,
    },
  ],

  // --- 9. COMBO & VIP PACKAGES ---
  packages: [
    {
      id: "pkg1",
      title: "Royal Bridal Radiance Package",
      subtitle: "Complete Head-to-Toe Wedding Transformation",
      price: 11999,
      originalPrice: 17500,
      savings: "Save ₹5,501",
      badge: "Most Popular",
      features: [
        "HD / Airbrush Bridal Makeup & Trial",
        "24K Gold Hydra Glow Facial (2 Sessions)",
        "Brazilian Keratin or Global Hair Highlights",
        "Luxury Rose Petal Spa Mani-Pedi",
        "Full Body De-Tan & Glow Wrap",
        "Free Jewellery & Dupatta Draping Assistant",
      ],
      popular: true,
    },
    {
      id: "pkg2",
      title: "Festive Glam & Rejuvenation",
      subtitle: "Perfect for Parties, Festivals & Celebrations",
      price: 3499,
      originalPrice: 5200,
      savings: "Save ₹1,701",
      badge: "Best Value",
      features: [
        "Hydra Oxygen Glow Facial",
        "Moroccan Oil Hair Spa & Texturizing Cut",
        "Party Shimmer Makeup or Eye Styling",
        "Luxury Spa Manicure or Gel Polish",
        "Upper Lip & Eyebrow Threading Free",
      ],
      popular: false,
    },
    {
      id: "pkg3",
      title: "Men's Executive Grooming Suite",
      subtitle: "Sharp Look for Corporate & Special Events",
      price: 1799,
      originalPrice: 2700,
      savings: "Save ₹901",
      badge: "Unisex / Men",
      features: [
        "Precision Hair Cut & Style",
        "Hot Towel Beard Shaping & Trim",
        "Charcoal Anti-Tan Deep Cleanse Facial",
        "Refreshing Scalp Massage with Essential Oils",
        "Express Hand & Nail Grooming",
      ],
      popular: false,
    },
  ],

  // --- 10. EXPERT STYLISTS & ARTISTS ---
  stylists: [
    {
      id: "st1",
      name: "Meera Sengupta",
      role: "Master Beauty Aesthetician & Skin Specialist",
      experience: "12+ Years Exp.",
      specialty: "Hydra Facials & Skin Rejuvenation",
      rating: 4.95,
      image: "assets/images/stylist_1.jpg",
      bio: "Certified international aesthetician specialized in advanced clinical facials and glow treatments.",
    },
    {
      id: "st2",
      name: "Rajesh Sharma",
      role: "Creative Director & Hair Artist",
      experience: "10+ Years Exp.",
      specialty: "Keratin, Balayage & Precision Cuts",
      rating: 4.9,
      image: "assets/images/stylist_2.jpg",
      bio: "Master hair stylist trained in London & Mumbai with passion for contemporary cuts and custom color blends.",
    },
    {
      id: "st3",
      name: "Ananya Roy",
      role: "Celebrity Bridal Makeup Artist",
      experience: "8+ Years Exp.",
      specialty: "HD & Airbrush Bridal Makeovers",
      rating: 5.0,
      image: "assets/images/stylist_3.jpg",
      bio: "Over 500+ glowing brides styled. Known for creating natural, flawless, long-lasting wedding looks.",
    },
  ],

  // --- 11. BEFORE & AFTER TRANSFORMATION SHOWCASE ---
  transformations: [
    {
      title: "Brazilian Keratin Hair Smoothening",
      description: "From unruly frizzy damaged hair to ultra glossy, mirror-finish straight hair.",
      beforeImg: "assets/images/before_hair.jpg",
      afterImg: "assets/images/after_hair.jpg",
      duration: "90 min procedure",
    },
  ],

  // --- 12. CLIENT TESTIMONIALS & GOOGLE REVIEWS ---
  testimonials: [
    {
      name: "Priyanka Chatterjee",
      location: "Ballygunge, Kolkata",
      service: "Royal Bridal Makeover",
      rating: 5,
      comment: "Aura Luxe made my wedding day unforgettable! Ananya did my makeup so flawlessly—it stayed fresh and glowing through 12 hours of rituals. Everyone praised my look!",
      date: "2 days ago",
    },
    {
      name: "Amitav Mukherjee",
      location: "Salt Lake, Kolkata",
      service: "Executive Grooming & Hair Spa",
      rating: 5,
      comment: "Hands down the best unisex salon in the city. Rajesh understood my hair type instantly and gave me a sharp fade. The hot towel massage is heavenly!",
      date: "1 week ago",
    },
    {
      name: "Shreya Das",
      location: "New Town, Kolkata",
      service: "Hydra Oxygen Facial & Keratin",
      rating: 5,
      comment: "The ambiance is 10/10 pure luxury. The Hydra facial literally gave my face an instant glass skin glow. Booking through WhatsApp was super quick!",
      date: "2 weeks ago",
    },
  ],

  // --- 13. FREQUENTLY ASKED QUESTIONS (FAQ) ---
  faqs: [
    {
      q: "How can I book an appointment?",
      a: "You can book directly using our online booking wizard by selecting your desired service, date, and stylist, which confirms instantly and sends details to WhatsApp! You can also click the floating WhatsApp button for instant assistance.",
    },
    {
      q: "Do you offer bridal makeup trials before the wedding?",
      a: "Yes! We provide complete bridal makeup and hairstyling consultations along with trial options so you can choose your dream wedding look with complete peace of mind.",
    },
    {
      q: "Is prior booking required or are walk-ins welcome?",
      a: "While walk-ins are always warmly welcomed based on chair availability, we strongly recommend pre-booking via our website or WhatsApp to avoid waiting during peak hours.",
    },
    {
      q: "Are the products used skin-safe and premium?",
      a: "Absolutely. We exclusively use world-renowned dermatologist-tested brands such as Kérastase, Olaplex, L'Oréal Professionnel, MAC, Huda Beauty, and organic certified essential oils.",
    },
    {
      q: "What safety and hygiene measures do you follow?",
      a: "Our salon maintains the highest international sanitization protocols: sterilized instruments before every use, disposable towels and capes, and purified air conditioning.",
    },
  ],

  // --- 14. TIME SLOTS AVAILABLE FOR BOOKING ---
  bookingSlots: [
    { period: "Morning", slots: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"] },
    { period: "Afternoon", slots: ["12:00 PM", "01:00 PM", "02:00 PM", "03:30 PM", "04:30 PM"] },
    { period: "Evening", slots: ["05:30 PM", "06:30 PM", "07:30 PM", "08:15 PM"] },
  ],
};
