import Image from "next/image"
import { Button } from "./ui/button"
import { CarouselSize } from "./HeroCarousel"
import { GearCarousel1 } from "./GearCarousel1"

import Link from "next/link"
export default function Hero(){
    return (
        <main className="">
            <section className="bg-[#F5F5F5] flex flex-col justify-center items-center">
                 <h1 className="font-semibold">Hello Nike App</h1>
                 <p className="text-sm">Download the app to access everything Nike. <u className="font-semibold">Get Your Great</u></p>
           </section>
            <Image src={"/hero/hero.png"} alt={"shoes"} width={1344} height={700}/>
            <div className="flex flex-col justify-center items-center max-w-[480px] mx-auto space-y-3 my-10">
                <p className="font-semibold">First Look</p>
                <h1 className="font-semibold text-3xl md:text-4xl">NIKE AIR MAX PULSE</h1>
                <p className="text-[9px] md:text-sm">Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse
                —designed to push you past your limits and help you go to the max.</p>
                <div className="flex gap-2 pt-4">
                    <Button className="rounded-full">Notify Me</Button>
                    <Link href={"/new"} >    <Button className="rounded-full">Shop Air Max</Button></Link>
                </div>
            </div>
            <div>
                <h1 className="font-semibold text:lg md:text-xl mb-3 ml-2">Best Of Air Max</h1>
                <CarouselSize/>
            </div>
            <section className="my-20">
                <h1 className="font-semibold text-xl mb-3 ml-2">Featured</h1>
                <Image src={"/hero/featured.png"} alt={"featured"} width={1344} height={700}/>
                <div className="flex flex-col justify-center items-center space-y-5 pt-10">
                    <h1 className="font-semibold text-xl md:text-4xl">STEP INTO WHAT FEELS GOOD</h1>
                    <h2 className="text-[9px] md:text-sm">Cause everyone should know the feeling of running in that perfect pair.</h2>
                    <Link href={"/new"} > <Button className="rounded-full">Find Your Shoe</Button></Link>
                </div>
            </section>
            <section>
                <h1 className="font-semibold text-xl mb-3 ml-2">Gear Up</h1>
                <div className="md:flex space-y-10 md:space-y-0 md:space-x-10">
                    <GearCarousel1/>
                    <GearCarousel1/>
                    {/* <GearCarousel2/> */}
                </div>
            </section>
            <section className="my-20">
                <h1 className="font-semibold text-xl mb-3 ml-2">Don&apos;t Miss</h1>
                <Image src={"/hero/Flight.png"} alt={"flight"} width={1344} height={700}/>
                <div className="flex flex-col justify-center items-center space-y-5 pt-10">
                    <h1 className="font-semibold text-2xl md:text-4xl">FLIGHT ESSENTIALS</h1>
                    <h2 className="text-[9px] md:text-sm">Your built-to-last,all-week wears—but with style only Jordan Brand can deliver.</h2>
                    <Link href={"/new"}><Button className="rounded-full">Shop</Button></Link>
                </div>
            </section>
            <section className="">
                <h1 className="font-semibold text-xl mb-3 ml-2">The Essentials</h1>
                <div className="md:flex md:space-x-6 md:space-y-0 space-y-6">
                <div className="relative">
                    <Image src={"/hero/ess1.png"} alt={"shoes"} width={440} height={540}/>
                    <Button className="bg-white text-black rounded-full Men's absolute bottom-4 left-4">Men&apos;s</Button>
                </div>
                <div className="relative">
                    <Image src={"/hero/ess2.png"} alt={"shoes"} width={440} height={540}/>
                    <Button className="bg-white text-black rounded-full Men's absolute  bottom-4 left-4">Women&apos;s</Button>
                </div>
                <div className="relative">
                    <Image src={"/hero/ess3.png"} alt={"shoes"} width={440} height={540}/>
                    <Button className="bg-white text-black rounded-full Men's absolute  bottom-4 left-4">kid&apos;s</Button>
                </div>
                </div>
                <div className="my-20 grid grid-cols-2 lg:grid-cols-4 mx-4 md:mx-32 gap-10">
                    <div>
                    <h1 className="font-semibold">Icons</h1>
                    <ul className="mt-3 space-y-2 text-[#757575] text-sm">
                        <li>Air Force 1</li>
                        <li>Huarache</li>
                        <li>Air Max 90</li>
                        <li>Air Max 95</li>
                    </ul>
                    </div>
                    <div>
                    <h1 className="font-semibold">Shoes</h1>
                    <ul className="mt-3 space-y-2 text-[#757575] text-sm">
                        <li>All Shoes</li>
                        <li>Custom Shoes</li>
                        <li>Jordan Shoes</li>
                        <li>Running Shoes</li>
                    </ul>
                    </div>
                    <div>
                    <h1 className="font-semibold">Clothing</h1>
                    <ul className="mt-3 space-y-2 text-[#757575] text-sm">
                        <li>All Clothing</li>
                        <li>Modest Wear</li>
                        <li>Hoodies & Pullovers</li>
                        <li>Shirts & Tops</li>
                    </ul>
                    </div>
                    <div>
                    <h1 className="font-semibold">Kids</h1>
                    <ul className="mt-3 space-y-2 text-[#757575] text-sm">
                        <li>Infant & Toddler Shoes</li>
                        <li>Kids Shoes</li>
                        <li>Kids Jordan Shoes</li>
                        <li>Kids Basketball Shoes</li>
                    </ul>
                    </div>
                </div>
            </section>
        </main>
    )
}