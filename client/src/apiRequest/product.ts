import http from "@/lib/http";
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";

const productApiRequest = {
  getProductList: () => http.get<ProductListResType>("/products"),
  getProductDetail: (id: number) =>
    http.get<ProductResType>(`/products/${id}`, { cache: "no-store" }),
  createProduct: (body: CreateProductBodyType) =>
    http.post<ProductResType>("/products", body),
  uploadImage: (body: FormData) =>
    http.post<{
      message: string;
      data: string;
    }>("/media/upload", body),
  updateProduct: (id: number, body: UpdateProductBodyType) =>
    http.put<ProductResType>(`/products/${id}`, body),
};

export default productApiRequest;
