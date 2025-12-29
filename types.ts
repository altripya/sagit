
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'Apartment' | 'House' | 'Penthouse' | 'Villa' | 'Plot';
  image: string;
  description: string;
  featured?: boolean;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface PropertyFilters {
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRooms: number;
  propertyType: string;
}
