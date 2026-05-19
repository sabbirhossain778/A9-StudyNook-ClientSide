import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content pt-16 pb-8 px-4 md:px-8 border-t border-base-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* logo */}
                <div className="space-y-4">
                    <Link href="/" className="text-2xl font-bold tracking-wide text-white">
                        Study<span className="text-yellow-500">Nook</span>
                    </Link>
                    <p className="text-sm text-gray-400 leading-relaxed pt-2">
                        Discover the perfect premium workspace designed to boost your concentration, group study sessions, and development bootcamps. Your focus, our space.
                    </p>

                    {/* social links */}
                    <div className="pt-2">
                        <ul className="wrapper !justify-start !h-auto !pt-0">
                            {/* Facebook */}
                            <Link target="_blank" href="https://www.facebook.com/share/14ZXerZM1bz/">
                                <li className="icon facebook text-neutral">
                                    <span className="tooltip">Facebook</span>
                                    <FaFacebook size={22} />
                                </li>
                            </Link>

                            {/* LinkedIn */}
                            <Link target="_blank" href="https://www.linkedin.com/in/md-sabbir-hossain-dev">
                                <li className="icon linkedin text-neutral">
                                    <span className="tooltip">LinkedIn</span>
                                    <FaLinkedin size={22} />
                                </li>
                            </Link>

                            {/* GitHub */}
                            <Link target="_blank" href="https://github.com/sabbirhossain778">
                                <li className="icon github text-neutral">
                                    <span className="tooltip">GitHub</span>
                                    <FaGithub size={22} />
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>

                {/* quick links */}
                <div>
                    <h2 className="footer-title text-white opacity-100 font-semibold text-base mb-4 tracking-wider">Quick Links</h2>
                    <div className="flex flex-col space-y-3 text-sm text-gray-400">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link href="/all-rooms" className="hover:text-primary transition-colors">All Rooms</Link>
                        <Link href="/my-bookings" className="hover:text-primary transition-colors">My Bookings</Link>
                        <Link href="/add-room" className="hover:text-primary transition-colors">Add New Room</Link>
                    </div>
                </div>

                {/* contact */}
                <div>
                    <h2 className="footer-title text-white opacity-100 font-semibold text-base mb-4 tracking-wider">Contact Us</h2>
                    <div className="flex flex-col space-y-3 text-sm text-gray-400">
                        <p className="flex items-center gap-2">
                            <span className="text-primary">📍</span> Palash, Dhaka, Bangladesh
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-primary">📧</span> support@studynook.com
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-primary">📞</span> +880 13455-74904
                        </p>
                    </div>
                </div>

                {/* subscription */}
                <div>
                    <h2 className="footer-title text-white opacity-100 font-semibold text-base mb-4 tracking-wider">Newsletter</h2>
                    <p className="text-sm text-gray-400 mb-4">Subscribe to get special discounts and room updates.</p>
                    <div className="form-control w-full">
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="username@site.com"
                                className="input input-bordered w-full pr-16 bg-neutral-focus text-white border-gray-700 focus:border-primary text-sm rounded-lg"
                            />
                            <button className="btn btn-primary absolute top-0 right-0 rounded-l-none text-white font-medium btn-sm h-full px-4">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* copyright */}
            <div className="border-t border-gray-800 mt-12 pt-8 flex justify-center items-center max-w-7xl mx-auto">
                <p className="text-sm text-gray-500 text-center">
                    © {new Date().getFullYear()} <span className="font-semibold text-gray-400">StudyNook</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;