import React from "react";
import { Wifi, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

const LegalLayout = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                                    <Wifi className="text-white" size={20} />
                                </div>
                                <span className="text-lg font-bold text-slate-900 tracking-tight">
                                    Bazztech<span className="text-red-600">Networks</span>
                                </span>
                            </div>
                        </Link>
                        <Link href="/">
                            <button className="text-sm font-medium text-slate-600 hover:text-red-600 flex items-center gap-2 transition-colors">
                                <ArrowLeft size={16} />
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100">
                        {title}
                    </h1>
                    <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-red-600 hover:prose-a:text-red-700">
                        {children}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                <Wifi className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Bazztech<span className="text-red-500">Networks</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Your trusted partner for high-speed internet solutions in Kenya.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4 text-slate-200">Contact Us</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li className="flex items-center gap-2">
                                <Phone size={14} /> +254 103 339197
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={14} /> info@bazztech.co.ke
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={14} /> Nairobi, Kenya
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4 text-slate-200">Legal</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><Link href="/privacy-policy" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/user-data-deletion-policy" className="hover:text-red-500 transition-colors">User Data Deletion</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-red-500 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
                    © {new Date().getFullYear()} Bazztech Networks Limited. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LegalLayout;
