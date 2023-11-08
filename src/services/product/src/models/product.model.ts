export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type AvailableProduct = {
  id: string | undefined;
  title: string;
  description: string;
  price: number;
  count: number;
};

export enum ProductType {
  AVAILABLE = "available",
  EACH = "each",
}

export enum PriceType {
  LUXURY = 'Luxury',
  STANDARD = 'Standard',
}
