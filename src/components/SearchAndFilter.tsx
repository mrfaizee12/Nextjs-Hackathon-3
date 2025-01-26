import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { IoIosArrowUp } from "react-icons/io";
import { Products } from "@/app/product/[id]/page";

interface SearchAndFilterProps {
  data: Products[]; // Array of products
  setFilteredData: React.Dispatch<React.SetStateAction<Products[]>>; // Specify Products[] instead of any[]
}

export function SearchAndFilter({ data, setFilteredData }: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = React.useState<string[]>([]);

  // Handle search input changes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle category selection
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  // Handle price range selection
  const handlePriceFilter = (price: string) => {
    setSelectedPrice((prev) =>
      prev.includes(price) ? prev.filter((pr) => pr !== price) : [...prev, price]
    );
  };

  // Filter logic applied whenever search, category, or price changes
  React.useEffect(() => {
    let filtered = data;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory.length > 0) {
      filtered = filtered.filter((item) => selectedCategory.includes(item.category));
    }

    // Price filter
    if (selectedPrice.length > 0) {
      filtered = filtered.filter((item) => {
        return selectedPrice.some((priceRange) => {
          if (priceRange === "Under $2,500" && item.price < 2500) return true;
          if (priceRange === "$2,501 - $7,500" && item.price >= 2501 && item.price <= 7500) return true;
          if (priceRange === "Above $7,500" && item.price > 7500) return true;
          return false;
        });
      });
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedCategory, selectedPrice, data, setFilteredData]);

  return (
    <div className="flex flex-col gap-y-4">
      {/* Search Input */}
      <Input
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearch}
        className="border rounded-lg px-3 py-2"
      />

      {/* Category Filter */}
      <div>
        <h1 className="font-semibold flex justify-between items-center text-sm mt-1">
          Category
          <IoIosArrowUp />
        </h1>
        <div className="mt-2 text-[9px] lg:text-sm">
          <h1 className="flex gap-2 items-center">
            <Checkbox
              onCheckedChange={() => handleCategoryFilter("Men's Shoes")}
              checked={selectedCategory.includes("Men's Shoes")}
            />
           {` Men's Shoes`}
          </h1>
          <h1 className="flex gap-2 items-center">
            <Checkbox
              onCheckedChange={() => handleCategoryFilter("Women's Shoes")}
              checked={selectedCategory.includes("Women's Shoes")}
            />
            {`Women's Shoes`}
          </h1>
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h1 className="font-semibold flex justify-between items-center text-sm mt-1">
          Price Range
          <IoIosArrowUp />
        </h1>
        <div className="mt-2 text-[9px] lg:text-sm">
          <h1 className="flex gap-2 items-center">
            <Checkbox
              onCheckedChange={() => handlePriceFilter("Under $2,500")}
              checked={selectedPrice.includes("Under $2,500")}
            />
            Under $2,500
          </h1>
          <h1 className="flex gap-2 items-center">
            <Checkbox
              onCheckedChange={() => handlePriceFilter("$2,501 - $7,500")}
              checked={selectedPrice.includes("$2,501 - $7,500")}
            />
            $2,501 - $7,500
          </h1>
          <h1 className="flex gap-2 items-center">
            <Checkbox
              onCheckedChange={() => handlePriceFilter("Above $7,500")}
              checked={selectedPrice.includes("Above $7,500")}
            />
            Above $7,500
          </h1>
        </div>
      </div>
    </div>
  );
}
