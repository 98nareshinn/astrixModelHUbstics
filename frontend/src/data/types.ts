export type PropertyStatus = "PENDING" | "PUBLISHED" | "REJECTED";
export type ListingType = "sale" | "rent" | "lease";
export type PropertyType = "apartment" | "house" | "villa" | "plot" | "land" | "shop" | "office" | "warehouse";

export interface Property {
  id: string;
  title: string;
  titleHi: string;
  type: PropertyType;
  listingType: ListingType;
  price: number; // in rupees
  priceLabel: string;
  khasra: string;
  propertyNo: string;
  area: string; // colony/area name
  address: string;
  sizeSqft: number;
  facing: string;
  roadWidthFt: number;
  landType: string;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  descriptionHi: string;
  amenities: string[];
  images: string[];
  status: PropertyStatus;
  verified: boolean;
  postedBy: string;
  postedByRole: "admin" | "public";
  postedAt: string;
  lat: number;
  lng: number;
  likes: number;
  comments: { id: string; author: string; text: string; at: string }[];
}

export interface MapProduct {
  id: string;
  title: string;
  titleHi: string;
  area: string;
  category: string;
  format: "PDF" | "JPG" | "PNG";
  pages: number;
  printSize: string;
  price: number;
  description: string;
  thumbnail: string;
}

export interface Service {
  id: string;
  name: string;
  nameHi: string;
  category: string;
  description: string;
  descriptionHi: string;
  icon: string;
  priceFrom: number;
  rating: number;
  bookings: number;
}

export interface NewsItem {
  id: string;
  title: string;
  titleHi: string;
  summary: string;
  summaryHi: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
}

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  khasra: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  at: string;
}
