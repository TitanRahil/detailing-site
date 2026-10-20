import { useState, useEffect } from "react";
import { useBrand } from "../context/BrandContext";
import { EstimatorResult } from "./DetailingEstimator";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    prefill?: EstimatorResult | null;
}

export default function BookingModal({ isOpen, onClose, prefill }: Props) {
    const brand = useBrand();
    const [submitted, setSubmitted] = useState(false);
    const [bookingRef, setBookingRef] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "2024",
        paintColor: "",
        paintCondition: "light-swirls",
        preferredDate: "",
        notes: "",
    });

    useEffect(() => {
        if (!isOpen) {
            setSubmitted(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const refId = "DET-" + Math.floor(100000 + Math.random() * 900000);
        setBookingRef(refId);
        setSubmitted(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-[#090514] border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(124,58,237,0.35)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-sm font-mono"
                >
                    ESC ✕
                </button>

                {!submitted ? (
                    <div>
                        <div className="mb-6">
                            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold block mb-1">
                                Cleanroom Reservation // {brand.shortName}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                                Book Paint Evaluation
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm mt-1">
                                Reserve your vehicle&apos;s cleanroom intake slot at our {brand.city} facility.
                            </p>
                        </div>

                        {/* Selected Package Banner if prefilled */}
                        {prefill && (
                            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 mb-6 flex flex-wrap justify-between items-center gap-3">
                                <div>
                                    <div className="text-white font-bold text-xs sm:text-sm">
                                        {prefill.vehicleClass} &bull; {prefill.packageTier}
                                    </div>
                                    <div className="text-purple-300 font-mono text-[10px] mt-0.5">
                                        {prefill.addons.length > 0 ? prefill.addons.join(", ") : "Core Treatment"}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-white font-mono font-bold text-base">
                                        ${prefill.totalPrice.toLocaleString()}
                                    </span>
                                    <span className="text-gray-400 font-mono text-[10px] block">
                                        ~{prefill.days} Days Bay Time
                                    </span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                                        Client Full Name *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Alexander Vance"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="alex@vance.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                                        Phone / Mobile *
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+1 (555) 019-2834"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                                        Vehicle Make &amp; Model *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Porsche 911 GT3 RS"
                                        value={form.vehicleMake}
                                        onChange={(e) => setForm({ ...form, vehicleMake: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                                        Year &amp; Paint Color *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="2024 / Shark Blue"
                                        value={form.paintColor}
                                        onChange={(e) => setForm({ ...form, paintColor: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                                        Current Paint Condition
                                    </label>
                                    <select
                                        value={form.paintCondition}
                                        onChange={(e) => setForm({ ...form, paintCondition: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                                    >
                                        <option value="brand-new">Brand New Delivery (Under 500 miles)</option>
                                        <option value="light-swirls">Light Swirls &amp; Wash Marring</option>
                                        <option value="moderate-defects">Moderate Scratches &amp; Acid Etchings</option>
                                        <option value="heavy-restoration">Heavy Oxidation &amp; Needs Full Revival</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                                        Requested Drop-Off Date
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        value={form.preferredDate}
                                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                                    Special Directives / Sensitive Areas
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Exposed carbon weave on front splitter, ceramic matrix requested on wheels, etc."
                                    value={form.notes}
                                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs tracking-widest uppercase font-bold transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer mt-4"
                            >
                                Submit Cleanroom Bay Reservation &rarr;
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="py-10 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center text-2xl font-bold">
                            ✓
                        </div>
                        <span className="text-purple-400 font-mono text-xs tracking-widest uppercase font-bold block">
                            RESERVATION DISPATCHED
                        </span>
                        <h3 className="text-2xl font-black text-white">
                            Intake Slot Reserved // {bookingRef}
                        </h3>
                        <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                            Thank you, <span className="text-white font-bold">{form.name}</span>. The {brand.shortName} lead technician has received your inquiry for your <span className="text-white font-bold">{form.vehicleMake}</span>. A confirmation dossier has been sent to <span className="text-purple-300">{form.email}</span>.
                        </p>
                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider uppercase font-bold transition-all cursor-pointer"
                            >
                                Return to Studio
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
