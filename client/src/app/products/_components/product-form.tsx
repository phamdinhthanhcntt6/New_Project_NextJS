"use client";
import productApiRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
} from "@/schemaValidations/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type Product = ProductResType["data"];

const ProductForm = ({ product }: { product?: Product }) => {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
      description: product?.description ?? "",
      image: product?.image ?? "",
    },
  });

  const image = form.watch("image");

  const createProduct = async (values: CreateProductBodyType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const uploadImageResult = productApiRequest.uploadImage(formData);
      const imageUrl = (await uploadImageResult).payload.data;
      const result = await productApiRequest.createProduct({
        ...values,
        image: imageUrl,
      });

      toast({
        description: result.payload.message,
      });

      router.push("/products");
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (values: CreateProductBodyType) => {
    if (!product) return;
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file as Blob);
        const uploadImageResult = productApiRequest.uploadImage(formData);
        const imageUrl = (await uploadImageResult).payload.data;
        values = {
          ...values,
          image: imageUrl,
        };
      }

      const result = await productApiRequest.updateProduct(product?.id, values);

      toast({
        description: result.payload.message,
      });
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return;
    product ? await updateProduct(values) : await createProduct(values);
  }

  return (
    <div className="w-full flex flex-col max-md:p-4">
      <span className="text-center font-bold text-2xl text-[#272E3F]">
        {product ? "Edit Product" : "Add New Product"}
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-1/4 flex flex-col mx-auto justify-center max-md:w-full min-w-96"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Image"
                    accept="image/*"
                    ref={inputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFile(file);
                        field.onChange("http://localhost:3000/" + file.name);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {(file || image) && (
            <div>
              <Image
                width={128}
                height={128}
                src={file ? URL.createObjectURL(file) : image}
                alt=""
                className="w-32 h-32 object-cover rounded-sm"
              />
              <Button
                type="button"
                variant="destructive"
                className="mt-1"
                onClick={() => {
                  setFile(null);
                  form.setValue("image", "");
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
              >
                Delete
              </Button>
            </div>
          )}
          <Button type="submit" size={"sm"} className="px-10 mx-auto !mt-8">
            {product ? "Confirm Edit Product" : "Add New Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
