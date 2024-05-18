import { IconInput } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
function SearchForm() {
  const [URLSearchParams, setSearchParams] = useSearchParams();

  const searchValues = {};
  for (const [key, value] of URLSearchParams.entries()) {
    searchValues[key] = value;
  }
  const handleChange = (e) => {
    setSearchParams({ search: e.target.value });
  };
  return (
    <div>
      <form className="flex gap-4   " action="/search">
        <IconInput
          icon={() => <IoIosSearch size={20} />}
          type="search"
          name="search"
          placeholder="search product "
          className=" lg:w-96   py-4"
          value={searchValues.search}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-primary-light text-md    font-normal px-6"
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchForm;
