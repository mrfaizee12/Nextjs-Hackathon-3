
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
export default function Joinn(){
    return (
        <main>
            <section className="my-20">
                <div className="flex flex-col justify-center items-center max-w-lg mx-auto">
                <Image
                    src={"/header/nike.png"}
                    alt="Nike Logo"
                    width={65} height={35}
                    />
                    <div className=" items-center justify-center  flex flex-col">
                        <h1 className="font-bold text-xl ">BECOME A NIKE MEMBER</h1>
                        
                    </div>
                    <div className="mt-10 mb-5 max-w-[280px] mx-auto">
                    <p className="text-[#BCBCBC] text-[12px] "   >Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 mt-3">
                        <Input type="Email" placeholder="Email" className="w-80" />
                        <Input type="password" placeholder="password" className="w-80" />
                        <Input type="name" placeholder="First Name" className="w-80" />
                        <Input type="name" placeholder="Last Name" className="w-80" />
                        <Input type="dob" placeholder="Date of Birth" className="w-80" />
                        <p className="text-[#BCBCBC] text-[12px]"   >Get a Nike Member Reward every year on your Birthday.</p>
                        <Input type="drop" placeholder="Pakistan" className="w-80"  />
                        <div className="flex justify-between gap-x-10">
                            <Input type="gender" placeholder="Male" className="w-36 h-10 "  />
                            <Input type="gender" placeholder="Female" className="w-36 h-1 p-4"  />
                        </div>
                    </div>
                        
                    <div className="flex justify-between max-w-[280px] mx-auto mt-6">
                        <h1 className="text-[#BCBCBC] text-[12px] flex gap-1 items-center"><Checkbox className="border-[#BCBCBC]"/>Sign up for emails to get updates from Nike on products, offers and your Member benefits</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <p className="text-[#BCBCBC] text-[12px]">By creating an account, you agree to Nike&apos;s <u>Privacy Policy</u></p>
                        <p className="text-[#BCBCBC] text-[12px]">and <u>Terms of Use</u></p>
                    </div>
                    <Button className="w-80 ronded-sm my-6">JOIN US</Button>
                    <p className="text-[#BCBCBC] text-[12px]">Already a Member <Link href={"/login"}><u className="text-black">Sign In?</u></Link></p>
                </div>
            </section>
        </main>
    )
}