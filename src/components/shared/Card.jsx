import Image from 'next/image';
import Link from 'next/link';

const RoomCard = ({ room }) => {
    const amenitiesList = room?.amenities || ["High-Speed Wi-Fi", "LED Screen", "Whiteboard", "AC", "Power Outlets"];

    const maxAmenities = 3;
    const displayedAmenities = amenitiesList.slice(0, maxAmenities);
    const remainingCount = amenitiesList.length - maxAmenities;

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group">

            {/* Room image */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                <Image
                    src={room?.image || "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80"}
                    alt={room?.roomName || "Study Room"}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Seat capacity */}
                <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                    👤 Capacity: {room?.capacity || "2–4 people"}
                </span>
            </div>

            {/* content */}
            <div className="p-6 flex flex-col flex-grow">

                {/* Floor */}
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                    📍 {room?.floor || "Floor 3"}
                </span>

                {/* Room name */}
                <h3 className="text-xl font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1 mb-2">
                    {room?.roomName || "Standard Study Space"}
                </h3>

                {/* description */}
                <p className="text-slate-500 text-sm mb-4 flex-grow">
                    {room?.description
                        ? (room.description.length > 100 ? `${room.description.slice(0, 100)}...` : room.description)
                        : "A quiet, distraction-free environment perfect for deep focus, research, and collaborative academic work."
                    }
                </p>

                {/* Amenities shown */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {
                        displayedAmenities.map((amenity, index) => (
                            <span key={index} className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-md">
                                {amenity}
                            </span>
                        ))
                    }
                    {remainingCount > 0 && (
                        <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2.5 py-1 rounded-md border border-emerald-100">
                            +{remainingCount} more
                        </span>
                    )}
                </div>

                {/* price and btn */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Hourly Rate</p>
                        <p className="text-2xl font-bold text-slate-900">
                            ${room?.price || "5"}<span className="text-xs text-slate-400 font-normal">/hr</span>
                        </p>
                    </div>

                    {/* btn */}
                    <Link href={`/rooms/${room?._id}`}>
                        <button className="bg-slate-950 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;