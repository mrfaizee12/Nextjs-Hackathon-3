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
import { airMAx } from "./SanityFetch"
import { urlFor } from "@/sanity/lib/image"



export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {airMAx.map((item) => (
          
          <CarouselItem key={item._id} className="md:basis-1/2 lg:basis-1/3">
            <Link href={`/product/${item._id}`}>
            <div className="p-1">
              <Card>
                <CardContent className=" bg-[#F5F5F5] aspect-square group ">
                 <Image src={urlFor(item.image).width(440).url()} alt={"shoes"} width={440} height={440}/>
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
      <div className="absolute  bottom-[390px] right-14 md:bottom-[450px] md:right-14 lg:bottom-[400px] xl:bottom-[500px]">
      <CarouselPrevious />
      <CarouselNext />
      </div>
   
    </Carousel>
  )
}
