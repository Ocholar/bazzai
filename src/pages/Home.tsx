import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import React from "react";
import { Zap, Wifi, HeadphonesIcon, CheckCircle, ArrowRight, Phone, Mail, MapPin, MessageCircle, ChevronDown, Star, Facebook, Instagram, Linkedin } from "lucide-react";
import { getLoginUrl } from "@/const";
import { motion, AnimatePresence } from "framer-motion";

import { MetaTags } from "@/components/MetaTags";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    connectionType: "",
    message: ""
  });

  // SEO Meta Tags
  const metaTags = (
    <MetaTags
      title="Bazztech Networks | High-Speed Internet Solutions in Kenya"
      description="Experience ultra-reliable 5G and Fiber internet in Kenya. Zero lag, unlimited possibilities, and 24/7 support."
      ogUrl="https://bazztech.co.ke/"
      ogType="website"
      ogTitle="Bazztech Networks | High-Speed Internet Solutions"
      ogDescription="Experience ultra-reliable 5G and Fiber internet in Kenya. Zero lag, unlimited possibilities, and 24/7 support."
      ogImage="https://bazztech.co.ke/logo.png"
      ogImageAlt="Bazztech Networks Logo"
      twitterCard="summary_large_image"
      twitterTitle="Bazztech Networks | High-Speed Internet Solutions"
      twitterDescription="Experience ultra-reliable 5G and Fiber internet in Kenya. Zero lag, unlimited possibilities, and 24/8 support."
      twitterImage="https://bazztech.co.ke/logo.png"
      fbAppId="1940970193127549"
      fbDomainVerification="3tq86nngcf4dgn4ms1uctldl1hz0mq"
    />
  );

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      toast.success("Thank you! We'll contact you within 24 hours.");
      setFormData({ name: "", phone: "", email: "", location: "", connectionType: "", message: "" });
    },
    onError: (error) => {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.location || !formData.connectionType) {
      toast.error("Please fill in all required fields");
      return;
    }

    createLead.mutate({
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      source: "website",
      tag: "high_value",
      connectionType: formData.connectionType,
      installationTown: formData.location,
      deliveryLocation: formData.message || undefined,
      status: "new"
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-900">
      {metaTags}
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg shadow-red-600/20 flex items-center justify-center transform hover:scale-105 transition-transform">
                <Wifi className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Bazztech<span className="text-red-600">Networks</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['Products', 'Features', 'Testimonials'].map((item) => (
                <button
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full" />
                </button>
              ))}
              <button onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full" />
              </button>
              <a
                href={getLoginUrl()}
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Agent Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-50/50 via-white to-slate-50 -z-10" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-red-100/40 to-transparent rounded-full blur-3xl -z-10"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-3xl -z-10"
        />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-red-100 rounded-full shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-sm font-semibold text-slate-700">
                  Powered by Airtel Kenya 5G
                </span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Internet that <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  moves as fast
                </span> <br />
                as you do.
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Experience the future of connectivity with ultra-reliable 5G and Fiber.
                Zero lag, unlimited possibilities, and support that actually cares.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white text-lg rounded-full shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 transition-all hover:-translate-y-1 group"
                >
                  Check Coverage
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  className="h-14 px-8 border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 text-lg rounded-full transition-all"
                >
                  View Plans
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-slate-100">
                <div>
                  <p className="text-3xl font-bold text-slate-900">10k+</p>
                  <p className="text-sm text-slate-500">Happy Customers</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">99.9%</p>
                  <p className="text-sm text-slate-500">Uptime Guarantee</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">24/7</p>
                  <p className="text-sm text-slate-500">Local Support</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl -z-10"></div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -right-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Wifi className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Speed</p>
                    <p className="font-bold text-slate-900">100 Mbps</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Status</p>
                    <p className="font-bold text-slate-900">Connected</p>
                  </div>
                </motion.div>

                {/* Main Visual - Animated Network */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-orange-600 relative group shadow-2xl">
                  {/* Animated network nodes */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
                    {/* Connection lines with animation */}
                    <motion.line
                      x1="80" y1="80" x2="200" y2="150"
                      stroke="white" strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.line
                      x1="200" y1="150" x2="320" y2="100"
                      stroke="white" strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1.5, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.line
                      x1="200" y1="150" x2="180" y2="280"
                      stroke="white" strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1.5, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.line
                      x1="320" y1="100" x2="300" y2="300"
                      stroke="white" strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1.5, delay: 0.9, repeat: Infinity, repeatType: "reverse" }}
                    />

                    {/* Pulsing nodes */}
                    <motion.circle
                      cx="80" cy="80" r="8"
                      fill="white"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle
                      cx="200" cy="150" r="12"
                      fill="white"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <motion.circle
                      cx="320" cy="100" r="8"
                      fill="white"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2.2, delay: 0.5, repeat: Infinity }}
                    />
                    <motion.circle
                      cx="180" cy="280" r="10"
                      fill="white"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 2.3, delay: 0.8, repeat: Infinity }}
                    />
                    <motion.circle
                      cx="300" cy="300" r="8"
                      fill="white"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2.1, delay: 1, repeat: Infinity }}
                    />
                  </svg>

                  {/* Center WiFi icon with pulse effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="text-white/30">
                        <Wifi size={160} strokeWidth={1.5} />
                      </div>
                      {/* Pulse rings */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-white/20"
                        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-white/20"
                        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        transition={{ duration: 2, delay: 1, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  {/* Text overlay */}
                  <div className="absolute bottom-8 left-8 text-white z-10">
                    <motion.p
                      className="font-bold text-2xl mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Enterprise Grade
                    </motion.p>
                    <motion.p
                      className="text-white/90 text-base"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Connectivity Solutions
                    </motion.p>
                  </div>

                  {/* Speed indicator badge */}
                  <motion.div
                    className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <p className="text-white font-bold text-sm">5G Ready</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Perfect Plan</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Whether you need high-speed fiber for your home or reliable 5G for your business, we have a plan for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "5G ODU",
                desc: "Outdoor Unit for maximum signal strength",
                speed: "Up to 100 Mbps",
                color: "red",
                features: ["High Gain Antenna", "Weather Resistant", "Professional Install", "Best for Rural Areas"],
                popular: true
              },
              {
                title: "5G IPLU",
                desc: "Indoor Unit for plug-and-play simplicity",
                speed: "Up to 100 Mbps",
                color: "blue",
                features: ["Self Installation", "Portable", "Instant Activation", "Best for Apartments"]
              },
              {
                title: "FTTX Fiber",
                desc: "Ultra-fast fiber optic connection",
                speed: "Up to 1 Gbps",
                color: "green",
                features: ["Lowest Latency", "Unlimited Data", "Symmetric Speeds", "Best for Gaming"]
              },
              {
                title: "SmartNET",
                desc: "Reliable 4G backup solution",
                speed: "Up to 40 Mbps",
                color: "purple",
                features: ["Cost Effective", "Wide Coverage", "Quick Setup", "Best for Light Use"]
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className={`p-6 h-full border-2 hover:border-${product.color}-500 transition-all duration-300 relative overflow-hidden group`}>
                  {product.popular && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-${product.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Wifi className={`text-${product.color}-600`} size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{product.title}</h3>
                  <p className="text-slate-600 mb-4 h-12">{product.desc}</p>
                  <div className="text-3xl font-bold text-slate-900 mb-6">{product.speed}</div>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle size={16} className={`text-${product.color}-500`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full bg-slate-900 hover:bg-${product.color}-600 text-white transition-colors`}>
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Experience speeds up to 1Gbps with our state-of-the-art fiber and 5G network infrastructure.",
                color: "red"
              },
              {
                icon: Wifi,
                title: "Unlimited Data",
                desc: "Stream, game, and download as much as you want. No caps, no throttling, just pure speed.",
                color: "blue"
              },
              {
                icon: HeadphonesIcon,
                title: "24/7 Support",
                desc: "Our local support team is always ready to help you with any issues, day or night.",
                color: "green"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto bg-${feature.color}-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-${feature.color}-100`}>
                  <feature.icon className={`text-${feature.color}-600`} size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by Businesses</h2>
            <p className="text-xl text-slate-600">See what our customers have to say about us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah K.",
                role: "Operations Manager",
                company: "TechHub Nairobi",
                content: "The 5G ODU solution transformed our remote office connectivity. Speeds are consistent and the installation was professional.",
                rating: 5
              },
              {
                name: "David M.",
                role: "Freelance Designer",
                company: "Creative Studio",
                content: "Best internet service I've used in Kenya. The SmartNET backup saved me during a critical deadline when power went out.",
                rating: 5
              },
              {
                name: "Grace W.",
                role: "Director",
                company: "EduCare Systems",
                content: "We switched to Bazztech's FTTX Fiber and haven't looked back. The uptime is fantastic and support is actually responsive.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow bg-white border-slate-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={`${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`} />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{testimonial.name}</p>
                      <p className="text-xs text-slate-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How long does installation take?", a: "For 5G ODU/IPLU, installation is typically completed within 24-48 hours. Fiber installations may take 3-5 business days depending on the location." },
              { q: "Is there an installation fee?", a: "Installation is free for most of our standard plans. Some specialized business setups might incur a small one-time fee." },
              { q: "Can I upgrade my plan later?", a: "Absolutely! You can upgrade your speed or data package at any time through our portal or by contacting support." },
              { q: "What areas do you cover?", a: "We cover most major towns and cities in Kenya including Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret. Use the 'Check Coverage' button to verify your specific location." }
            ].map((item, index) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-slate-200 rounded-xl overflow-hidden hover:border-red-200 transition-colors bg-white"
                >
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-red-600 transition-colors">{item.q}</h3>
                    <ChevronDown
                      className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      size={20}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-slate-600 border-t border-slate-50 pt-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Get Connected Today</h2>
            <p className="text-xl text-slate-600">Fill out the form and we'll contact you within 24 hours</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 md:p-12 shadow-2xl border-0 bg-white/80 backdrop-blur-lg rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base font-medium text-slate-700">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="h-12 bg-slate-50 border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base font-medium text-slate-700">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0712345678"
                      required
                      className="h-12 bg-slate-50 border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-medium text-slate-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="h-12 bg-slate-50 border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-base font-medium text-slate-700">Location/Town *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Nairobi"
                      required
                      className="h-12 bg-slate-50 border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="connectionType" className="text-base font-medium text-slate-700">Preferred Connection *</Label>
                    <Select
                      value={formData.connectionType}
                      onValueChange={(value: string) => setFormData({ ...formData, connectionType: value })}
                      required
                    >
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all">
                        <SelectValue placeholder="Select connection type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SmartConnect (5G ODU)">5G ODU (Outdoor)</SelectItem>
                        <SelectItem value="SmartConnect (5G IPLU)">5G IPLU (Indoor)</SelectItem>
                        <SelectItem value="SmartConnect (FTTX)">FTTX Fiber</SelectItem>
                        <SelectItem value="SmartNET ODU">SmartNET (4G)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-base font-medium text-slate-700">Additional Information</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your specific needs or provide your exact address..."
                    rows={4}
                    className="bg-slate-50 border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg rounded-xl shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 transition-all hover:-translate-y-1"
                  disabled={createLead.isPending}
                >
                  {createLead.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                  <Wifi className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tight">Bazztech<span className="text-red-500">Networks</span></span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md mb-6 text-sm">
                Your trusted partner for high-speed internet solutions in Kenya.
                We provide reliable, fast, and affordable connectivity.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/bazztechnetworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/BazztechNetworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/99906757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-200">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-red-500 transition-colors">Products</button></li>
                <li><button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-red-500 transition-colors">Features</button></li>
                <li><button onClick={() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-red-500 transition-colors">Testimonials</button></li>
                <li><button onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-red-500 transition-colors">Contact</button></li>
                <li><a href={getLoginUrl()} className="hover:text-red-500 transition-colors">Agent Login</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-200">Legal</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="/privacy-policy" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
                <li><a href="/user-data-deletion-policy" className="hover:text-red-500 transition-colors">Data Deletion</a></li>
                <li><a href="/terms-of-service" className="hover:text-red-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-200">Contact Us</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                    <Phone size={16} />
                  </div>
                  <span>+254 103 339197</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                    <Mail size={16} />
                  </div>
                  <span>info@bazztech.co.ke</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                    <MapPin size={16} />
                  </div>
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© 2025 Bazztech Networks. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <span className="font-bold text-slate-300">Airtel Kenya</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <motion.a
        href="https://wa.me/254103339197"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:shadow-green-500/30 transition-shadow"
      >
        <MessageCircle size={32} fill="white" className="text-white" />
      </motion.a>
    </div>
  );
}
