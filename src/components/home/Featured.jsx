import React from 'react';
import RoomCard from '../shared/Card';

const Featured = () => {
    return (
        <div className='bg-base-200'>
            <div className='max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16'>
                {/* section title */}
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Available <span className="text-cyan-800">Study Rooms</span>
                    </h2>
                    <p className="text-slate-500 mt-2 text-sm md:text-base">
                        Explore and book our handpicked premium spaces for your next productive session.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    <RoomCard />
                   
                </div>


            </div>
        </div>
    );
};

export default Featured;