import productApiRequest from "@/apiRequest/product";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  let product = null;
  try {
    const { payload } = await productApiRequest.getProductDetail(
      Number(params.id)
    );
    product = payload.data;
    console.log(product);
  } catch (error) {}

  return (
    <div>
      {!product && <div>No data</div>}
      {product && <div>{product.name}</div>}
    </div>
  );
};
export default ProductDetailPage;
