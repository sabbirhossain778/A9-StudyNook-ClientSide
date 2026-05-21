"use client";
import RoomCard from '@/components/shared/Card';
import React, { useState, useEffect } from 'react';

const AllRoomPage = () => {
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [loading, setLoading] = useState(true);

    const amenitiesList = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-rooms?search=${search}`)
            .then(res => res.json())
            .then(data => {
                setRooms(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [search]);

    const handleAmenityChange = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    const filteredRooms = rooms.filter(room => {
        const matchesAmenities = selectedAmenities.every(amenity =>
            room.amenities && room.amenities.includes(amenity)
        );
        return matchesAmenities;
    });


    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-wide mb-3">
                        Find Your Ideal Study Space
                    </h2>
                    <p className="text-slate-500 font-medium tracking-wider uppercase text-xs sm:text-sm">
                        Available Private & Group Rooms: <span className="text-emerald-600 font-bold text-base">{rooms.length}</span>
                    </p>
                    <div className="w-20 h-1 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Search & Filter Section */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                        {/* Search Input */}
                        <div className="md:col-span-1">
                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider block mb-2">Search by name</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="e.g. Quiet Pod"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-emerald-600 transition"
                            />
                        </div>

                        {/* Amenities Filter */}
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider block mb-2">Amenities</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {amenitiesList.map((amenity) => (
                                    <label
                                        key={amenity}
                                        className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none group"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedAmenities.includes(amenity)}
                                            onChange={() => handleAmenityChange(amenity)}
                                            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                        />
                                        <span className={`transition ${selectedAmenities.includes(amenity) ? "text-emerald-600 font-medium" : "group-hover:text-slate-900"}`}>
                                            {amenity}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* loading state */}
                {loading ? (
                    <div className="text-center py-12 text-slate-400 font-light">Loading rooms...</div>
                ) : rooms.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-8">
                        <p className="text-slate-400 text-lg font-light">No rooms match your search or filters.</p>
                    </div>
                ) : (
                    /* card grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            rooms.map(room => (
                                <RoomCard key={room._id} room={room} />
                            ))
                        }
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllRoomPage;