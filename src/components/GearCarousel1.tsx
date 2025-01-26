import * as React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Link from "next/link"


import { gear } from "./SanityFetch"
import { urlFor } from "@/sanity/lib/image"

export function GearCarousel1() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {gear.map((item) => (
          
          <CarouselItem key={item._id} className="lg:basis-1/2">
            <Link href={`/product/${item._id}`}>
            <div className="p-1">
              <Card>
                <CardContent className=" bg-[#F5F5F5] aspect-square group ">
                 <Image src={urlFor(item.image).width(440).url()} alt={item.name} width={440} height={440}/>
                </CardContent>
                
              </Card>
            </div>
                <div className=" flex justify-between mx-2 mt-2">
                  <h1 className="font-semibold text-sm hover:text-[#9E3500]">{item.name}</h1>
                    <h2 className="font-semibold text-sm hover:text-[#9E3500]">${item.price}</h2>
                </div>
                <h3 className="ml-2 text-sm">{item.category}</h3>
                </Link>
          </CarouselItem>
        ))}
        
      </CarouselContent>
      <div className="absolute bottom-[390px] md:bottom-[430px] md:right-14 right-14 lg:bottom-[310px] xl:bottom-[380px]">
      <CarouselPrevious />
      <CarouselNext />
      </div>
   
    </Carousel>
  )
}
