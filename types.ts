
export type Language = 'en' | 'ta';

export interface PestInfo {
  id: string;
  name: { en: string; ta: string };
  scientificName: string;
  symptoms: { en: string[]; ta: string[] };
  causes: { en: string; ta: string };
  treatments: {
    chemical: { en: string; ta: string };
    biological: { en: string; ta: string };
    dosage: { en: string; ta: string };
  };
  prevention: { en: string[]; ta: string[] };
  imageUrl: string;
}

export interface PesticideShop {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface AnalysisResult {
  pestId?: string;
  confidence: number;
  rawAnalysis: {
    name: string;
    symptoms: string[];
    causes: string;
    treatments: string;
    prevention: string[];
  };
}
