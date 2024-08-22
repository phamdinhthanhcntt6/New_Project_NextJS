import productApiRequest from "@/apiRequest/product";
import { baseOpenGraph } from "@/app/share-metadata";
import envConfig from "@/config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

const getDetail = cache(productApiRequest.getProductDetail);

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { payload } = await getDetail(Number(params.id));
  const product = payload.data;
  const url = envConfig.NEXT_PUBLIC_URL + "/products/" + product.id;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      ...baseOpenGraph,
      title: product.name,
      description: product.description,
      url: url,
      siteName: "Next.js",
      images: [
        {
          url: product.image, // Must be an absolute URL
        },
      ],
    },

    alternates: {
      canonical: url,
    },
  };
}

const ProductDetailPage = async ({ params }: Props) => {
  let product = undefined;
  try {
    const { payload } = await getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {}

  return (
    <div>
      Product detail
      {!product && <div>No data</div>}
      {product && (
        <div className="flex flex-col">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.image}
              alt={product.name}
              height={100}
              width={100}
            />
          </Link>
          <span className="font-medium">{product.name}</span>
          <span>{product.price}$</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
