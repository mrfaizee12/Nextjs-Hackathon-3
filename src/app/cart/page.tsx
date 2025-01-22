"use client"
import { CarouselSize } from "@/components/HeroCarousel"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/context"
import { urlFor } from "@/sanity/lib/image"
import { IconButton,  Tooltip } from "@mui/material"
import {  Heart, Trash2 } from "lucide-react"
import Image from "next/image"
import IncDec from "./quantity"
import Link from "next/link"

export default function Cart() {
    const { cart,removeFromCart,updateCartQuantity } = useCart()
    return (
        <main className="max-w-[1200px] mx-auto  mt-14">
            {cart.length > 0 ? (
                <div className="lg:flex lg:gap-x-14  xl:gap-x-20">


                    <section className=" ">
                        <div className="bg-[#F5F5F5] p-4">
                            <h1 className="font-semibold">Free Delivery</h1>
                            <p className="text-sm">Applies to orders of ₹ 14 000.00 or more. <u className="font-semibold">View Details</u> </p>
                        </div>
                        <div className="mt-4 mb-10 ">
                            <h2 className="font-semibold text-xl">Bag</h2>

                            {cart.map((item) => {
                                return (
                                    <div key={item._id} className="md:flex md:space-x-10 mx-20 md:mx-0 mt-6">
                                        <Link href={`/product/${item._id}`}>
                                            <Image src={urlFor(item.image).width(200).url()} alt={"shoe"} width={200} height={200} />
                                        </Link>
                                        <div className="space-y-8">
                                            <div className="md:flex justify-between font-semibold text-[12px] md:text-md md:gap-x-24">
                                                <h1>{item.name}</h1>
                                                <p>MRP: ₹ {(item.price * (item.quantity ?? 0)).toFixed(2)}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <h2 className="text-sm text-[#757575]">{item.category}</h2>
                                                <h2 className="text-sm text-[#757575]">{item.status}</h2>
                                                <h2 className="text-sm text-[#757575] ">Size : L<span className=" flex">Qantity: <IncDec quantity={item.quantity ?? 0} updateQuantity={(newQuantity)=>updateCartQuantity(item._id,newQuantity)} /></span></h2>
                                            </div>
                                            <div className="flex gap-4 ">
                                                <div>
                                                <Tooltip title="wishlist">
                                                    <IconButton >
                                                    
                                                    <Heart />
                                                    </IconButton>
                                                </Tooltip>
                                                </div>
                                                
                                                <div>
                                                <Tooltip title="Delete">
                                                <IconButton onClick={()=>removeFromCart(item._id)}>
                                                    
                                                    <Trash2 />
                                                </IconButton>
                                                </Tooltip>
                                                </div>
                                                
                                             </div>

                                        </div>
                                    </div>
                                    // <hr className="my-6"/>


                                )
                            })}
                        </div>
                    </section>
                    <section className=" flex flex-col ">
                        <h1 className="font-semibold mb-6">Summary</h1>
                        <div className="flex font-medium text-sm justify-between">
                            <h1>Subtotal</h1>
                            <h2>{cart.reduce((acc, item) => acc + (item.price) * (item.quantity ?? 0),0).toFixed(2)}</h2>
                        </div>
                        <div className="flex font-medium text-sm space-x-40 justify-between my-4">
                            <h1>Estimated Delivery & Handling</h1>
                            <h2>Free</h2>
                        </div>
                        <hr />
                        <div className="flex font-semibold text-sm space-x-40 justify-between my-4">
                            <h1>Total</h1>
                            <h2>{cart.reduce((acc, item) => acc + (item.price) * (item.quantity ?? 0),0).toFixed(2)}</h2>
                        </div>
                        <hr />

                     <Link href={'/checkout'}><Button className="mt-6 rounded-full h-16">Member Checkout</Button></Link>   
                    </section>
                </div>
            ) : (
                <div>
                    <div className="bg-[#F5F5F5] p-4">
                        <h1 className="font-semibold">Free Delivery</h1>
                        <p className="text-sm">Applies to orders of ₹ 14 000.00 or more. <u className="font-semibold">View Details</u> </p>
                    </div>
                    <h1 className="font-semibold my-10 ml-1">YOUR CART IS EMPTY</h1>
                </div>
            )}
            
            <div className="pb-10">
                <h1 className="font-semibold text-xl ml-3 my-8">You Might Also Like This</h1>
                <CarouselSize />
            </div>
        </main>
    )
}