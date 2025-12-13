export type Category = '文化遗产' | '自然遗产' | '混合遗产';

export interface HeritageSite {
  id: string;
  name: string;
  category: Category;
  province: string;
  coordinates: [number, number]; // [Longitude, Latitude]
  yearInscribed: number;
  description: string;
  imageUrl: string;
}

export interface GeoFeature {
  type: string;
  properties: {
    name: string;
    id?: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
}

export interface GeoJSONData {
  type: string;
  features: GeoFeature[];
}