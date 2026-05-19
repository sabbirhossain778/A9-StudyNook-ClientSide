import RoomCard from '@/components/shared/Card';
import { allRooms } from '@/lib/rooms/data';
import React from 'react';

const AllRoomPage = async() => {

    const rooms = await allRooms();

    return (
        <div className="bg-slate-50 min-h-10/12 py-12 px-4 sm:px-6 lg:px-8">
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

                {/* card grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        rooms.map(room => (
                            <RoomCard key={room._id} room={room} />
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default AllRoomPage;