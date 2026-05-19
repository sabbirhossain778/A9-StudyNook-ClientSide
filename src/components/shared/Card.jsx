import Image from 'next/image';

const RoomCard = () => {
    return (
        <div className="card bg-base-100 border border-base-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* ইমেজ কন্টেইনার (w-full, relative এবং h-52 দেওয়া হয়েছে fill পারফেক্টলি কাজ করার জন্য) */}
            <figure className="relative w-full h-46 overflow-hidden bg-slate-100">
                <Image
                    src="/library.jpeg"
                    alt="Premium Study Room"
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                />
            </figure>

            {/* card body */}
            <div className="card-body p-6">
                <div className="flex items-start">
                    <h3 className="card-title text-xl font-bold text-slate-800 hover:text-cyan-800 transition-colors cursor-pointer">
                        Premium Quiet Zone
                    </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    A fully air-conditioned, soundproof private workspace tailored for full-stack developers and research groups. High-speed Wi-Fi included.
                </p>

                {/* price and btn */}
                <div className="card-actions justify-between items-center mt-6 pt-4 border-t border-slate-100">
                    <div>
                        <span className="text-xs text-slate-400 block uppercase font-semibold">Hourly Rate</span>
                        <span className="text-lg font-extrabold text-cyan-800">$15<span className="text-xs font-medium text-slate-500">/hr</span></span>
                    </div>
                    <button className="btn bg-cyan-800 hover:bg-cyan-900 text-white border-none rounded-xl px-5 shadow-md font-bold transition-all normal-case btn-sm h-10">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;