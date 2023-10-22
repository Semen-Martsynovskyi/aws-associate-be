import { AvailableProduct } from "@models";

export type CreateProductDTO = Omit<AvailableProduct, "id">;
