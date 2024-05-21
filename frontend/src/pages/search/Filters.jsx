import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProductApi from "@/lib/api/useProductApi";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Filters() {
  const { getCategories } = useProductApi();
  const [categories, setCategories] = useState([]);
  const [searchObject, setSearchObject] = useState({});
  const [URLSearchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setCategories(data);

      const searchParamsObject = {};
      for (const [key, value] of URLSearchParams.entries()) {
        searchParamsObject[key] = value;
      }

      const categoryObject = data.find(
        (cat) => cat.id == searchParamsObject.category
      );
      setSearchObject(searchParamsObject);
      setSearchObject((prev) => ({ ...prev, category: categoryObject?.title }));
    })();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="m-4 cursor-pointer bg-primary-dark flex-col p-6 rounded-2xl sm:pl-8 text-white flex">
          <h1 className="text-2xl font-bold ">Filters</h1>
          <section className="flex md:gap-52  gap-8  mt-3 ">
            <div>
              <h2 className="text-md mb-2">Price</h2>
              <div className="flex gap-2 flex-wrap">
                <button className="text-sm px-3 p-1 rounded-md border border-gray-400">
                  min{" "}
                  {searchObject.min_price ? (
                    <span>: {searchObject.min_price} $</span>
                  ) : null}
                </button>
                <button className="text-sm px-3 p-1 rounded-md border border-gray-400">
                  max{" "}
                  {searchObject.max_price ? (
                    <span>: {searchObject.max_price} $</span>
                  ) : null}
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-md mb-2">Categorie</h2>
              <button className="text-sm px-3 p-1 rounded-md border border-gray-400">
                {searchObject.category || "category"}
              </button>
            </div>
            <div>
              <h2 className="text-md mb-2">Rating</h2>
              <div className="flex gap-2 flex-wrap">
                <button className=" text-sm px-3 p-1 rounded-md border border-gray-400">
                  max
                </button>
                <button className=" text-sm px-3 p-1 rounded-md border border-gray-400">
                  min
                </button>
              </div>
            </div>
          </section>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription>choose your preferences</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" action="/search">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              price
            </Label>
            <Input
              className="hidden"
              name="search"
              value={searchObject.search}
              onChange={(value) =>
                setSearchObject((prev) => ({ ...prev, value }))
              }
            />
            <Input
              id="min_price"
              defaultValue="0"
              placeholder="min"
              type="number"
              className="col-span-1"
              name="min_price"
            />
            <Input
              id="max_price"
              defaultValue="100"
              placeholder="max"
              type="number"
              className="col-span-1"
              name="max_price"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              category
            </Label>

            <Select name="category">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="categorie" />
              </SelectTrigger>

              <SelectContent>
                {categories.map(({ title, id }) => (
                  <SelectItem key={id} value={`${id}`}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Filters;
