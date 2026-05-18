import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900 container mx-auto">

            {/* bg */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/library3.jpg"
                    alt="StudyNook Library Banner"
                    fill
                    priority
                    className="object-cover object-center transform scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/90 via-slate-900/80 to-cyan-950/60 z-10"></div>
            </div>

            {/* content section */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center md:text-left w-full flex flex-col md:flex-row items-center gap-10">

                {/* left side */}
                <div className="w-full md:w-2/3 space-y-6">
                    <span className="inline-block bg-yellow-500/20 text-yellow-400 font-bold px-4 py-1.5 rounded-full text-xs md:text-sm tracking-wider uppercase backdrop-blur-sm border border-yellow-500/30">
                        Welcome to StudyNook
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                        Find Your <br />
                        <span className="text-yellow-400">Perfect Study Room</span>
                    </h1>

                    <p className="text-base md:text-lg text-slate-200 max-w-xl leading-relaxed">
                        Discover the perfect premium workspace designed to boost your concentration, group study sessions, and development bootcamps. Your focus, our space.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                        <Link href="/all-rooms">
                            <button className="w-full sm:w-auto bg-yellow-500 text-slate-950 px-8 py-3.5 text-base font-bold rounded-xl shadow-lg shadow-yellow-500/20 hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95">
                                Explore Rooms &rarr;
                            </button>
                        </Link>

                        <Link href="/add-room">
                            <button className="w-full sm:w-auto bg-white/10 text-white border border-white/20 backdrop-blur-md px-8 py-3.5 text-base font-semibold rounded-xl hover:bg-white/20 transition-all">
                                List Your Room
                            </button>
                        </Link>
                    </div>
                </div>

                {/* right side */}
                <div className="w-full md:w-1/3 hidden lg:flex justify-end">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl max-w-xs text-white space-y-4 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">⚡</span>
                            <div>
                                <h4 className="font-bold text-sm">Instant Booking</h4>
                                <p className="text-xs text-slate-300">Secure your desk in seconds.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🌐</span>
                            <div>
                                <h4 className="font-bold text-sm">High-Speed Wi-Fi</h4>
                                <p className="text-xs text-slate-300">Optimum speed for developers.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Banner;