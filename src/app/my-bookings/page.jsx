import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { CancelModal } from '@/components/modals/CancelModal';
import { revalidatePath } from 'next/cache';


const fetchMyBookings = async (email) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings?email=${email}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
};

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    if (!user) {
        return (
            <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-slate-400">
                Please login to view your bookings.
            </div>
        );
    }

    const bookings = await fetchMyBookings(user.email);

    const handleRefresh = async () => {
        'use server';
        revalidatePath('/my-bookings');
    };

    const todayStr = new Date().toISOString().split('T')[0];

    return (
        <div className="bg-[#0b0b0b] min-h-screen p-4 md:p-12 text-white antialiased">
            <div className="max-w-6xl mx-auto bg-[#121212] rounded-3xl border border-white/5 p-6 md:p-8 shadow-2xl">

                <h1 className="text-3xl font-serif tracking-wide mb-8  pb-4">
                    My Workspace Bookings
                </h1>

                {/* no data */}
                {bookings.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                        <p className="text-slate-500 font-light text-lg">You have no bookings yet.</p>
                        <Link href="/all-rooms" className="inline-block bg-[#ff6b35] text-black font-bold px-5 py-2.5 rounded-xl text-sm transition hover:bg-white">
                            Explore Workspaces
                        </Link>
                    </div>
                ) : (
                    /* data table */
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="pb-4 font-semibold">Workspace Info</th>
                                    <th className="pb-4 font-semibold">Date</th>
                                    <th className="pb-4 font-semibold">Time Slot</th>
                                    <th className="pb-4 font-semibold">Total Cost</th>
                                    <th className="pb-4 font-semibold">Status</th>
                                    <th className="pb-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                                {bookings.map((booking) => {
                                    const isConfirmed = booking.status !== "cancelled";
                                    const isFutureOrToday = booking.date >= todayStr;
                                    const showCancelBtn = isConfirmed && isFutureOrToday;

                                    return (
                                        <tr key={booking._id} className="hover:bg-white/2 transition-colors group">
                                            {/* room name */}
                                            <td className="py-4 font-medium text-white max-w-50 truncate">
                                                {booking.roomName || "Premium Executive Space"}
                                            </td>
                                            {/* date */}
                                            <td className="py-4 font-light">{booking.date}</td>
                                            {/* time */}
                                            <td className="py-4 font-light text-slate-400">
                                                {booking.startTime} - {booking.endTime}
                                            </td>
                                            {/* cost */}
                                            <td className="py-4 font-semibold text-[#ff6b35]">
                                                ${booking.totalCost}
                                            </td>
                                            {/* status */}
                                            <td className="py-4">
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${booking.status === "cancelled"
                                                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    }`}>
                                                    {booking.status || "confirmed"}
                                                </span>
                                            </td>
                                            {/* Cancel Modal */}
                                            <td className="py-4 text-right">
                                                {showCancelBtn ? (
                                                    <CancelModal
                                                        bookingId={booking._id}
                                                        userEmail={user.email}
                                                        onCancelSuccess={handleRefresh}
                                                    />
                                                ) : (
                                                    <span className="text-xs text-slate-600 italic">Non-reversible</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;