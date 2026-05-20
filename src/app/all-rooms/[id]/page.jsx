
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { DeleteModal } from '@/components/modals/DeleteModal';
import { EditModal } from '@/components/modals/EditModal';


const fetchSingleRoom = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-rooms/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching room:", error);
        return null;
    }
};

const RoomDetailsPage = async ({ params }) => {

    const { id } = await params;
    const room = await fetchSingleRoom(id);
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;


    if (!room) {
        return (
            <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
                <h1 className="text-3xl font-medium text-slate-400 tracking-wider animate-pulse">
                    Loading...
                </h1>
            </div>
        );
    }

    const {
        _id,
        roomName = "Premium Executive Space",
        image = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
        description = "No description provided for this luxury workspace.",
        floor = "G Floor",
        capacity = "Not Specified",
        hourlyRate = "0",
        amenities = [],
        bookingCount = 0
    } = room;

    const isLoggedIn = !!user;
    const isOwner = user && room && user.email === room.userEmail;

    return (
        <div className="bg-[#0b0b0b] min-h-screen flex items-center justify-center p-4 md:p-12 font-sans antialiased selection:bg-[#ff6b35] selection:text-black">
            <div className="max-w-6xl w-full bg-[#121212] rounded-3xl border border-white/5 p-6 md:p-12 shadow-2xl relative">

                {/* top delete icon */}
                <div className="absolute top-6 right-6 z-20">
                    <Link href="/all-rooms" className="luxury-circle-btn">
                        ✕
                    </Link>
                </div>

                {/* main part */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* leftside img */}
                    <div className="relative p-2 flex items-center justify-center w-full">
                        <div className="luxury-border-box" />
                        <div className="luxury-photo-frame">
                            <Image
                                src={image}
                                alt={roomName}
                                fill
                                priority
                                className="object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
                            />

                            {/* Booking Count */}
                            <div
                                className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold text-white/90">
                                🔥 Demand: Booked {bookingCount} Times
                            </div>
                        </div>
                    </div>

                    {/* right side content */}
                    <div className="space-y-8 z-10">

                        {/* title & description */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                                {roomName}
                            </h1>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                                {description}
                            </p>
                        </div>

                        {/* Area/Floor/Capacity */}
                        <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                            <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Floor</span>
                                <span className="block text-sm font-semibold text-white mt-0.5">{floor}</span>
                            </div>
                            <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Capacity</span>
                                <span className="block text-sm font-semibold text-white mt-0.5">{capacity}</span>
                            </div>
                            <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status</span>
                                <span className="block text-sm font-semibold text-emerald-400 mt-0.5">Available</span>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-3 pt-2">
                            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-widest">Included Amenities</h4>

                            {amenities && amenities.length > 0 ? (
                                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                                    {amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-3 group cursor-default">
                                            {/* orange icon */}
                                            <span className="text-xl text-[#ff6b35] filter drop-shadow-[0_0_8px_rgba(255,107,53,0.3)] transform transition-transform duration-300 group-hover:scale-110">
                                                ✦
                                            </span>
                                            <span className="text-base font-serif text-slate-300 group-hover:text-white transition-colors">
                                                {amenity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-600 italic">No special amenities listed for this room.</p>
                            )}
                        </div>

                        {/* price & btn */}
                        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            {/* rate */}
                            <div>
                                <p className="text-[12px] text-slate-400 uppercase tracking-widest font-bold">Hourly Rate</p>
                                <p className="text-3xl  text-white mt-1">
                                    ${hourlyRate}<span className="text-sm font-normal text-slate-400 text-[16px]">/hr</span>
                                </p>
                            </div>

                            {/* book now / login btn */}
                            <div className="flex-grow sm:flex-grow-0">
                                {isLoggedIn ? (
                                    <button className="w-full sm:w-auto bg-white text-black font-bold px-6 py-3 rounded-lg transition duration-200">
                                        Book This Space
                                    </button>
                                ) : (
                                    <Link href="/login" className="block w-full">
                                        <Button className="w-full sm:w-auto bg-[#ff6b35] hover:bg-white text-black font-bold  px-6 py-3 rounded-lg transition duration-200">
                                            Login to Book
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Edit & Delete btn */}
                        {isOwner && (
                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-dashed border-white/5">
                                <EditModal room={room} userEmail={user?.email} />
                                <DeleteModal roomId={room._id} userEmail={user?.email} />

                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default RoomDetailsPage;

