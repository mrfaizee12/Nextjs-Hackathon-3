"use client"

import { useCart } from "@/context/context"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Page(){
    const {wishlist,removeFromWishlist} = useCart()

    return(
        <main className="max-w-[1200px] mx-auto  my-16">
            <h1 className="font-semibold text-4xl mb-10">WISHLIST</h1>
            {wishlist.length > 0 ? (
                <div className="grid md:grid-cols-3 mx-auto max-w-sm md:max-w-full">
                    {wishlist.map((item)=>{
                        return (
                            <div key={item._id} className="m-3">
                                <Image src={urlFor(item.image).width(300).url()} alt={"shoe"} width={300} height={300} />
                                <h1 className="font-semibold">{item.name}</h1>
                                <h2 className="font-semibold text-[#7a1212]">{item.status}</h2>
                                <div>
                                    <Button onClick={()=>removeFromWishlist(item._id)}>Remove From Wishlist</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ):(
                <div>
                    <h1 className="font-semibold my-10 ml-1">YOUR WHISHLIST IS EMPTY</h1>
                </div>
            )}
        </main>
    )
}