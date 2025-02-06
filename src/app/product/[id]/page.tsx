"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/context"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

export interface Products {
    _id: string
    id: string
    name: string
    inventory: number
    price: number
    status: string
    category: string
    size: string[]
    colors: string[]
    image: string
    quantity?: number
}

interface Review {
    text: string;
    rating: number;
}

export default function HeroProduct({ params }: { params: Promise<{ id: string }> }) {
    const [item, setItem] = useState<Products[]>([]);
    const [ID, setID] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const id = (await params).id;  // Params se id le rahe hain
            setID(id);

            const ListingData = async () => {
                const res = await client.fetch(`*[ _id == "${id}"]{_id,id,name,inventory,price,status,category,image,size,colors}`);
                return res;
            };
            const product: Products[] = await ListingData();
            setItem(product);
        };
        fetchData();
    }, [params]);  // Dependency array mein 'params' ko add kiya gaya hai

    useEffect(() => {
        const savedReviews = localStorage.getItem(`reviews-${ID}`);
        setReviews(savedReviews ? JSON.parse(savedReviews) : []);
    }, [ID]);

    const inputComment = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleRating = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!comment.trim() || rating === 0) {
            alert("Please add both a review and a rating.");
            return;
        }

        const newReview: Review = { text: comment, rating };
        const updatedReviews = [...reviews, newReview];

        localStorage.setItem(`reviews-${ID}`, JSON.stringify(updatedReviews));

        setReviews(updatedReviews);
        setComment("");
        setRating(0);
        alert("Review saved!");
    };

    const handleDeleteReview = (index: number) => {
        const updatedReviews = reviews.filter((_, i) => i !== index);
        localStorage.setItem(`reviews-${ID}`, JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
    };

    const { addToCart, addToWishlist } = useCart();

    return (
        <main className="max-w-[900px] p-4 mx-auto my-20">
            {item.map((data) => (
                <div key={data._id}>
                    <div className="md:flex md:space-x-10 lg:space-x-40">
                        <Image src={urlFor(data.image).width(500).url()} alt={data.name} width={500} height={500} />
                        <div>
                            <h1 className="text-xl md:text-4xl">{data.name}</h1>
                            <h2 className="text-lg text-[#757575]">{data.category}</h2>
                            <h1 className="text-lg font-semibold mt-10">MRP: $ {data.price}</h1>
                            <h2 className="text-lg text-[#757575]">incl. of taxes</h2>
                            <h2 className="text-lg text-[#757575]">(Also includes all applicable duties)</h2>

                            <section>
                                <div className="flex justify-between mt-6">
                                    <h1 className="font-semibold text-sm">Select Size</h1>
                                    <h1 className="text-sm text-[#757575]">Size Guide</h1>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {data.size.map((sizes, index) => (
                                        <Button key={index} className="bg-white text-black border-[1px] border-black hover:bg-black hover:text-white">{sizes}</Button>
                                    ))}
                                </div>
                                <div>
                                    <h1 className="font-semibold text-sm">Select Color</h1>
                                    {data.colors.map((color, index) => (
                                        <Button key={index} className="bg-white text-black border-[1px] border-black hover:bg-black hover:text-white">{color}</Button>
                                    ))}
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <Button onClick={() => addToWishlist(data)} className="bg-white hover:bg-[#a7a3a3]">
                                        <Image src={"/header/heart.png"} alt={"heart"} width={24} height={24} />
                                    </Button>
                                    <Button onClick={() => addToCart(data)} className="bg-white hover:bg-[#a7a3a3]">
                                        <Image src={"/header/cart.png"} alt={"cart"} width={24} height={24} />
                                    </Button>
                                </div>
                               <Link href={'/cart'}><Button className="bg-black hover:bg-white hover:text-black mt-4 w-72 md:w-96 rounded-full h-14">Go to Cart page</Button></Link> 
                            </section>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h1 className="font-semibold text-2xl text-black">Add Reviews</h1>

                        <Input value={comment} onChange={inputComment} placeholder="Write your review..." />

                        <div className="flex mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRating(star)}
                                    className={`text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        <Button onClick={handleSubmit} className="mt-2">Submit Review</Button>

                        <div className="mt-5">
                            <h1 className="font-semibold text-xl">Customer Reviews</h1>
                            {reviews.length === 0 ? (
                                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                            ) : (
                                reviews.map((review, index) => (
                                    <div key={index} className="mt-2 p-2 border rounded-md">
                                        <p className="text-lg">{review.text}</p>
                                        <div className="text-yellow-500">
                                            {"★".repeat(review.rating)}
                                            {"☆".repeat(5 - review.rating)}
                                        </div>
                                        <Button onClick={() => handleDeleteReview(index)} className="mt-2 text-black p-1 bg-white hover:text-white hover:bg-black">
                                            delete
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}
