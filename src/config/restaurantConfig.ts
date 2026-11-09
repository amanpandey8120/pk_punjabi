export interface LocationInfo {
  id: string;
  name: string;
  area: string;
  city: string;
  address: string;
  phone: string;
  timings: string;
  isFlagship?: boolean;
  mapEmbedUrl?: string;
}

export interface RestaurantConfig {
  brandName: string;
  legalEntity: string;
  tagline: string;
  subTagline: string;
  establishedYear: number;
  fssaiNumber: string;
  contact: {
    primaryPhone: string;
    helplinePhone: string;
    supportEmail: string;
    cateringEmail: string;
    whatsappNumber: string;
  };
  locations: LocationInfo[];
  defaultLocationId: string;
  hours: {
    open: string;
    close: string;
    deliveryHours: string;
  };
  financials: {
    currencySymbol: string;
    currencyCode: string;
    gstRate: number; // 0.05 for 5%
    packagingCharge: number;
    deliveryFee: number;
    freeDeliveryThreshold: number;
    coupons: Array<{
      code: string;
      discountAmount: number;
      minOrder: number;
      description: string;
    }>;
  };
  brandColors: {
    primary: string;
    primaryContainer: string;
    secondary: string;
    tertiaryGold: string;
    surfaceCream: string;
    textPrimary: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    zomato: string;
  };
  awards: Array<{
    title: string;
    organization: string;
    year: string;
  }>;
}

export const restaurantConfig: RestaurantConfig = {
  brandName: "PK Punjabi",
  legalEntity: "PK Punjabi Hospitality Pvt. Ltd.",
  tagline: "Authentic Punjabi Zaika",
  subTagline: "Slow-Simmered Heritage Handi & Clay Tandoor Feasts",
  establishedYear: 1974,
  fssaiNumber: "10022064000189",
  contact: {
    primaryPhone: "+91 98765 43210",
    helplinePhone: "+91 172 460 9999",
    supportEmail: "royalcare@pkpunjabi.com",
    cateringEmail: "banquets@pkpunjabi.com",
    whatsappNumber: "+91 98765 43210",
  },
  locations: [
    {
      id: "chd-sec17",
      name: "PK Punjabi - Flagship Heritage Rasoi",
      area: "Sector 17",
      city: "Chandigarh",
      address: "SCO 88-90, Inner City Center, Sector 17-C, Chandigarh - 160017",
      phone: "+91 172 460 9999",
      timings: "11:00 AM - 11:30 PM (Daily)",
      isFlagship: true,
    },
    {
      id: "mohali-ph5",
      name: "PK Punjabi - Royal Courtyard",
      area: "Phase 5",
      city: "Mohali",
      address: "SCF 24, Main Market, Phase 5, SAS Nagar, Mohali - 160059",
      phone: "+91 172 505 8822",
      timings: "11:30 AM - 11:00 PM (Daily)",
    },
    {
      id: "ldh-modeltown",
      name: "PK Punjabi - Dastarkhwan",
      area: "Model Town",
      city: "Ludhiana",
      address: "Tuition Market Road, Model Town, Ludhiana - 141002",
      phone: "+91 161 400 1974",
      timings: "12:00 PM - 11:30 PM (Daily)",
    },
  ],
  defaultLocationId: "chd-sec17",
  hours: {
    open: "11:00 AM",
    close: "11:30 PM",
    deliveryHours: "11:00 AM - 11:15 PM",
  },
  financials: {
    currencySymbol: "₹",
    currencyCode: "INR",
    gstRate: 0.05,
    packagingCharge: 35.0,
    deliveryFee: 40.0,
    freeDeliveryThreshold: 499.0,
    coupons: [
      {
        code: "ROYALPK",
        discountAmount: 150.0,
        minOrder: 500.0,
        description: "You saved ₹150 (25% Royal Discount)",
      },
      {
        code: "DESIGHEE",
        discountAmount: 100.0,
        minOrder: 400.0,
        description: "Flat ₹100 off on heritage claypot specialties",
      },
      {
        code: "FIRSTROYAL",
        discountAmount: 200.0,
        minOrder: 600.0,
        description: "Flat ₹200 off for first-time royal patrons",
      },
    ],
  },
  brandColors: {
    primary: "#550314",
    primaryContainer: "#741C28", // Deep Maroon
    secondary: "#48121C", // Dark Maroon
    tertiaryGold: "#D9A441", // Sand Gold / Brass
    surfaceCream: "#FFF8ED", // Warm Cream
    textPrimary: "#1E1B15",
  },
  social: {
    instagram: "https://instagram.com/pkpunjabi_official",
    facebook: "https://facebook.com/pkpunjabiofficial",
    youtube: "https://youtube.com/@pkpunjabirasoi",
    zomato: "https://zomato.com/chandigarh/pk-punjabi",
  },
  awards: [
    {
      title: "Best North Indian Culinary Icon",
      organization: "Times Food & Nightlife Awards",
      year: "2024",
    },
    {
      title: "Iconic Heritage Butter Chicken & Dal Makhani",
      organization: "Punjab Gourmet Guild",
      year: "2023",
    },
    {
      title: "Master of Royal Hospitality Excellence",
      organization: "Culinary Heritage Federation of India",
      year: "2022",
    },
  ],
};

