"use client";
import { useState } from "react";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { feature } from "@/components/SanityFetch";

export default function Featured() {
  const [filteredData, setFilteredData] = useState(feature);

  return (
    <main className="my-20 max-w-[1300px] mx-auto flex gap-x-4 lg:gap-x-20">
      <section className="flex flex-col max-w-[200px]">
        <SearchAndFilter data={feature} setFilteredData={setFilteredData} />
      </section>
      <section className="max-w-[1000px] mx-auto overflow-clip">
        <div className="mb-20">
          <FeaturedCarousel data={filteredData} />
        </div>
      </section>
    </main>
  );
}
