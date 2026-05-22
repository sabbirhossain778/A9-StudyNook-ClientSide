import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { CancelModal } from '@/components/modals/CancelModal';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "StudyNook – My Bookings",
};

const handleRefresh = async () => {
    'use server';
    revalidatePath('/my-bookings');
};


const MyBookingsPage = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    if (!user) {
        redirect('/login');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings?email=${user.email}`, {
        cache: 'no-store',
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const bookings = res.ok ? await res.json() : [];
    const todayStr = new Date().toISOString().split('T')[0];

    return (
        <div className="bg-slate-50 min-h-screen p-4 md:p-12 text-slate-800 antialiased">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">

                <h1 className="text-3xl font-serif tracking-wide mb-8 pb-4 border-b border-slate-100 text-slate-900">
                    My Workspace Bookings
                </h1>

                {/* no data */}
                {bookings.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                        <p className="text-slate-400 font-light text-lg">You have no bookings yet.</p>
                        <Link href="/all-rooms" className="inline-block bg-[#ff6b35] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition hover:bg-slate-900">
                            Explore Workspaces
                        </Link>
                    </div>
                ) : (
                    /* data table */
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                    <th className="pb-4 font-semibold">Workspace Info</th>
                                    <th className="pb-4 font-semibold">Date</th>
                                    <th className="pb-4 font-semibold">Time Slot</th>
                                    <th className="pb-4 font-semibold">Total Cost</th>
                                    <th className="pb-4 font-semibold">Status</th>
                                    <th className="pb-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                                {bookings.map((booking) => {
                                    const isConfirmed = booking.status !== "cancelled";
                                    const isFutureOrToday = booking.date >= todayStr;
                                    const showCancelBtn = isConfirmed && isFutureOrToday;

                                    return (
                                        <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors group">
                                            {/* room name */}
                                            <td className="py-4 font-medium text-slate-900 max-w-50 truncate">
                                                {booking.roomName || "Premium Executive Space"}
                                            </td>
                                            {/* date */}
                                            <td className="py-4 font-light">{booking.date}</td>
                                            {/* time */}
                                            <td className="py-4 font-light text-slate-500">
                                                {booking.startTime} - {booking.endTime}
                                            </td>
                                            {/* cost */}
                                            <td className="py-4 font-semibold text-[#ff6b35]">
                                                ${booking.totalCost}
                                            </td>
                                            {/* status */}
                                            <td className="py-4">
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${booking.status === "cancelled"
                                                    ? "bg-rose-50 text-rose-600 border border-rose-100"
                                                    : "bg-emerald-50 text-emerald-600 border border-emerald-100"
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
                                                    <span className="text-xs text-slate-400 italic">Non-reversible</span>
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