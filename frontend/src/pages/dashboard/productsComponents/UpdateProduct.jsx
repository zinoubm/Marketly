import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SelectCategorie from "./SelectCategorie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AddProductValidationSchema } from "@/lib/validations";
import useApi from "@/lib/api/useApi";
import { useRefetchDataStore } from "@/context/productStore";

function UpdateProduct({
  children,
  id,
  title,
  inventory,
  price,
  category,
  product_image,
  description
}) {
  const { toggleRefetchData } = useRefetchDataStore();
  
  const form = useForm({
    resolver: zodResolver(AddProductValidationSchema),
    defaultValues: {
      title,
      description,
      category:"",
      price,
      inventory,
      product_image:""
    },
  });
  const [image, setImage] = useState(null);
  const { updateProduct } = useApi();
  const onSubmit = async (values) => {
    values.product_image = image;
    const res = await updateProduct(values, id);
    toggleRefetchData();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{children}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-scroll h-screen">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add your product details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-2 " onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid  items-center ">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid  items-center ">
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="grid  items-center ">
                  <SelectCategorie props={field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="grid  items-center ">
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
              name="inventory"
              render={({ field }) => (
                <FormItem className="grid  items-center ">
                  <FormLabel>Inventory</FormLabel>
                  <FormControl>
                    <Input placeholder="Inventory" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product_image"
              render={({ field }) => (
                <FormItem className="grid  items-center ">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Image"
                      {...field}
                      accept="image/*"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <DialogClose asChild> */}
            <DialogFooter>
              <Button type="submit">Save </Button>
            </DialogFooter>
            {/* </DialogClose> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProduct;
