import { useState } from "react";
import { DetailingCategory } from "../data/detailingData";

interface Props {
    category: DetailingCategory | null;
    onClose: () => void;
    onInquire: (serviceName: string) => void;
}

export default function ServiceDetailModal({ category, onClose, onInquire }: Props) {
    const [selectedVarIndex, setSelectedVarIndex] = useState(0);

    if (!category) return null;

    const currentVar = category.variations[selectedVarIndex] || category.variations[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
            <div className="relative w-full max-w-4xl bg-[#090514] border border-white/15 rounded-2xl shadow-[0_0_60px_rgba(124,58,237,0.3)] overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-start bg-black/40">
                    <div>
                        <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold block mb-1">
                            {category.detail}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                            {category.name}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono transition-colors cursor-pointer"
                    >
                        ESC ✕
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
                    {/* Visual Showcase / Image Slot */}
                    <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 image-placeholder-box flex items-center justify-center">
                        <img
                            src={category.image}
                            alt={category.name}
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Fallback image placeholder guide */}
                        <div className="relative z-10 text-center p-6 max-w-md bg-black/70 backdrop-blur-md rounded-xl border border-white/10">
                            <span className="text-purple-400 font-mono text-[10px] uppercase tracking-widest font-bold block mb-1">
                                [ IMAGE SLOT: {category.image} ]
                            </span>
                            <p className="text-gray-300 text-xs font-mono">
                                {category.imagePlaceholderNotice}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold mb-2 text-purple-300">
                            Atelier Discipline Overview
                        </h4>
                        <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                            {category.description}
                        </p>
                    </div>

                    {/* Features & Specs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                        {/* Features */}
                        <div>
                            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold mb-3">
                                Precision Protocol Features
                            </h4>
                            <ul className="space-y-2">
                                {category.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                                        <span className="text-purple-400 font-bold">✓</span>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Specs Table */}
                        <div>
                            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold mb-3">
                                Technical Calibration Metrics
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {category.specs.map((spec, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/5">
                                        <span className="text-gray-400 text-[10px] font-mono block uppercase">
                                            {spec.label}
                                        </span>
                                        <span className="text-white font-mono text-xs font-bold mt-0.5 block">
                                            {spec.val}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Variations & Tiers */}
                    {category.variations.length > 0 && (
                        <div className="pt-4 border-t border-white/10">
                            <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold mb-3">
                                Available Treatment Variations
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                                {category.variations.map((v, idx) => (
                                    <button
                                        key={v.id}
                                        type="button"
                                        onClick={() => setSelectedVarIndex(idx)}
                                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                            selectedVarIndex === idx
                                                ? "bg-purple-950/40 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                                : "bg-black/40 border-white/10 hover:border-white/20"
                                        }`}
                                    >
                                        <div className="text-white font-bold text-xs sm:text-sm">{v.name}</div>
                                        <div className="text-purple-300 font-mono text-xs font-bold mt-1">{v.price}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Active Variation Card */}
                            {currentVar && (
                                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                                    <p className="text-gray-300 text-xs leading-relaxed mb-3">
                                        {currentVar.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-[11px] font-mono text-purple-300">
                                        {currentVar.specs.map((s, i) => (
                                            <span key={i} className="px-2.5 py-1 rounded bg-purple-950/40 border border-purple-500/20">
                                                {s.label}: <strong className="text-white">{s.val}</strong>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/40">
                    <span className="text-gray-400 font-mono text-xs">
                        Custom assessments available upon vehicle intake.
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            onInquire(category.name);
                        }}
                        className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs tracking-wider uppercase font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
                    >
                        Inquire With Lead Detailer &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
}
