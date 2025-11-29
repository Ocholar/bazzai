import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import { Zap, Wifi, HeadphonesIcon, CheckCircle, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    connectionType: "",
    message: ""
  });

  // Set SEO Title
  useState(() => {
    document.title = "Bazztech Networks | High-Speed Internet Solutions in Kenya";
  });

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

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <Wifi className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900">Bazztech Networks</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} className="text-slate-600 hover:text-red-600 transition-colors">Products</button>
              <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="text-slate-600 hover:text-red-600 transition-colors">Features</button>
              <button onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })} className="text-slate-600 hover:text-red-600 transition-colors">Contact</button>
              <a href={getLoginUrl()} className="text-sm text-slate-600 hover:text-red-600 transition-colors">Agent Login</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-slate-50 -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  Powered by Airtel Kenya
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                High-Speed Internet for Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">
                  Business & Home
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Experience lightning-fast 5G and Fiber connectivity with unlimited data options.
                Free installation, reliable support, and competitive pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
                >
                  Check Coverage
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  size="lg"
                  variant="outline"
                  className="border-slate-300 px-8 py-6 text-lg"
                >
                  View Plans
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="text-green-600" size={24} />
                    <div>
                      <p className="font-semibold text-slate-900">Free Installation</p>
                      <p className="text-sm text-slate-600">No hidden costs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <Zap className="text-blue-600" size={24} />
                    <div>
                      <p className="font-semibold text-slate-900">Lightning Fast</p>
                      <p className="text-sm text-slate-600">Up to 100 Mbps</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <HeadphonesIcon className="text-purple-600" size={24} />
                    <div>
                      <p className="font-semibold text-slate-900">24/7 Support</p>
                      <p className="text-sm text-slate-600">Always here to help</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Connection</h2>
            <p className="text-xl text-slate-600">Flexible plans for every need and budget</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 5G ODU */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-red-200">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Wifi className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">5G ODU</h3>
                <p className="text-sm text-slate-600">Outdoor unit for quick installation</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-3xl font-bold text-slate-900">
                    KES 1,999<span className="text-base font-normal text-slate-600">/mo</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Starting from</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    15-40 Mbps options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Unlimited plans available
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Quick outdoor setup
                  </li>
                </ul>
              </div>
            </Card>

            {/* 5G IPLU */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-red-200">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Wifi className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">5G IPLU</h3>
                <p className="text-sm text-slate-600">Indoor unit for office setups</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-3xl font-bold text-slate-900">
                    KES 3,500<span className="text-base font-normal text-slate-600">/mo</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Starting from</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    10-50 Mbps speeds
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Perfect for offices
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Indoor installation
                  </li>
                </ul>
              </div>
            </Card>

            {/* FTTX Fiber */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-red-500 relative">
              <div className="absolute -top-3 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                POPULAR
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">FTTX Fiber</h3>
                <p className="text-sm text-slate-600">Best reliability for businesses</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-3xl font-bold text-slate-900">
                    KES 2,500<span className="text-base font-normal text-slate-600">/mo</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Starting from</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    10-100 Mbps speeds
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Ultra-reliable fiber
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Business-grade SLA
                  </li>
                </ul>
              </div>
            </Card>

            {/* SmartNET */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-red-200">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Wifi className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">SmartNET</h3>
                <p className="text-sm text-slate-600">4G LTE budget option</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-3xl font-bold text-slate-900">
                    KES 2,999<span className="text-base font-normal text-slate-600">/mo</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Starting from</p>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    180GB-960GB bundles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Daily data bonuses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    Budget-friendly
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Lightning Fast</h3>
              <p className="text-slate-600">
                Experience speeds up to 100 Mbps with our fiber and 5G connections. Perfect for streaming, gaming, and business.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Wifi className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Unlimited Data</h3>
              <p className="text-slate-600">
                Choose from unlimited plans or generous data bundles. No more worrying about running out of data.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <HeadphonesIcon className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">24/7 Support</h3>
              <p className="text-slate-600">
                Our dedicated support team is always ready to help. Free installation and ongoing technical assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Get Connected Today</h2>
            <p className="text-xl text-slate-600">Fill out the form and we'll contact you within 24 hours</p>
          </div>

          <Card className="p-8 shadow-2xl border-t-4 border-red-600">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0712345678"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location/Town *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Nairobi"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="connectionType">Preferred Connection *</Label>
                  <Select
                    value={formData.connectionType}
                    onValueChange={(value) => setFormData({ ...formData, connectionType: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select connection type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SmartConnect (5G ODU)">5G ODU</SelectItem>
                      <SelectItem value="SmartConnect (5G IPLU)">5G IPLU</SelectItem>
                      <SelectItem value="SmartConnect (FTTX)">FTTX Fiber</SelectItem>
                      <SelectItem value="SmartNET ODU">SmartNET (4G)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your specific needs or provide your exact address..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                disabled={createLead.isPending}
              >
                {createLead.isPending ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Wifi className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold">Bazztech Networks</span>
              </div>
              <p className="text-slate-400">
                Your trusted partner for high-speed internet solutions in Kenya.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#contact-form" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href={getLoginUrl()} className="hover:text-white transition-colors">Agent Login</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+254 781 751 937</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>info@bazztech.co.ke</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>© 2025 Bazztech Networks. All rights reserved. Powered by Airtel Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
