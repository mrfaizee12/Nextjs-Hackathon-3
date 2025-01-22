
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
export default function Login(){
    return (
        <main>
            <section className="my-20">
                <div className="flex flex-col justify-center items-center max-w-lg mx-auto">
                <Image
                    src={"/header/nike.png"}
                    alt="Nike Logo"
                    width={65} height={35}
                    />
                    <div className=" items-center justify-center flex flex-col">
                        <h1 className="font-bold text-xl ">YOUR ACCOUNT</h1>
                        <h1 className="font-bold text-xl ">FOR EVERYTHING </h1>
                        <h1 className="font-bold text-xl ">NIKE</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 mt-3">
                        <Input type="Email" placeholder="Email" className="w-80" />
                        <Input type="password" placeholder="password" className="w-80" />
                    </div>
                        
                    <div className="flex justify-between max-w-lg mx-auto mt-6 gap-x-10 md:gap-x-16">
                        <h1 className="text-[#BCBCBC] text-[12px] flex gap-1 items-center"><Checkbox className="border-[#BCBCBC]"/>Keep me signed In</h1>
                        <p className="text-[#BCBCBC] text-[12px]"   >Forgotten your password?</p>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <p className="text-[#BCBCBC] text-[12px]">By logging in, you agree to Nike&apos;s <u>Privacy Policy</u></p>
                        <p className="text-[#BCBCBC] text-[12px]">and <u>Terms of Use</u></p>
                    </div>
                    <Button className="w-80 ronded-sm my-6">SIGN IN</Button>
                    <p className="text-[#BCBCBC] text-[12px]">Not a Member <Link href={"/Join"}> <u className="text-black">Join Us?</u></Link></p>
                </div>
            </section>
        </main>
    )
}