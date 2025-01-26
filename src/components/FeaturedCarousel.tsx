import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

// Define the type for a product item
interface Product {
  _id: string;
  image: string;
  name: string;
  status: string;
  category: string;
  price: number;
}

export function FeaturedCarousel({ data }: { data: Product[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="flex flex-wrap gap-y-10">
        {data.map((item) => (
          <CarouselItem
            key={item._id}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2"
          >
            <Link href={`/product/${item._id}`} className="group block">
              <div className="transition-transform transform group-hover:scale-105">
                <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="bg-[#F5F5F5] aspect-square group p-0 relative overflow-hidden">
                    <Image
                      src={urlFor(item.image).width(440).url()}
                      alt={item.name}
                      width={440}
                      height={440}
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="mx-2 mt-4">
                <h4 className="font-semibold text-[#9E3500] text-xs md:text-sm">
                  {item.status}
                </h4>
                <h1 className="font-semibold text-sm mt-2 line-clamp-2">
                  {item.name}
                </h1>
                <h3 className="text-sm text-[#757575]">{item.category}</h3>
                <h2 className="font-medium text-sm mt-2">MRP: ${item.price}</h2>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
