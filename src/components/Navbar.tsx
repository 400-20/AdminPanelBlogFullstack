// Navbar.js
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';  // Correct import for useRouter
import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../helpers/AuthContext'; // Import useAuth

export default function Navbar() {
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth(); // Get isLoggedIn and logout from context

    const handleLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            logout();  // Use context logout function
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.error(error.response?.data?.message || "An error occurred");
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-2xl font-bold">Shut App</Link>
                <div className="flex space-x-4">
                    <Link href="/profile" className="text-white hover:text-gray-300 mt-2">Profile</Link>
                    <Link href="/blog" className="text-white hover:text-gray-300 mt-2">Blogs</Link>
                    <div className="flex space-x-2">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-800 transition">
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-800 transition">
                                Login
                            </Link>
                        )}
                        {!isLoggedIn && (
                            <Link href="/signup" className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 transition">
                                Sign Up
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
