import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { LoginValidationSchema } from "@/lib/validations";
import { useSignIn } from "@/lib/api/useAuth";
import { GoogleLogin } from "@react-oauth/google";

const SigninForm = () => {
  const { mutateAsync: SignInUser, isPending } = useSignIn();

  const form = useForm({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const user = await SignInUser({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <>
      <h1 className="font-bold text-2xl m-4">Sign In</h1>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse.credential);
        }}
        onError={() => {
          toast.error("Something Went Wrong, Please Try Again!");
        }}
      />

      <Separator className="w-64 my-2" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col align-middle space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Email" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-primary-dark focus:bg-primary-semi-dark focus:text-white hover:bg-primary-light-hover hover:text-primary-dark"
            type="submit"
          >
            {isPending ? (
              <p>
                Loading &nbsp;&nbsp;
                <span>
                  <img
                    className="animate-spin h-5 w-5 mr-3 inline"
                    src="assets/cursor.svg"
                  />
                </span>
              </p>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <div className="p-2 font-light text-sm text-slate-600 space-x-2">
        <Link to="/sign-up">Don't have an account?</Link>
      </div>
    </>
  );
};

export default SigninForm;
