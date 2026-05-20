'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const AddRoomPage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [loading, setLoading] = useState(false);

    const amenityOptions = [
        "Whiteboard", "Projector", "Wi‑Fi",
        "Power Outlets", "Quiet Zone", "Air Conditioning"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const roomData = Object.fromEntries(formData.entries());

        const selectedAmenities = amenityOptions.filter(amenity => formData.get(amenity));

        const finalRoomData = {
            roomName: roomData.roomName,
            description: roomData.description,
            image: roomData.image,
            floor: roomData.floor,
            capacity: Number(roomData.capacity),
            hourlyRate: Number(roomData.hourlyRate),
            amenities: selectedAmenities,
            bookingCount: 0
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalRoomData),
            });

            const data = await res.json();
            // console.log('Server Response Data:', data);

            if (res.ok && data.insertedId) {
                toast.success("Room added successfully!");
                router.push('/my-listings');
            } else {
                toast.error("Failed to add room.");
            }
        } catch (error) {
            console.error("Error creating room:", error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-8 tracking-tight">
                    Add New Study Room
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">

                    {/* Room Name */}
                    <div className="form-control w-full">
                        <label className="label font-semibold text-slate-700">Room Name</label>
                        <input type="text" name="roomName" required placeholder="e.g., Premium Executive Space" className="input input-bordered w-full bg-white text-slate-900 border-2 focus:border-cyan-600 focus:outline-none rounded-xl" />
                    </div>

                    {/* Image URL */}
                    <div className="form-control w-full">
                        <label className="label font-semibold text-slate-700">Image URL</label>
                        <input type="url" name="image" required placeholder="https://example.com/room.jpg" className="input input-bordered w-full bg-white text-slate-900 border-2 focus:border-cyan-600 focus:outline-none rounded-xl" />
                    </div>

                    {/* Floor & capacity & hourly rate */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-control w-full">
                            <label className="label font-semibold text-slate-700">Floor</label>
                            <input type="text" name="floor" required placeholder="e.g., 3rd Floor" className="input input-bordered w-full bg-white text-slate-900 border-2 focus:border-cyan-600 focus:outline-none rounded-xl" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-semibold text-slate-700">Capacity</label>
                            <input type="number" name="capacity" required min="1" placeholder="e.g., 4" className="input input-bordered w-full bg-white text-slate-900 border-2 focus:border-cyan-600 focus:outline-none rounded-xl" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-semibold text-slate-700">Hourly Rate ($)</label>
                            <input type="number" name="hourlyRate" required min="1" placeholder="e.g., 5" className="input input-bordered w-full bg-white text-slate-900 border-2 focus:border-cyan-600 focus:outline-none rounded-xl" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-control w-full">
                        <label className="label font-semibold text-slate-700">Description</label>
                        <textarea name="description" required rows="4" placeholder="Describe the study room space..." className="textarea textarea-bordered w-full bg-white text-slate-900 border-2 focus:border-cyan-600 focus:outline-none rounded-xl"></textarea>
                    </div>

                    {/* Amenities Checkboxes */}
                    <div className="form-control">
                        <label className="label font-semibold text-slate-700 mb-2">Amenities</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            {amenityOptions.map((amenity) => (
                                <label key={amenity} className="flex items-center gap-3 cursor-pointer py-1">
                                    <input
                                        type="checkbox"
                                        name={amenity}
                                        className="checkbox checkbox-info checkbox-sm"
                                    />
                                    <span className="text-slate-700 font-medium text-sm">
                                        {amenity}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading} className="btn w-full bg-cyan-800 hover:bg-cyan-900 text-white font-bold text-base h-12 rounded-xl border-none shadow-lg transition-all">
                        {loading ? <span className="loading loading-spinner"></span> : "Add Room"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddRoomPage;