import { AvailableProduct, Product } from "../models";
import { mockStocks } from "./stock.mock";

export const mockProducts: Product[] = [
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    description: "Short Product Description1",
    price: 24,
    title: "Wakeboard Nitro",
  },
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    description: "Short Product Description7",
    price: 15,
    title: "Wakeboard Liquid Power",
  },
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    description: "Short Product Description2",
    price: 23,
    title: "Wakeboard Force",
  },
  {
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    description: "Short Product Description4",
    price: 15,
    title: "Wakeboard AquaLite",
  },
  {
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    description: "Short Product Descriptio1",
    price: 23,
    title: "Wakeboard Liquid Power CQ",
  },
  {
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    description: "Short Product Description7",
    price: 15,
    title: "Wakeboard AquaLite True",
  },
];

export const mockProduct: Product = {
  description: "Short Product Description2",
  id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
  price: 23,
  title: "Wakeboard Force",
};

export const mockAvailableProducts: AvailableProduct[] = mockProducts.map(
  (product, index) => ({
    ...product,
    count: index > 1 ? index : 0,
  })
);
