import { useState } from "react";
import { useBrand } from "../context/BrandContext";

export interface EstimatorResult {
    vehicleClass: string;
    packageTier: string;
    addons: string[];
    totalPrice: number;
    days: number;
    laborHours: number;
}

interface Props {
    onSelectEstimate: (result: EstimatorResult) => void;
}

const VEHICLE_SIZES = [
    { id: "coupe", name: "Sports Coupe", icon: "🏎️", multiplier: 1.0, baseLabor: 14 },
    { id: "sedan", name: "Sedan / Wagon", icon: "🚘", multiplier: 1.15, baseLabor: 18 },
    { id: "exotic", name: "Exotic / Supercar", icon: "✨", multiplier: 1.35, baseLabor: 24 },
    { id: "suv", name: "Full-Size SUV / Truck", icon: "🚙", multiplier: 1.45, baseLabor: 28 },
];

const PACKAGES = [
    {
        id: "enhancement",
        name: "Stage 1: Gloss Enhancement",
        tag: "Single-Stage Machine Polish",
        desc: "Deep decontamination wash, clay bar, 1-stage machine polish (65-75% defect removal), topped with 12-month ceramic sealant.",
        basePrice: 650,
        days: 1,
        addedLabor: 8,
    },
    {
        id: "concourse",
        name: "Stage 2: Concourse Correction",
        tag: "Multi-Stage Compound & Jeweling",
        desc: "Heavy compounding to eliminate 95%+ of deep swirls and scratches, followed by jeweling polish and 3-Year 9H dual-layer ceramic coating.",
        basePrice: 1350,
        days: 3,
        addedLabor: 16,
    },
    {
        id: "ultimate-shield",
        name: "Stage 3: Ultimate Armor (PPF + Ceramic)",
        tag: "Full Front PPF + Graphene Matrix",
        desc: "Concourse paint correction, full high-impact track package PPF (hood, bumper, fenders, mirrors), topped with 5-Year Graphene coating.",
        basePrice: 2850,
        days: 5,
        addedLabor: 32,
    },
];

const ADDONS = [
    { id: "glass", name: "Full Glass Hydrophobic Rain Barrier", price: 220, hours: 2 },
    { id: "wheels-off", name: "Wheels-Off Ceramic & Caliper Shield", price: 650, hours: 5 },
    { id: "interior", name: "Interior Leather Revival & Ceramic Guard", price: 480, hours: 4 },
    { id: "engine-cryo", name: "Cryogenic Dry-Ice Engine Bay Decon", price: 450, hours: 3 },
];

