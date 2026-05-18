'use client'
import Link from 'next/link';
// import { DotLottiePlayer } from '@dotlottie/react-player';

const NotFound = () => {
    return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <div>
                <h2 className='text-6xl'>404</h2>
            </div>
            <Link href="/">
                <button className="mt-6 md:mt-8 px-6 py-2.5 md:px-10 md:py-3.5 bg-[#23ad77] text-white font-bold text-sm md:text-base rounded-xl hover:bg-[#1e9666] transition-all shadow-lg hover:scale-105 active:scale-95">
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

export default NotFound;