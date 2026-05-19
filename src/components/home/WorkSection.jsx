import React from 'react';

const WorkSection = () => {
    return (
        <section className="bg-slate-50 py-16 px-4 md:px-8 border-t border-b border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">How It <span className="text-cyan-800">Works</span></h2>
                    <p className="text-slate-500 mt-2">Get your perfect study slot in just three simple steps.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {/* Step 1 */}
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-cyan-800/10 text-cyan-800 font-bold rounded-full flex items-center justify-center mx-auto text-xl mb-4">1</div>
                        <h3 className="font-bold text-lg text-slate-800">Explore Rooms</h3>
                        <p className="text-sm text-slate-500 mt-2">Browse our wide range of soundproof and high-speed internet equipped spaces.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-cyan-800/10 text-cyan-800 font-bold rounded-full flex items-center justify-center mx-auto text-xl mb-4">2</div>
                        <h3 className="font-bold text-lg text-slate-800">Select Slot</h3>
                        <p className="text-sm text-slate-500 mt-2">Choose your preferred date and duration that matches your study schedule.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-cyan-800/10 text-cyan-800 font-bold rounded-full flex items-center justify-center mx-auto text-xl mb-4">3</div>
                        <h3 className="font-bold text-lg text-slate-800">Confirm Booking</h3>
                        <p className="text-sm text-slate-500 mt-2">Make a secure payment through Better-Auth and get instant confirmation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkSection;