import React, { useEffect } from "react";
import { ArrowRight, CheckCircle, Clock, TrendingUp, Zap, Calendar, ExternalLink, Code2, Settings, BarChart3 } from "lucide-react";

const Portfolio = () => {
    useEffect(() => {
        // Scroll to the hero section after mount and after a short delay
        const scrollToHero = () => {
            const hero = document.getElementById('hero');
            if (hero) {
                hero.scrollIntoView({ behavior: 'auto', block: 'start' });
            } else {
                window.scrollTo(0, 0);
            }
        };
        scrollToHero();
        setTimeout(scrollToHero, 100);
        setTimeout(scrollToHero, 300);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-xl font-bold text-white">Reagan Ochola</div>
                    <a
                        href="https://calendly.com/reaochola"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition flex items-center gap-2"
                    >
                        <Calendar className="w-4 h-4" />
                        Book Free Audit
                    </a>
                </div>
            </nav>

            {/* HERO SECTION - ROI FOCUSED */}
            <section id="hero" className="relative min-h-screen flex items-center px-6 pt-20 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-8">
                            <Zap className="w-4 h-4" />
                            AI Automation & Workflow Optimization
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Turn Your Manual Workflows Into{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                24/7 Digital Workers
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 mb-8 leading-relaxed">
                            I build AI-powered automation systems that buy back your time, respond to leads in under 1 minute,
                            and scale your operations without hiring.
                        </p>

                        <div className="flex flex-wrap gap-8 mb-12">
                            <div className="flex items-start gap-3">
                                <Clock className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                <div>
                                    <div className="font-bold text-white">40% More Leads</div>
                                    <div className="text-slate-400 text-sm">24/7 automated qualification</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <TrendingUp className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                <div>
                                    <div className="font-bold text-white">&lt;1 Min Response</div>
                                    <div className="text-slate-400 text-sm">Instant lead engagement</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                                <div>
                                    <div className="font-bold text-white">Zero Downtime</div>
                                    <div className="text-slate-400 text-sm">Managed 24/7 operations</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://calendly.com/reaochola"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-bold text-lg transition flex items-center gap-2"
                            >
                                Book Free Efficiency Audit
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="#proof"
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-bold text-lg transition"
                            >
                                See Proof of Concept
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROOF SECTION - Bazztech Case Study */}
            <section id="proof" className="py-24 px-6 bg-slate-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-4">
                            Live Proof of Concept
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            The Bazztech Networks System
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            A 24/7 WhatsApp AI Agent that generates, qualifies, and submits leads automatically—
                            with weekly optimization to continuously improve performance.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <h3 className="text-3xl font-bold mb-6">How It Works</h3>

                            <div className="grid md:grid-cols-3 gap-8 mb-12">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border-2 border-cyan-500 flex items-center justify-center text-xl font-bold text-cyan-400 mb-4">
                                        1
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">Lead Capture</h4>
                                    <p className="text-slate-400">
                                        Prospects message via WhatsApp 24/7. Every inquiry is captured instantly, no matter the time.
                                    </p>
                                </div>

                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border-2 border-cyan-500 flex items-center justify-center text-xl font-bold text-cyan-400 mb-4">
                                        2
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">AI Qualification</h4>
                                    <p className="text-slate-400">
                                        Custom GPT agent asks qualifying questions, assesses intent, and categorizes leads by priority in real-time.
                                    </p>
                                </div>

                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border-2 border-cyan-500 flex items-center justify-center text-xl font-bold text-cyan-400 mb-4">
                                        3
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">Auto-Submit & Follow-Up</h4>
                                    <p className="text-slate-400">
                                        Qualified leads are submitted to CRM, sales team notified, and follow-ups orchestrated automatically.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-950/50 rounded-xl p-8 mb-8">
                                <h4 className="text-2xl font-bold mb-6">Results</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-green-400 mb-2">40%</div>
                                        <div className="text-slate-400 text-sm">Increase in Leads</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                                        <div className="text-slate-400 text-sm">System Uptime</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-yellow-400 mb-2">&lt;1min</div>
                                        <div className="text-slate-400 text-sm">Response Time</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-purple-400 mb-2">Weekly</div>
                                        <div className="text-slate-400 text-sm">AI Optimization</div>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://bazztech.co.ke"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition"
                            >
                                View Live System
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES - The Retainer Model */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            How We Work Together
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            A proven 3-phase approach: Audit your bottlenecks, build custom automation,
                            then scale with managed operations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Phase 1: The Audit */}
                        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 hover:border-cyan-500/50 transition">
                            <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                                <BarChart3 className="w-7 h-7 text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Phase 1: The Audit</h3>
                            <p className="text-slate-400 mb-6">
                                I map your current workflows, identify bottlenecks costing you time and money,
                                and quantify ROI opportunities.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>Workflow documentation</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>Bottleneck analysis</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>ROI projections</span>
                                </li>
                            </ul>
                        </div>

                        {/* Phase 2: The Build */}
                        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 hover:border-cyan-500/50 transition">
                            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                                <Code2 className="w-7 h-7 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Phase 2: The Build</h3>
                            <p className="text-slate-400 mb-6">
                                Custom n8n workflows, API integrations, and AI agents tailored to your exact needs.
                                No templates—built for your business.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>Custom n8n workflows</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>API integrations</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>CRM synchronization</span>
                                </li>
                            </ul>
                        </div>

                        {/* Phase 3: Managed Ops */}
                        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 hover:border-cyan-500/50 transition">
                            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">
                                <Settings className="w-7 h-7 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Phase 3: Managed Ops</h3>
                            <p className="text-slate-400 mb-6">
                                24/7 monitoring, weekly AI prompt tuning, system scaling, and continuous optimization
                                to keep your automation running at peak performance.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>24/7 monitoring & support</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>Weekly AI optimization</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>System scaling & updates</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNICAL AUTHORITY - The Logic Behind the Magic */}
            <section className="py-24 px-6 bg-slate-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            The Logic Behind the Magic
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            Expert-level technical skills that power your automation systems.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "n8n Workflows", desc: "Advanced workflow automation" },
                            { name: "HTTP/REST APIs", desc: "Custom API integrations" },
                            { name: "JSON Parsing", desc: "Complex data transformation" },
                            { name: "JavaScript Nodes", desc: "Custom code execution" },
                            { name: "Python Scripts", desc: "Advanced data processing" },
                            { name: "OpenAI API", desc: "GPT-powered AI agents" },
                            { name: "WhatsApp Business", desc: "Real-time messaging" },
                            { name: "Database Sync", desc: "PostgreSQL, MongoDB" },
                        ].map((tech, i) => (
                            <div key={i} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition">
                                <div className="font-bold text-white mb-2">{tech.name}</div>
                                <div className="text-sm text-slate-400">{tech.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Automate Your Workflows?
                    </h2>
                    <p className="text-xl text-slate-400 mb-12">
                        Book a free 45-minute efficiency audit. I'll analyze your current processes
                        and show you exactly where automation can save you time and money.
                    </p>
                    <a
                        href="https://calendly.com/reaochola"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-bold text-lg transition"
                    >
                        <Calendar className="w-6 h-6" />
                        Book Free Efficiency Audit
                        <ArrowRight className="w-5 h-5" />
                    </a>

                    <div className="mt-12 pt-12 border-t border-slate-800">
                        <p className="text-slate-500 text-sm">
                            Reagan Ochola • AI Automation & Workflow Optimization Specialist • reagan@bazztech.co.ke
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Portfolio;
