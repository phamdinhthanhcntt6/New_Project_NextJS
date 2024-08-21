import productApiRequest from "@/apiRequest/product";
import ProductForm from "@/app/products/_components/product-form";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  let product = undefined;
  try {
    const { payload } = await productApiRequest.getProductDetail(
      Number(params.id)
    );
    product = payload.data;
  } catch (error) {}

  return (
    <div>
      {!product && <div>No data</div>}
      <ProductForm product={product} />
    </div>
  );
};
export default ProductDetailPage;
