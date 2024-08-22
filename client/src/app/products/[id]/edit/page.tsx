import productApiRequest from "@/apiRequest/product";
import ProductForm from "@/app/products/_components/product-form";
import type { Metadata } from "next";
import { cache } from "react";

const getDetail = cache(productApiRequest.getProductDetail);

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { payload } = await getDetail(Number(params.id));
  const product = payload.data;

  return {
    title: "Edit " + product.name,
    description: product.description,
  };
}
const EditProductPage = async ({ params }: Props) => {
  let product = undefined;
  try {
    const { payload } = await getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {}

  return (
    <div>
      {!product && <div>No data</div>}
      <ProductForm product={product} />
    </div>
  );
};
export default EditProductPage;
