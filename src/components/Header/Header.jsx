"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { BiMenuAltLeft } from "react-icons/bi";
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import BottomNavBar from './Bottommenu';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Topbar from '../Header/Topbar';
import Navbar from '../Header/Navbar';
import logo from '../../../public/assets/images/img/logo.webp';
import { makeRequest } from "@/api";
import { Loader2 } from 'lucide-react';

// Debounce function to limit how often we call the API
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const Header = () => {
    const [Categorydata, setCategoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);
    var user = useSelector((state) => state.auth.isAuthenicated);
    const GetAllCategory = async () => {


        try {
            const storedToken = localStorage.getItem("authToken");
            const response = await makeRequest("POST", "/Category/GetAllCategory", {
                headers: { Authorization: `Bearer ${storedToken}` },
            });


            if (response.message == "SUCCESS" && response.retval == "SUCCESS") {

                setCategoryData(response.categoryList.$values)


            }

        } catch (error) {
            console.error("Unexpected error fetching categories:", error);

        }
    };



    useEffect(() => {


        GetAllCategory();
        console.log(Categorydata)

    }, []);
    // Debounced search function
    const debouncedSearch = debounce(async (searchQuery) => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        setIsSearchLoading(true);
        setSearchError(null);

        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const data = await response.json();
            setSearchResults(data);
            setShowSearchResults(true);
        } catch (err) {
            setSearchError(err.message);
            setSearchResults([]);
        } finally {
            setIsSearchLoading(false);
        }
    }, 300); // 300ms delay

    // Trigger search when query changes
    useEffect(() => {
        debouncedSearch(searchQuery);

        // Cleanup function
        return () => {
            // Cancel any pending debounced calls if component unmounts
            debouncedSearch.cancel?.();
        };
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        debouncedSearch(searchQuery);
    };

    const handleSearchBlur = () => {
        // Delay hiding results to allow click events to register
        setTimeout(() => {
            setShowSearchResults(false);
        }, 200);
    };

    const handleSearchFocus = () => {
        if (searchQuery && searchResults.length > 0) {
            setShowSearchResults(true);
        }
    };

    // Rest of your existing code (fetchCartData, GetAllCategory, etc.)

    return (
        <div>
            {/* Topbar */}
            <Topbar />

            <header className="container max-w-screen-3xl mx-auto flex items-center justify-between sm:px-7 lg:px-8 px-4 py-3">
                {/* Left side: Logo */}
                <div className="flex items-center space-x-4">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={200}
                        height={200}
                        className="h-auto w-[350px] sm:w-[350px] md:w-[200px] lg:w-[120px]"
                    />
                </div>

                <div className="categories-dropdown">
                    {/* Desktop View */}
                    <div className="desktop-view">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="dropdown-btn"
                        >
                            <BiMenuAltLeft size={20} />
                            <span className="dropdown-text font-family:">All Categories</span>
                            <FiChevronDown size={20} className="dropdown-arrow" />
                        </button>
                        <div className={`dropdown-menu ${isCategoryOpen ? "open" : ""}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                            <ul>
                                {Categorydata.map((category, index) => (
                                    <li key={index} className="dropdown-item">
                                        {category.image && (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${category.image}`}
                                                width={40}
                                                height={40}
                                                alt={category.category_Name}
                                                className="category-image"
                                            />
                                        )}
                                        <a href={`/Category?category_id=${category.category_id}`} className='bottom'>
                                            {category.category_Name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative lg:flex md:hidden items-center space-x-4 w-full lg:w-auto xl:w-auto">
                    <form onSubmit={handleSearchSubmit} className="relative w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                            placeholder="Search..."
                            className="px-6 py-2 rounded-full border border-gray-300 focus:outline-none font-poppins focus:ring-2 focus:ring-green-800 text-lg transition-all duration-300 ease-in-out w-full sm:w-[300px] md:w-[360px] lg:w-[500px] xl:w-[600px] lg:flex hidden lg:block"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-0 bottom-0 bg-yellow-400 font-poppins flex items-center text-black px-6 py-2 rounded-r-full rounded-l-lg text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-yellow-500 focus:outline-none lg:flex hidden lg:block"
                            disabled={isSearchLoading}
                        >
                            {isSearchLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Search
                                    <span className="ml-2">
                                        <FiSearch />
                                    </span>
                                </>
                            )}
                        </button>

                        {/* Search Results Dropdown */}
                        {showSearchResults && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                                {isSearchLoading ? (
                                    <div className="flex justify-center items-center py-4">
                                        <Loader2 className="animate-spin text-green-600" size={24} />
                                    </div>
                                ) : searchError ? (
                                    <p className="text-center text-red-500 p-4">{searchError}</p>
                                ) : searchResults.length > 0 ? (
                                    searchResults.map((result, index) => (
                                        <Link
                                            key={index}
                                            href={`/product/${result.id}`} // Adjust this based on your product route
                                            className="block p-4 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                        >
                                            <div className="flex items-center">
                                                {result.image && (
                                                    <Image
                                                        src={result.image}
                                                        width={40}
                                                        height={40}
                                                        alt={result.title}
                                                        className="mr-3"
                                                    />
                                                )}
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{result.title}</h3>
                                                    <p className="text-sm text-gray-500">{result.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : searchQuery ? (
                                    <p className="text-center text-gray-500 p-4">No results found.</p>
                                ) : null}
                            </div>
                        )}
                    </form>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsUserMenuOpen(true)}
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                        <FaUser className="text-xl cursor-pointer hover:text-gray-700 transition" />
                        {isUserMenuOpen && (
                            <div className="absolute right-0 w-28 bg-white shadow-md rounded-md z-50">
                                {user ? (
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>


                    <Link href="./wishlist" className="text-xl cursor-pointer hover:text-gray-700 transition-all duration-300 ease-in-out relative">
                        <FaHeart className="text-xl cursor-pointer hover:text-gray-700 transition-all duration-300 ease-in-out relative" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-medium rounded-full w-4 h-4 mb-2 flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link
                        href="./cart"
                        className="flex flex-col items-center relative text-gray-700 hover:text-gray-900 transition-colors duration-200"
                    >
                        <div className="relative">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                                    fill="currentColor"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-medium rounded-full w-4 h-4 mb-2 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                    </Link>
                </div>
            </header>

            {/* Divider for Mobile */}
            <div className="sm:hidden mt-1 border-t-2 border-gray-300 my-1"></div>

            {/* Navbar */}
            <Navbar />
            {/* Bottommenu */}
            <BottomNavBar />
        </div>
    );
};

export default Header;