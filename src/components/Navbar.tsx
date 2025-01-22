"use client"
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from 'react-icons/fa'; 
import Badge from '@mui/material/Badge';
import { useCart } from "@/context/context";
// import SearchBar from "./search";
export default function Navbar() {
  const {count,countWish} = useCart()
  return (
    <header className=''>
    
    <div className="bg-[#fafafa] flex justify-between items-center px-6 py-2 md:text-[11px] sm:text-[9px] text-[8px] font-medium text-gray-500">
      <Link href={"/"}><Image src={"/header/logo.png"} alt={''} width={24} height={24}/></Link>
      <div>
  <p className="text-black text-[9px] md:text-sm bg-white px-1">Skip to main content</p>
</div>
      <div className="flex md:gap-4 sm:gap-3 gap-1 font-semibold">
        <Link href="/location" className="hover:text-gray-800">Find a Store</Link>
        <h2>|</h2>
        <Link href="/help-us" className="hover:text-gray-800">Help</Link>
        <h2>|</h2>
        <Link href="/Join" className="hover:text-gray-800">Join Us</Link>
        <h2>|</h2>
        <Link href="/login" className="hover:text-gray-800">Sign In</Link>
      </div>
    </div>


    <div className="flex flex-wrap justify-between items-center px-6 py-4">
   
      <div className="flex items-center">
        <Link href={"/"}>
        <Image
          src={"/header/nike.png"}
          alt="Nike Logo"
          width={35} height={35}
        />
        </Link>
        
      </div>

      
      <nav className="flex gap-4 md:gap-6 text-gray-700  md:text-[16px] sm:text-[14px] font-semibold text-[10px] ">
        <Link href="/new" className="hover:text-black whitespace-nowrap">New & Featured</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">Men</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">Women</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">Kids</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">Sale</Link>
        <Link href="/new" className="hover:text-black whitespace-nowrap">SNKRS</Link>
      </nav>

      
      <div className="flex  items-center gap-4 mt-4 md:mt-0">
       
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-full pl-4 bg-[#F5F5F5] pr-10 py-2 text-sm focus:outline-none"
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
          {/* <SearchBar /> */}
        </div>
       
        <Link href={"/wishlist"}><Badge badgeContent={countWish} color="error">  <Image src={"/header/heart.png"} alt={"heart"} width={24} height={24}/></Badge></Link>
        
        <Link href={"/cart"}><Badge badgeContent={count} color="error">  <Image src={"/header/cart.png"} alt={"cart"} width={24} height={24}/></Badge></Link>
       
      </div>
    </div>

  
    <div className="block md:hidden px-6 mt-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none w-full"
        />
        <FaSearch className="absolute right-3 top-2.5 text-gray-500" />

      </div>
      
    </div>
  </header>
  );
}



