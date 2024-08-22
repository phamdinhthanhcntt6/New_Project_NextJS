import productApiRequest from "@/apiRequest/product";
import DeleteProductButton from "@/app/products/_components/delete-product-button";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const ProductPage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const isAuthenticated = Boolean(sessionToken);
  const { payload } = await productApiRequest.getProductList();
  const productList = payload.data;

  return (
    <div className="flex flex-col">
      Product List
      {isAuthenticated && (
        <Link href={"/products/add"} className="m-2">
          <Button variant={"secondary"}>+ Add new product</Button>
        </Link>
      )}
      <div className="flex gap-4 flex-col">
        {productList.map((product) => (
          <div key={product.id} className="flex gap-5">
            <Image
              src={product.image}
              alt={product.name}
              height={100}
              width={100}
            />
            <span className="font-medium">{product.name}</span>
            <span>{product.price}$</span>
            <div className="flex gap-2">
              {isAuthenticated && (
                <>
                  <Link href={`/products/${product.id}`}>
                    <Button variant={"outline"}>Edit</Button>
                  </Link>
                  <DeleteProductButton product={product} />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductPage;
