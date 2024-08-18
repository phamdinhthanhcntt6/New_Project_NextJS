"use client";
import { useAppContext } from "@/app/AppProvider";
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
import envConfig from "@/config";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { toast } = useToast();
  const { setSessionToken } = useAppContext();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      toast({
        description: result.payload.message,
      });

      setSessionToken(result.payload.data.token);
    } catch (error: any) {
      const errors = error.payload.errors as {
        feild: string;
        message: string;
      }[];
      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.feild as "email" | "password", {
            type: "server",
            message: error.message,
          });
        });
        toast({
          variant: "destructive",
          description: error.payload.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: error.payload.message,
        });
      }
    }
  }

  return (
    <div className="w-full flex flex-col max-md:p-4">
      <span className="text-center font-bold text-2xl text-[#272E3F]">
        Login
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-1/3 flex flex-col mx-auto justify-center max-md:w-full "
        >
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
          <Button type="submit" className="w-32 mx-auto !mt-8">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default LoginForm;
