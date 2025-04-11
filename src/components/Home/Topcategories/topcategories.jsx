
'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { makeRequest } from "@/api";
import Image from "next/image";
import fallbackImage from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/noga.svg";

const TopCategorySection = () => {
    const [categoryData, setCategoryData] = useState([]);
    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;

    const GetAllCategory = async () => {
        try {
            const storedToken = localStorage.getItem("authToken");
            const response = await makeRequest(
                "POST",
                "/Category/GetAllCategory",
                {},
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );

            if (response.message === "SUCCESS" && response.retval === "SUCCESS") {
                setCategoryData(response.categoryList.$values);
            } else {
                console.error("Failed to fetch categories:", response.message);
            }
        } catch (error) {
            console.error("Unexpected error fetching categories:", error);
        }
    };

    useEffect(() => {
        GetAllCategory();
    }, []);

    return (
        <div className="container mx-auto p-4 font-poppins">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Top Categories</h1>
            </div>

            <div className="p-2 text-center">
                <div className="flex justify-center items-center mb-4">
                    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 w-full max-w-[1500px] mx-auto">
                        {categoryData.map((category, index) => {
                            const imageUrl = category?.image ? `${imageBaseUrl}${category.image}` : fallbackImage.src;
                            return (
                                <Link
                                    key={index}
                                    href={{
                                        pathname: "/Category",
                                        query: { category_id: category.category_id },
                                    }}
                                    className="relative text-center group cursor-pointer"
                                >
                                    <div className="flex justify-center">
                                        <Image
                                            src={imageUrl}
                                            alt={category.category_Name || "Category Image"}
                                            width={96}
                                            height={96}
                                            className="rounded-full border-2 border-green-500 object-cover"
                                            // onError={(e) => {
                                            //     const target = e.target as HTMLImageElement;
                                            //     target.src = fallbackImage.src;
                                            // }}
                                        />
                                    </div>
                                    <h4 className="mt-2 text-xs sm:text-sm text-center">
                                        <span className="text-green-600 font-bold">
                                            {category.category_Name}
                                        </span>
                                    </h4>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopCategorySection;