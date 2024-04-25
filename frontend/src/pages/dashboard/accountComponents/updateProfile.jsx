import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UpdateUserValidationSchema } from "@/lib/validations";
import useAuth from "@/lib/api/useAuth";
import { useAuthStore } from "@/context/authStore";
import { useUserInfo } from "@/context/userStore";
//todo
const isPending = false;

function UpdateProfile() {
  const { first_name, last_name } = useAuthStore();
  const {
    billingDetails,
    shippingDetails,
    phone,
    updatePhone,
    updateShippingDetails,
    updateBillingDetails,
  } = useUserInfo();
  const form = useForm({
    resolver: zodResolver(UpdateUserValidationSchema),
    defaultValues: {
      firstName: first_name,
      lastName: last_name,
      phone,
      shippingDetails,
      billingDetails,
    },
  });

  const { updateUserInfo } = useAuth();

  async function onSubmit(values, event) {
    // event.preventDefault()
    const user = await updateUserInfo({
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      shipping_details: values.shippingDetails,
      billing_details: values.billingDetails,
    });
    //! update the user state
    updateBillingDetails(user.billing_details)
    updatePhone(user.phone)
    updateShippingDetails(user.shipping_details)
  }

  return (
    <section className=" flex  w-96 flex-col ">
      <h1 className="text-2xl font-bold">Update Profile</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col  mt-8"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frist Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Details</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Shipping Details"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Details</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Billing Details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-primary-dark mt-4 focus:bg-primary-semi-dark focus:text-white hover:bg-primary-semi-dark"
            type="submit"
          >
            {isPending ? (
              <p>
                Loading &nbsp;&nbsp;
                <span>
                  <img
                    className="animate-spin h-5 w-5 mr-3 inline fill-primary-dark"
                    src="assets/cursor.svg"
                  />
                </span>
              </p>
            ) : (
              "Update Profile"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default UpdateProfile;
