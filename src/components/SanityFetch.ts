import { client } from "@/sanity/lib/client";

export interface Products{
    _id:string
    id:string
    name:string
    inventory:number
    price:number
    status:string
    category:string
    size:string[]
    colors:string[]
    image:string

}

export default async function AirMAx(){
    const res = await client.fetch("*[_type == 'products']{_id,id,status,image,inventory,colors,size,price,name,category}")
    return res
}

export const airMAx:Products[] = await AirMAx()

export  async function Gear(){
    const res = await client.fetch("*[_type == 'gear1']{_id,id,status,image,inventory,colors,size,price,name,category}")
    return res
}

export const gear:Products[] = await Gear()


export  async function Feature(){
    const res = await client.fetch("*[_type == 'feature']{_id,id,status,image,inventory,colors,size,price,name,category}")
    return res
}

export const feature:Products[] = await Feature()