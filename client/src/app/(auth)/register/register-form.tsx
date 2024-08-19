"use client";
import authApiRequest from "@/apiRequest/auth";
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
import { useToast } from "@/components/ui/use-toast";
import { clientSessionToken } from "@/lib/http";
import { handleErrorApi } from "@/lib/utils";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: RegisterBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.register(values);
      toast({
        description: result.payload.message,
      });
      await authApiRequest.auth({ sessionToken: result.payload.data.token });
      router.push("/me");
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }

  // const createAccount = async (data: RegisterBodyType) => {
  //   await axiosInstance.post("/auth/register", data);
  // };

  // const createAccountMutation = useMutation({
  //   mutationFn: createAccount,
  //   onSuccess: () => {
  //     console.log("Thành công");
  //   },
  //   onError: () => {
  //     console.log("Thất bại");
  //   },
  // });

  // const onSubmit = async (values: RegisterBodyType) => {
  //   createAccountMutation.mutate(values);
  // };

  return (
    <div className="w-full flex flex-col max-md:p-4">
      <span className="text-center font-bold text-2xl text-[#272E3F]">
        Register
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-1/3 flex flex-col mx-auto justify-center max-md:w-full "
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-32 mx-auto !mt-8">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default RegisterForm;