export default function DetailingEstimator({ onSelectEstimate }: Props) {
    const brand = useBrand();
    const [selectedSize, setSelectedSize] = useState(VEHICLE_SIZES[0].id);
    const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1].id);
    const [selectedAddons, setSelectedAddons] = useState<string[]>(["wheels-off"]);

    const currentSize = VEHICLE_SIZES.find((s) => s.id === selectedSize) || VEHICLE_SIZES[0];
    const currentPkg = PACKAGES.find((p) => p.id === selectedPackage) || PACKAGES[1];

    const addonsCost = selectedAddons.reduce((sum, id) => {
        const item = ADDONS.find((a) => a.id === id);
        return sum + (item ? item.price : 0);
    }, 0);

    const addonsHours = selectedAddons.reduce((sum, id) => {
        const item = ADDONS.find((a) => a.id === id);
        return sum + (item ? item.hours : 0);
    }, 0);

    const calculatedPrice = Math.round(currentPkg.basePrice * currentSize.multiplier + addonsCost);
    const totalLaborHours = currentSize.baseLabor + currentPkg.addedLabor + addonsHours;
    const turnaroundDays = currentPkg.days + (selectedAddons.length > 2 ? 1 : 0);

    const toggleAddon = (id: string) => {
        setSelectedAddons((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleProceed = () => {
        onSelectEstimate({
            vehicleClass: currentSize.name,
            packageTier: currentPkg.name,
            addons: selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name || id),
            totalPrice: calculatedPrice,
            days: turnaroundDays,
            laborHours: totalLaborHours,
        });
    };

    return (
        <section id="estimator" className="py-24 md:py-36 px-4 sm:px-6 md:px-20 bg-[#020004] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-14 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
                            Interactive Studio Configurator // {brand.shortName}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                            LIVE TREATMENT ESTIMATOR
                        </h2>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base max-w-md font-light leading-relaxed">
                        Configure your vehicle class, correction depth, and surface armor modules. Get immediate live pricing, estimated labor hours, and cleanroom bay turnover schedules.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Decision Steps */}
                    <div className="lg:col-span-7 space-y-10">
                        {/* Step 1: Vehicle Size */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                                    1
                                </span>
                                <h3 className="text-white font-mono text-sm tracking-wider uppercase font-bold">
                                    Select Vehicle Form Factor
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {VEHICLE_SIZES.map((size) => {
                                    const isSelected = selectedSize === size.id;
                                    return (
                                        <button
                                            key={size.id}
                                            type="button"
                                            onClick={() => setSelectedSize(size.id)}
                                            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                                                isSelected
                                                    ? "bg-purple-950/40 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                                                    : "bg-[#0a0512] border-white/10 hover:border-white/20"
                                            }`}
                                        >
                                            <span className="text-2xl">{size.icon}</span>
                                            <div>
                                                <div className="text-white font-bold text-xs sm:text-sm">{size.name}</div>
                                                <div className="text-gray-400 text-[10px] font-mono mt-0.5">
                                                    +{Math.round((size.multiplier - 1) * 100)}% surface area
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Package Tier */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                                    2
                                </span>
                                <h3 className="text-white font-mono text-sm tracking-wider uppercase font-bold">
                                    Select Preservation Tier
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {PACKAGES.map((pkg) => {
                                    const isSelected = selectedPackage === pkg.id;
                                    return (
                                        <button
                                            key={pkg.id}
                                            type="button"
                                            onClick={() => setSelectedPackage(pkg.id)}
                                            className={`w-full p-5 rounded-xl border text-left transition-all cursor-pointer ${
                                                isSelected
                                                    ? "bg-purple-950/40 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                                                    : "bg-[#0a0512] border-white/10 hover:border-white/25"
                                            }`}
                                        >
                                            <div className="flex justify-between items-start gap-4 mb-1.5">
                                                <div>
                                                    <span className="text-purple-400 font-mono text-[10px] uppercase tracking-wider font-bold block mb-1">
                                                        {pkg.tag}
                                                    </span>
                                                    <h4 className="text-white font-bold text-base md:text-lg">{pkg.name}</h4>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-white font-mono font-bold text-base sm:text-lg">
                                                        ${Math.round(pkg.basePrice * currentSize.multiplier)}
                                                    </span>
                                                    <span className="block text-[10px] font-mono text-gray-400">
                                                        ~{pkg.days} {pkg.days === 1 ? "Day" : "Days"} Bay Time
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-xs sm:text-sm font-light mt-2 leading-relaxed">
                                                {pkg.desc}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 3: Add-on Modules */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                                    3
                                </span>
                                <h3 className="text-white font-mono text-sm tracking-wider uppercase font-bold">
                                    Optional Studio Upgrades
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {ADDONS.map((addon) => {
                                    const isChecked = selectedAddons.includes(addon.id);
                                    return (
                                        <button
                                            key={addon.id}
                                            type="button"
                                            onClick={() => toggleAddon(addon.id)}
                                            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                                                isChecked
                                                    ? "bg-purple-950/35 border-purple-500/80"
                                                    : "bg-[#0a0512] border-white/10 hover:border-white/20"
                                            }`}
                                        >
                                            <div className="pr-3">
                                                <div className="text-white text-xs sm:text-sm font-medium">{addon.name}</div>
                                                <div className="text-gray-400 text-[10px] font-mono mt-1">+{addon.hours} hrs labor</div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className="text-purple-300 font-mono text-xs font-bold">+${addon.price}</span>
                                                <div className={`w-4 h-4 rounded-md border mt-1.5 ml-auto flex items-center justify-center ${
                                                    isChecked ? "bg-purple-600 border-purple-400 text-white text-[10px]" : "border-white/20"
                                                }`}>
                                                    {isChecked && "✓"}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Real-time Live Estimate Summary Card */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/15 bg-[#090514]/90 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                                <div>
                                    <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold block mb-1">
                                        CALIBRATED QUOTE
                                    </span>
                                    <h4 className="text-white font-mono text-lg font-bold">Studio Bay Estimate</h4>
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    BAY AVAILABLE
                                </span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-xs font-mono">
                                    <span className="text-gray-400">Vehicle Profile:</span>
                                    <span className="text-white font-bold">{currentSize.name}</span>
                                </div>
                                <div className="flex justify-between text-xs font-mono">
                                    <span className="text-gray-400">Core Treatment:</span>
                                    <span className="text-white font-bold text-right truncate max-w-[200px]">
                                        {currentPkg.name}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs font-mono">
                                    <span className="text-gray-400">Active Upgrades:</span>
                                    <span className="text-purple-300 font-bold">{selectedAddons.length} Applied</span>
                                </div>
                                <div className="flex justify-between text-xs font-mono">
                                    <span className="text-gray-400">Total Studio Labor:</span>
                                    <span className="text-white font-bold">{totalLaborHours} Hours Precision</span>
                                </div>
                                <div className="flex justify-between text-xs font-mono">
                                    <span className="text-gray-400">Cleanroom Turnover:</span>
                                    <span className="text-white font-bold">{turnaroundDays} Business Days</span>
                                </div>
                            </div>

                            {/* Total Price Display */}
                            <div className="p-5 rounded-xl bg-purple-950/30 border border-purple-500/30 mb-8">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs font-mono tracking-wider uppercase text-purple-300 font-semibold">
                                        Estimated Total:
                                    </span>
                                    <div className="text-right">
                                        <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                                            ${calculatedPrice.toLocaleString()}
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-400">USD &bull; Includes Prep &amp; Curing</span>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action Button */}
                            <button
                                type="button"
                                onClick={handleProceed}
                                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs tracking-widest uppercase font-bold transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>Reserve This Treatment</span>
                                <span>&rarr;</span>
                            </button>

                            <p className="text-gray-500 font-mono text-[10px] text-center mt-4">
                                Exact micron clearance confirmed via on-site inspection gauge prior to work.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
