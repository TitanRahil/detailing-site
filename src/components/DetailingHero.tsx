import { useState, useRef, useEffect, useCallback } from "react";
import { useBrand } from "../context/BrandContext";

export default function DetailingHero() {
    const brand = useBrand();
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
        setSliderPos(percent);
    }, []);

    const onMouseDown = () => setIsDragging(true);
    const onTouchStart = () => setIsDragging(true);

    useEffect(() => {
        const onMouseUp = () => setIsDragging(false);
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            handleMove(e.clientX);
        };
        const onTouchMove = (e: TouchEvent) => {
            if (!isDragging || !e.touches[0]) return;
            handleMove(e.touches[0].clientX);
        };

        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchend", onMouseUp);
        window.addEventListener("touchmove", onTouchMove);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchend", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [isDragging, handleMove]);

    return (
        <section className="relative min-h-[92vh] md:min-h-screen bg-[#030005] overflow-hidden flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 md:px-20">
            {/* Ambient Lighting */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.18)_0%,rgba(124,58,237,0.04)_50%,transparent_70%)] pointer-events-none" />

            {/* Top Text / Hero Headline */}
            <div className="relative z-20 flex flex-col items-start mix-blend-difference mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-4 w-[2px] bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                    <span className="text-white/90 text-xs sm:text-sm md:text-xl font-mono font-medium tracking-[0.45em] md:tracking-[0.6em] uppercase">
                        BEYOND
                    </span>
                </div>

                <h1
                    className="text-[13vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] 2xl:text-[10rem] leading-[0.88] md:leading-[0.82] font-black uppercase tracking-tighter text-glass-premium"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    SHOWROOM
                </h1>

                <p className="text-purple-300 font-mono text-xs md:text-sm tracking-[0.35em] uppercase mt-4 md:mt-6 opacity-90">
                    // Multi-Stage Paint Correction &bull; Cleanroom Ceramic Curing
                </p>
            </div>

            {/* Interactive Before / After Defect Inspection Viewer */}
            <div className="relative z-20 w-full max-w-6xl mx-auto my-4">
                <div
                    ref={containerRef}
                    className="relative w-full h-[360px] sm:h-[420px] md:h-[500px] rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] select-none cursor-ew-resize bg-[#07030a]"
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                    onClick={(e) => handleMove(e.clientX)}
                >
                    {/* AFTER Layer (Right side - 99.8% Gloss Mirror Finish) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0414] via-[#120824] to-[#1e0e38] flex items-center justify-center overflow-hidden">
                        {/* Fallback procedural graphics or custom image */}
                        <img
                            src="/images/hero/hero-detailer.jpg"
                            alt="Concourse Mirror Paint Finish"
                            onError={(e) => {
                                // If user hasn't dropped the image yet, gracefully hide and show high-tech fallback
                                e.currentTarget.style.display = "none";
                            }}
                            className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-105"
                        />

                        {/* High-tech Mirror Reflection Simulation (when image not loaded) */}
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.4)_0%,transparent_60%)]" />
                        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/20 blur-2xl rounded-full pointer-events-none" />

                        {/* Spec Tag for After */}
                        <div className="absolute bottom-6 right-6 z-10 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-purple-500/40 text-right">
                            <div className="flex items-center justify-end gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                                    CONCOURSE JEWELED
                                </span>
                            </div>
                            <div className="text-white font-mono text-sm font-bold">99.8 GU Gloss Units</div>
                            <div className="text-purple-300 font-mono text-[10px]">10H Graphene Dual-Layer</div>
                        </div>
                    </div>

                    {/* BEFORE Layer (Left side - Clipped Swirled / Defect Surface) */}
                    <div
                        className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-[#120508] via-[#1f0d14] to-[#0e0409] border-r-2 border-white shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
                        style={{ width: `${sliderPos}%` }}
                    >
                        <div className="absolute inset-0 w-full h-full min-w-[700px] flex items-center justify-center">
                            {/* Swirl Pattern Overlay */}
                            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.4)_0%,transparent_50%)]" />
                            <div className="absolute inset-0 opacity-20 tech-grid-pattern" />

                            {/* Defect Annotation Markers */}
                            <div className="absolute top-1/4 left-1/6 px-3 py-1.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 font-mono text-[10px]">
                                // DEFECT: 120µm Swirl Scratches
                            </div>
                            <div className="absolute bottom-1/3 left-1/4 px-3 py-1.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 font-mono text-[10px]">
                                // DEFECT: Hologram Buffer Trails
                            </div>
                        </div>

                        {/* Spec Tag for Before */}
                        <div className="absolute bottom-6 left-6 z-10 px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-red-500/40 text-left">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
                                    UNTREATED DEFECTS
                                </span>
                            </div>
                            <div className="text-white font-mono text-sm font-bold">64.2 GU (Swirl Heavy)</div>
                            <div className="text-gray-400 font-mono text-[10px]">Oxidized Clear Coat</div>
                        </div>
                    </div>

                    {/* Vertical Drag Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 pointer-events-none transform -translate-x-1/2"
                        style={{ left: `${sliderPos}%` }}
                    >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-9 h-9 rounded-full bg-white shadow-[0_0_20px_#a855f7] flex items-center justify-center border-2 border-purple-600">
                            <span className="text-black text-xs font-bold font-mono">&#x21C4;</span>
                        </div>
                    </div>

                    {/* Image Placeholder Tooltip Info */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-purple-300">
                        Interactive Split Inspection &bull; Drag to compare
                    </div>
                </div>
            </div>

            {/* Bottom Status Cards */}
            <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-4">
                {/* Cleanroom Curing Bay Status Card */}
                <div className="backdrop-blur-xl bg-[#090514]/85 border border-white/10 hover:border-purple-500/40 p-4 md:p-5 rounded-2xl overflow-hidden relative group transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)] max-w-md w-full sm:w-auto">
                    <div className="flex items-center justify-between gap-6 mb-2">
                        <span className="text-purple-400 font-mono text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                            Cleanroom Lab
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ISO-7 HEPA FILTERED
                        </span>
                    </div>
                    <div className="text-white font-mono text-sm md:text-base font-bold">
                        {brand.upper} PAINT LAB
                    </div>
                    <p className="text-gray-400 text-[10px] md:text-xs mt-1.5 font-mono">
                        {brand.locationTag} &bull; 5000K CRI-98 INSPECTION
                    </p>
                </div>

                <div className="flex items-center gap-6 text-gray-400 font-mono text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span>Zero Micro-Holograms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span>Self-Healing PPF</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
