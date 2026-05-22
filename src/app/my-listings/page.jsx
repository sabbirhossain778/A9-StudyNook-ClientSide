'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import RoomCard from '@/components/shared/Card';
import useDocumentTitle from '@/hooks/useDocumentTitle';


const MyListingsPage = () => {

    useDocumentTitle("StudyNook – My Listings");

    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const token = session?.token;

    const [myRooms, setMyRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchMyRooms = async () => {
            if (!session) return;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings?email=${session.user.email}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setMyRooms(data);
                }
            } catch (error) {
                console.error("Error loading my rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending && session) {
            fetchMyRooms();
        }
    }, [session, isPending, router]);

    // loading
    if (isPending || (session && loading)) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <span className="loading loading-spinner loading-large text-emerald-600"></span>
            </div>
        );
    }
    if (!session) return null;





    return (
        <div className="bg-white min-h-screen py-10 px-6 sm:px-12 lg:px-16 text-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* title */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-wide mb-3">
                        Your Managed Workspaces
                    </h1>
                    <p className="text-slate-500 font-medium tracking-wider uppercase text-xs sm:text-sm">
                        Total Published Listings: <span className="text-emerald-600 font-bold text-base">{myRooms.length}</span>
                    </p>
                    <div className="w-20 h-1 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* No data */}
                {myRooms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-20 border border-slate-100 rounded-3xl bg-slate-50/50 p-6">
                        <span className="text-4xl mb-3 opacity-40">✦</span>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Inventory is empty</h3>
                        <p className="text-slate-400 text-xs mt-1 max-w-xs font-light">
                            You haven't published any rooms yet. Let's list your first space on the network.
                        </p>
                        <Link
                            href="/add-room" className="mt-6 inline-flex items-center h-10 px-5 border-2 border-current text-slate-950 hover:bg-slate-950 hover:text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300">
                            Add First Room
                        </Link>
                    </div>
                ) : (
                    /* data */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {myRooms.map((room) => (
                            <RoomCard key={room._id} room={room} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyListingsPage;