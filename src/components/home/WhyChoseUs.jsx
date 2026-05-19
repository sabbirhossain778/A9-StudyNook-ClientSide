import React from 'react';

const WhyChoseUs = () => {
    return (
        < section className = "py-16 px-4 md:px-8 max-w-7xl mx-auto" >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="text-cyan-800 font-bold text-sm uppercase tracking-wider">Premium Workspaces</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Why StudyNook is Loved by Hundreds of Students</h2>
                    <p className="text-slate-500 mt-4 leading-relaxed">We provide more than just a room. We create an environment where your concentration meets premium comfort, ensuring maximum productivity.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 border border-slate-200 rounded-xl hover:border-cyan-800 transition-colors">
                        <span className="text-3xl">🤫</span>
                        <h3 className="font-bold text-slate-800 mt-3">100% Soundproof</h3>
                        <p className="text-xs text-slate-500 mt-1">Zero distractions. Total focus on your studies or coding bootcamps.</p>
                    </div>
                    <div className="p-5 border border-slate-200 rounded-xl hover:border-cyan-800 transition-colors">
                        <span className="text-3xl">🚀</span>
                        <h3 className="font-bold text-slate-800 mt-3">Gigabit Wi-Fi</h3>
                        <p className="text-xs text-slate-500 mt-1">Ultra-fast internet connection optimized for full-stack developers.</p>
                    </div>
                    <div className="p-5 border border-slate-200 rounded-xl hover:border-cyan-800 transition-colors">
                        <span className="text-3xl">☕</span>
                        <h3 className="font-bold text-slate-800 mt-3">Complimentary Coffee</h3>
                        <p className="text-xs text-slate-500 mt-1">Unlimited filter coffee and snacks to keep your energy high all day.</p>
                    </div>
                    <div className="p-5 border border-slate-200 rounded-xl hover:border-cyan-800 transition-colors">
                        <span className="text-3xl">🔒</span>
                        <h3 className="font-bold text-slate-800 mt-3">Secure Spaces</h3>
                        <p className="text-xs text-slate-500 mt-1">CCTV monitored corridors and biometric lock system for security.</p>
                    </div>
                </div>
            </div>
</section >
    );
};

export default WhyChoseUs;