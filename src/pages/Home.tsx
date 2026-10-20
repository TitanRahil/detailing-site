import { useState, useEffect, useMemo } from "react";
import SequenceHero from "../components/SequenceHero";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { CyberScramble } from "../components/CyberScramble";
import { useBrand } from "../context/BrandContext";
import CommissionConfigurator from "../components/CommissionConfigurator";
import BookNowSection from "../components/BookNowSection";
import CommissionModal, { CommissionPrefill } from "../components/CommissionModal";

const partners = [
    "XPEL PPF",
    "GYEON QUARTZ",
    "RUPES BIGFOOT",
    "STEK AUTOMOTIVE",
    "CARPRO PROFESSIONAL",
    "KAMIKAZE COLLECTION",
    "FLEX POLISHERS",
    "SUNTEK FILMS",
    "MENZERNA POLISH",
    "SWISSVAX",
    "SCANGRIP LIGHTS",
    "KOCH CHEMIE"
];

interface CategoryVariation {
    id: string;
    title: string;
    subtitle: string;
    image: string;
}

interface CategoryItem {
    id: string;
    name: string;
    desc: string;
    detail: string;
    image: string;
    details: string[];
    variations: CategoryVariation[];
}

const categories: CategoryItem[] = [
    {
        name: "Paint Correction & Jeweling",
        id: "paint-correction",
        desc: "Multi-stage rotary compounding and micro-jeweling to eradicate 98%+ of swirls, scratches, and acid rain etchings.",
        image: "/images/services/paint-correction.webp",
        detail: "Digital Ultrasound • 99.2 GU Gloss",
        details: [
            "Digital ultrasonic clearcoat depth mapping before compounding",
            "Rotary heavy compounding pass to eliminate deep RIDS & swirl scratches",
            "Dual-action jeweling polish for crisp crystal optical clarity",
            "IPA alcohol panel wipe-down to verify true zero-filler finish"
        ],
        variations: [
            { id: "single-stage", title: "Single-Stage Gloss Enhancement", subtitle: "Eliminates 65-75% Light Swirls", image: "/images/services/paint-correction.webp" },
            { id: "two-stage", title: "Concourse 2-Stage Correction", subtitle: "95-99% Defect Removal with Zero Holograms", image: "/images/services/paint-correction.webp" },
            { id: "wetsand", title: "Orange-Peel Texture Leveling", subtitle: "3000/5000 Trizact Wet-Sanding Mirror Finish", image: "/images/services/paint-correction.webp" },
        ]
    },
    {
        name: "Self-Healing PPF Armor",
        id: "ppf",
        desc: "8 mil elastomeric thermoplastic urethane film with laser-digitized pattern cut and invisible wrapped edges.",
        image: "/images/services/paint-protection-film.webp",
        detail: "8 mil TPU • 10-Yr Warranty",
        details: [
            "CAD digitized precision templates with hand-wrapped tucked edges",
            "Heat-activated elastomeric top coat self-heals swirl marks instantly",
            "Extreme physical stone-chip, gravel, and door-ding impact defense",
            "Available in Ultra-Gloss or Stealth Satin Matte finishes"
        ],
        variations: [
            { id: "track-pack", title: "Track Package PPF", subtitle: "High-Impact Zone Bumper, Hood & Fenders", image: "/images/services/paint-protection-film.webp" },
            { id: "full-body-clear", title: "Full Body Gloss Armor", subtitle: "100% Exterior Panels Wrapped", image: "/images/services/paint-protection-film.webp" },
            { id: "stealth-matte", title: "Stealth Satin Conversion", subtitle: "Frozen Satin Matte Factory Transformation", image: "/images/services/paint-protection-film.webp" },
        ]
    },
    {
        name: "Ceramic & Graphene Shield",
        id: "ceramic-coating",
        desc: "Molecular SiO2 and graphene oxide matrix delivering 9H/10H hardness, chemical resistance, and intense water beading.",
        image: "/images/services/ceramic-coating.webp",
        detail: "9H/10H Hardness • 118° Beading",
        details: [
            "Intense hydrophobic contact angle exceeding 118° for self-cleaning",
            "Full chemical resistance spanning pH 2 through pH 13",
            "Short-wave infrared (IR) cleanroom heat curing at 65°C",
            "Carfax-verified nationwide coating registration warranty"
        ],
        variations: [
            { id: "pro-ceramic-3yr", title: "Pro Ceramic (3-Year)", subtitle: "Dual-Layer High-Gloss Sacrificial Barrier", image: "/images/services/ceramic-coating.webp" },
            { id: "graphene-5yr", title: "Graphene Matrix Elite (5-Year)", subtitle: "Lower Heat Absorption & Extreme Slickness", image: "/images/services/ceramic-coating.webp" },
            { id: "topper-boost", title: "Hydrophobic Booster Coat", subtitle: "Ultra-Hydrophobic Slickness Layer", image: "/images/services/ceramic-coating.webp" },
        ]
    },
    {
        name: "Wheels-Off Ceramic & Calipers",
        id: "wheels",
        desc: "Demounted 360° wheel barrel polishing, acid-free iron decontamination, and 1200°F thermal ceramic application.",
        image: "/images/services/wheels-ceramic.webp",
        detail: "1200°F Heat Barrier • 360° Barrels",
        details: [
            "Complete wheel removal and ultrasonic iron decontamination wash",
            "Wheel faces and inner barrels machine polished and ceramic sealed",
            "Brembo and Carbon-Ceramic brake calipers coated against dust",
            "Re-torqued strictly to OEM specs with calibrated digital torque wrench"
        ],
        variations: [
            { id: "wheel-faces", title: "Wheel Face Barrier", subtitle: "On-Vehicle Face Coating", image: "/images/services/wheels-ceramic.webp" },
            { id: "wheels-off-full", title: "Full Wheels-Off Atelier", subtitle: "360° Inner Barrels + Painted Calipers", image: "/images/services/wheels-ceramic.webp" },
            { id: "caliper-restore", title: "Caliper Refinishing", subtitle: "High-Temp Ceramic Clear Coat Seal", image: "/images/services/wheels-ceramic.webp" },
        ]
    },
    {
        name: "Bespoke Leather & Cockpit",
        id: "interior",
        desc: "Dry steam extraction and Swissvax organic Connolly hide nutrition restoring factory OEM matte finish without silicone.",
        image: "/images/services/interior-detail.webp",
        detail: "Dry Steam • Connolly Hide Nutrition",
        details: [
            "180°C sub-micron dry steam extraction lifts ground-in oils",
            "pH-balanced organic hide feeder preserves natural matte feel",
            "Hydrophobic ceramic fabric barrier on carpets and floor mats",
            "Velvety Alcantara fibers brushed and reset with zero matting"
        ],
        variations: [
            { id: "cabin-spa", title: "Signature Cabin Detail", subtitle: "Deep Steam Extraction & Vent Sanitization", image: "/images/services/interior-detail.webp" },
            { id: "leather-ceramic", title: "Leather Ceramic Armor", subtitle: "Anti-Blue Jeans Dye Transfer Matrix", image: "/images/services/interior-detail.webp" },
            { id: "alcantara-guard", title: "Alcantara Hydrophobic Guard", subtitle: "Liquid-Spill Repellent Nanotech", image: "/images/services/interior-detail.webp" },
        ]
    },
    {
        name: "Cryogenic Dry-Ice Preservation",
        id: "dry-ice",
        desc: "High-velocity dry-ice (CO2) pellet blasting lifts road grime, cosmoline, and grease upon sublimation with zero water or abrasion.",
        image: "/images/services/dry-ice.webp",
        detail: "0% Water • Non-Abrasive CO2",
        details: [
            "100% non-abrasive; preserves factory zinc platings and paint marks",
            "Zero water introduced to vintage electrical harness or sensors",
            "Restores OEM bare aluminum suspension arms and transmission cases",
            "Protective satin anti-corrosion barrier applied post-blast"
        ],
        variations: [
            { id: "engine-cryo", title: "Engine Bay Cryo", subtitle: "Top-Side Decon Without High Pressure Water", image: "/images/services/dry-ice.webp" },
            { id: "chassis-cryo", title: "Complete Chassis & Suspension", subtitle: "Full Undercarriage Lift Decontamination", image: "/images/services/dry-ice.webp" },
            { id: "wheel-wells", title: "Wheel Well & Brake Cryo", subtitle: "Deep Wheel Arch Cosmoline Removal", image: "/images/services/dry-ice.webp" },
        ]
    },
];

interface BuildSpecItem {
    label: string;
    value: string;
}

interface BuildCategorySpec {
    category: string;
    items: string[];
}

interface FeaturedBuildItem {
    id: string;
    name: string;
    project: string;
    image: string;
    imageOffset: string;
    finish: string;
    accent: string;
    specs: BuildSpecItem[];
    description: string;
    story: string;
    telemetry: BuildSpecItem[];
    technicalSpecs: BuildCategorySpec[];
}

const featuredBuilds: FeaturedBuildItem[] = [
    {
        id: "porsche-gt3rs",
        name: "Porsche 911 GT3 RS",
        project: "Weissach Package // Full Body PPF",
        image: "/images/portfolio/porsche-gt3rs.webp",
        imageOffset: "top-0 h-full",
        finish: "Shark Blue // High-Gloss Shield",
        accent: "blue",
        specs: [
            { label: "Correction Level", value: "Level 2 Concourse" },
            { label: "Impact Defense", value: "8mil Self-Healing PPF" },
            { label: "Surface Gloss", value: "99.4 GU" }
        ],
        description: "Commissioned for complete track protection prior to Nürburgring shakedown. Full body 8mil self-healing PPF installed with 100% wrapped edges, topped with dual-layer Gyeon Q² Infinite ceramic coating.",
        story: "A zero-compromise track preservation. Every aerodynamic contour, hood air-duct, and active swan-neck carbon wing was disassembled and wrapped edge-to-edge for 100% seamless impact armor.",
        telemetry: [
            { label: "Gloss Metric", value: "99.4 GU" },
            { label: "Clearcoat Removed", value: "2.1 Microns" },
            { label: "Cleanroom Bay Time", value: "5 Days" }
        ],
        technicalSpecs: [
            {
                category: "Paint Protection Film (PPF)",
                items: [
                    "Full Body XPEL Ultimate Plus 8mil Self-Healing TPU",
                    "Custom Hand-Tucked Wrapped Edges with Zero Exposed Seams",
                    "Aero Swan-Neck Carbon Wing Disassembled and Fully Wrapped",
                    "Rocker Panels & Quarter Impact Flares Double-Shielded"
                ]
            },
            {
                category: "Ceramic & Graphene Matrices",
                items: [
                    "Gyeon Q² Infinite Base Coat Molecular Bonding",
                    "Gyeon Q² Infinite Top Coat Hydrophobic Overcoat",
                    "Short-Wave Infrared Heat Cured at 65°C for 24 Hours",
                    "Full Carfax Certified Coating Warranty Registration"
                ]
            },
            {
                category: "Wheels & Carbon Cockpit",
                items: [
                    "Magnesium Centerlock Wheels Removed & 360° Ceramic Coated",
                    "Brembo Yellow Calipers & Carbon-Ceramic Rotors Treated",
                    "Connolly Leather & Alcantara Deep Hydrophobic Fabric Guard",
                    "99% Infrared Rejection Ceramic Window Tint"
                ]
            }
        ]
    },
    {
        id: "ferrari-812",
        name: "Ferrari 812 Superfast",
        project: "Rosso Corsa // 99.8% Mirror Jeweling",
        image: "/images/portfolio/ferrari-812.webp",
        imageOffset: "top-0 h-full",
        finish: "Rosso Corsa Gloss Red",
        accent: "red",
        specs: [
            { label: "Correction Level", value: "Level 3 Jeweling" },
            { label: "Coating Matrix", value: "10H Graphene Oxide" },
            { label: "Surface Gloss", value: "99.8 GU" }
        ],
        description: "Arrived with heavy dealership swirl marks and buffer trails. Underwent a 3-stage rotary compounding and finishing jeweling cycle, followed by a 10H graphene nano-coating and full Connolly leather restoration.",
        story: "An optical masterclass in classic Ferrari red paint perfection. Mapped across 48 digital ultrasound points, this V12 grand tourer was restored to a liquid-glass mirror finish that turns every light beam into a razor reflection.",
        telemetry: [
            { label: "Gloss Metric", value: "99.8 GU" },
            { label: "Clearcoat Removed", value: "3.4 Microns" },
            { label: "Cleanroom Bay Time", value: "4 Days" }
        ],
        technicalSpecs: [
            {
                category: "Paint Correction Protocol",
                items: [
                    "48-Point Digital Ultrasonic Clearcoat Thickness Mapping",
                    "Heavy Rotary Compounding to Eliminate Deep Dealer Buffer Trails",
                    "Dual-Action Jeweling Micro-Finishing Polish with Rupes BigFoot",
                    "IPA Alcohol Panel Wipe-Down Verifying True Zero-Filler Finish"
                ]
            },
            {
                category: "Molecular Protection",
                items: [
                    "10H Graphene Oxide Matrix with Anti-Water Spotting Formulation",
                    "Exposed Carbon Fiber Diffusers Sealed with UV-Blocking Layer",
                    "Full Windshield & Exterior Glass Hydrophobic Rain Barrier",
                    "Infrared Cleanroom IR Baking for Maximum Cross-Linking"
                ]
            },
            {
                category: "Bespoke Interior Preservation",
                items: [
                    "Sub-Micron Dry Steam Clean of All Vents & Perforated Leather",
                    "Swissvax Leather Milk Conditioning with Organic Natural Oils",
                    "Anti-Friction Ceramic Leather Shield Preventing Dye Transfer",
                    "Factory OEM Matte Touchpoint Finish Restored"
                ]
            }
        ]
    },
    {
        id: "amg-g63",
        name: "Mercedes-AMG G63",
        project: "Obsidian Black // Stealth Matte Conversion",
        image: "/images/portfolio/amg-g63.webp",
        imageOffset: "top-0 h-full",
        finish: "Frozen Stealth Satin Matte",
        accent: "emerald",
        specs: [
            { label: "Transformation", value: "Full Stealth Satin PPF" },
            { label: "Coverage", value: "100% Painted Panels" },
            { label: "Warranty", value: "10-Year Armor Shield" }
        ],
        description: "Complete transformation from factory high-gloss Obsidian Black into an aggressive Frozen Satin finish using self-healing stealth PPF, including custom treatment for exposed carbon spare wheel cover.",
        story: "The definitive armored luxury build. Transformed from high-maintenance gloss black into a menacing velvet satin surface that resists rock chips, scratches, and fingerprint smudges.",
        telemetry: [
            { label: "Coverage Area", value: "100% Exterior" },
            { label: "Film Caliper", value: "8.0 Mil TPU" },
            { label: "Cleanroom Bay Time", value: "6 Days" }
        ],
        technicalSpecs: [
            {
                category: "Stealth Satin PPF Installation",
                items: [
                    "Complete Disassembly of Door Handles, Hinges & Flares",
                    "Full Wrap in Self-Healing Frozen Satin Matte 8mil Film",
                    "Zero Exposed Paint Seams or Gloss Cut Lines",
                    "Satin Ceramic Top Coat Applied for Intense Hydrophobicity"
                ]
            },
            {
                category: "Chassis & Wheel Treatment",
                items: [
                    "22-inch Forged Cross-Spoke Wheels Removed and Ceramic Coated",
                    "High-Temperature Ceramic Barrier on AMG Red Brake Calipers",
                    "Undercarriage Steam Decontamination & Anti-Corrosion Seal",
                    "Exposed Carbon Fiber Spare Wheel Carrier Satin Wrapped"
                ]
            },
            {
                category: "Cockpit Protection",
                items: [
                    "Designo Nappa Leather Steam Decontaminated & Conditioned",
                    "Ceramic Coating Applied to Driver Touchpoints & Steering Wheel",
                    "Floor Mats Treated with Liquid-Repellent Hydrophobic Shield",
                    "Rear Cargo Luggage Area Deep Extracted and Sealed"
                ]
            }
        ]
    }
];

interface FaqItemData {
    q: string;
    a: string;
    tag: string;
}

const getFaqs = (brandName: string, brandCity: string): FaqItemData[] => [
    {
        q: "What is the difference between Paint Protection Film (PPF) and Ceramic Coating?",
        a: "PPF (Paint Protection Film) is an 8mil self-healing elastomeric urethane barrier engineered to physically absorb rock chips, road gravel, and scratching. Ceramic coating is a liquid silicon dioxide / graphene nano-matrix that chemically crosslinks to the clearcoat, providing extreme hydrophobic water beading, chemical resistance, and optical gloss. At " + brandName + ", our pinnacle treatment combines both: full PPF wrapped edges topped with a ceramic matrix.",
        tag: "Protection"
    },
    {
        q: "Will multi-stage paint correction thin my factory clearcoat?",
        a: "No. Factory clearcoat on modern supercars and luxury vehicles is approximately 40 to 60 microns thick. A multi-stage jeweling correction at " + brandName + " only removes 2 to 4 microns—just enough to eliminate spiderwebs, holograms, and oxidation. We map clearcoat depth across all panels using ultrasonic gauges before any polisher touches your vehicle.",
        tag: "Correction"
    },
    {
        q: "How long does a treatment take at your " + brandCity + " facility?",
        a: "Single-stage gloss enhancements take 1 to 2 days. Multi-stage paint correction with dual-layer ceramic glass coating requires 3 to 4 days, including a mandatory 24-hour cleanroom infrared (IR) shortwave curing bake. Full-vehicle bespoke PPF installations take 4 to 6 business days due to custom edge wrapping and pattern tucking.",
        tag: "Turnaround"
    },
    {
        q: "Do you offer enclosed vehicle transport?",
        a: "Yes. For clients across California and nationwide, we arrange white-glove, single-car enclosed hydraulic transport directly to our cleanroom studio. Your vehicle is insured, tracked, and inspected via high-resolution paint scanners upon arrival.",
        tag: "Logistics"
    },
    {
        q: "How do I maintain my car after ceramic coating or PPF?",
        a: "We recommend a touchless, two-bucket hand wash using pH-neutral foam shampoos and plush microfibers. Avoid automatic brush car washes, which scratch clear coats and degrade film edges. " + brandName + " provides all clients with an Atelier Maintenance Guide and complimentary aftercare wash chemistry.",
        tag: "Aftercare"
    }
];

function FaqItem({ faq, index }: { faq: FaqItemData; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="border-b border-white/[0.08] transition-colors cursor-pointer group py-6"
        >
            <div className="flex items-center justify-between gap-6">
                <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs text-purple-400/60 tracking-wider">
                        0{index + 1}
                    </span>
                    <h3 className={`text-lg md:text-xl font-medium transition-colors ${isOpen ? "text-purple-300" : "text-white group-hover:text-purple-200"}`}>
                        {faq.q}
                    </h3>
                </div>

                <div className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen ? "rotate-45 border-purple-500/50 bg-purple-500/20 text-purple-300" : "text-gray-400 group-hover:border-white/30"}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            </div>

            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="text-gray-400 font-light leading-relaxed pl-10 text-sm md:text-base max-w-3xl">
                        {faq.a}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const brand = useBrand();
    const faqs = useMemo(() => getFaqs(brand.name, brand.city), [brand.name, brand.city]);
    const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null);
    const [activeVariationId, setActiveVariationId] = useState<string | null>(null);
    const [activeBuild, setActiveBuild] = useState<FeaturedBuildItem | null>(null);
    const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
    const [commissionPrefill, setCommissionPrefill] = useState<CommissionPrefill | null>(null);
    const [showAllCatalogMobile, setShowAllCatalogMobile] = useState(false);

    // Dynamic Responsive Catalog Heading
    const catalogHeading = `${brand.upper} CATALOG`;
    const catalogHeadingSize = catalogHeading.length > 28
        ? "text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]"
        : catalogHeading.length > 18
        ? "text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]"
        : "text-4xl sm:text-5xl md:text-6xl";

    // Dynamic Responsive Works Heading
    const worksHeading = `WORKS OF ${brand.upper}`;
    const worksHeadingSize = worksHeading.length > 28
        ? "text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem]"
        : worksHeading.length > 18
        ? "text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]"
        : "text-3xl sm:text-4xl md:text-5xl";

    const handleOpenCommissionModal = (prefill?: CommissionPrefill) => {
        setCommissionPrefill(prefill || null);
        setIsCommissionModalOpen(true);
    };

    // Prevent background page scrolling & lock Lenis when modal is open
    useEffect(() => {
        const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;

        if (activeCategory || activeBuild || isCommissionModalOpen) {
            lenis?.stop();
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setActiveCategory(null);
                    setActiveBuild(null);
                    setIsCommissionModalOpen(false);
                }
            };
            window.addEventListener("keydown", handleKeyDown);

            return () => {
                lenis?.start();
                document.documentElement.style.overflow = "";
                document.body.style.overflow = "";
                window.removeEventListener("keydown", handleKeyDown);
            };
        } else {
            lenis?.start();
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
    }, [activeCategory, activeBuild, isCommissionModalOpen]);

    const handleOpenCategory = (cat: CategoryItem) => {
        setActiveCategory(cat);
        setActiveVariationId(null);
    };

    return (
        <main className="min-h-screen bg-[#030005] text-white selection:bg-purple-600 selection:text-white">
            {/* Exactly Same 60fps Canvas Sequence Hero */}
            <SequenceHero />

            {/* Catalog Section */}
            <section id="modifications" className="py-24 md:py-36 px-6 md:px-20 relative bg-[#030005] overflow-hidden">
                <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.18)_0%,rgba(88,28,135,0.06)_45%,transparent_70%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Editorial Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 md:gap-10 border-b border-white/[0.08] pb-10">
                        <div className="flex-1 min-w-0 max-w-3xl">
                            <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
                                The Catalog of {brand.name}
                            </span>
                            <h2 className={`${catalogHeadingSize} font-black uppercase tracking-tight text-white leading-[1.08] break-words`}>
                                <CyberScramble text={catalogHeading} />
                            </h2>
                        </div>

                        <p className="text-gray-400 text-sm md:text-base max-w-md shrink-0 font-light leading-relaxed">
                            Explore {brand.name}&apos;s cleanroom paint correction, self-healing PPF, and molecular ceramic matrices. Click any category to inspect technical specifications, gloss ratings, and micron depths.
                        </p>
                    </div>

                    {/* Catalog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, index) => {
                            const isHiddenOnMobile = index >= 3 && !showAllCatalogMobile;
                            return (
                                <div key={cat.id} className={isHiddenOnMobile ? "hidden md:block" : "block"}>
                                    <RevealOnScroll width="100%" delay={(index % 3) * 80}>
                                        <button
                                            type="button"
                                            onClick={() => handleOpenCategory(cat)}
                                            className="w-full text-left cursor-pointer group relative h-[480px] md:h-[500px] rounded-xl border border-white/[0.12] hover:border-purple-500/60 transition-all duration-500 flex flex-col justify-end overflow-hidden bg-[#0a0512] hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                                        >
                                            {/* Generated High-Resolution Image */}
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                loading="lazy"
                                                className="absolute inset-0 w-full h-full object-cover brightness-[1.12] contrast-[1.04] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[1.2]"
                                            />

                                            {/* Subtle Bottom-Only Scrim Gradient - Leaves ~70% of card fully transparent */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent via-40% to-70% pointer-events-none" />

                                            {/* Content Bar - Compact, Elegant, Semi-Frosted */}
                                            <div className="relative z-10 p-6 sm:p-7 backdrop-blur-[2px] bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                                <span className="font-mono text-[11px] tracking-wider text-purple-400 uppercase block mb-1 font-semibold">
                                                    {cat.detail}
                                                </span>
                                                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors uppercase italic mb-1.5">
                                                    {cat.name}
                                                </h3>
                                                <p className="text-gray-300/90 text-xs leading-relaxed font-light mb-4 line-clamp-2">
                                                    {cat.desc}
                                                </p>

                                                <div className="flex items-center justify-between pt-3 border-t border-white/[0.12] text-xs font-semibold tracking-wider uppercase text-white/90 group-hover:text-purple-300 transition-colors">
                                                    <span>Inspect Specifications</span>
                                                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-purple-400 group-hover:bg-purple-600/30 transition-all">
                                                        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </RevealOnScroll>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Expand / Collapse Button */}
                    <div className="mt-8 text-center md:hidden">
                        {!showAllCatalogMobile ? (
                            <button
                                type="button"
                                onClick={() => setShowAllCatalogMobile(true)}
                                className="w-full py-3.5 px-6 rounded-xl border border-purple-500/40 bg-purple-950/20 text-purple-300 font-mono text-xs tracking-wider uppercase font-bold hover:bg-purple-900/30 transition-all flex items-center justify-center gap-2"
                            >
                                <span>View All 6 Preservation Disciplines</span>
                                <span>&#x25BC;</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowAllCatalogMobile(false)}
                                className="w-full py-3.5 px-6 rounded-xl border border-white/15 bg-white/5 text-gray-300 font-mono text-xs tracking-wider uppercase font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <span>Collapse Catalog</span>
                                <span>&#x25B2;</span>
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Category Detail Modal */}
            {activeCategory && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
                    onClick={() => setActiveCategory(null)}
                >
                    <div
                        className="relative w-full max-w-4xl bg-[#090514] border border-white/15 rounded-2xl shadow-[0_20px_70px_rgba(124,58,237,0.35)] overflow-hidden max-h-[92vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-start bg-black/40">
                            <div>
                                <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-1">
                                    {activeCategory.detail}
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                                    {activeCategory.name}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveCategory(null)}
                                className="text-white/40 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer font-mono text-xs"
                            >
                                ESC ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
                            {/* Hero Image in Modal */}
                            <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 bg-black">
                                <img
                                    src={
                                        activeVariationId
                                            ? activeCategory.variations.find((v) => v.id === activeVariationId)?.image || activeCategory.image
                                            : activeCategory.image
                                    }
                                    alt={activeCategory.name}
                                    className="w-full h-full object-cover brightness-[1.08]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Overview */}
                            <div>
                                <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold mb-2 text-purple-300">
                                    Discipline Protocol Overview
                                </h4>
                                <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                                    {activeCategory.desc}
                                </p>
                            </div>

                            {/* Technical Checkpoints */}
                            <div>
                                <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold mb-3">
                                    Cleanroom Technical Specifications
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {activeCategory.details.map((detail, idx) => (
                                        <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                                            <span className="text-purple-400 font-bold text-xs mt-0.5">✓</span>
                                            <span className="text-gray-300 text-xs font-light leading-relaxed">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Variations */}
                            {activeCategory.variations.length > 0 && (
                                <div>
                                    <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold mb-3">
                                        Studio Package Tiers
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {activeCategory.variations.map((v) => {
                                            const isSelected = activeVariationId === v.id;
                                            return (
                                                <button
                                                    key={v.id}
                                                    type="button"
                                                    onClick={() => setActiveVariationId(v.id)}
                                                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                                                        isSelected
                                                            ? "bg-purple-950/40 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                                                            : "bg-black/30 border-white/10 hover:border-white/25"
                                                    }`}
                                                >
                                                    <div className="text-white font-bold text-xs sm:text-sm">{v.title}</div>
                                                    <div className="text-purple-300 font-mono text-[11px] mt-1">{v.subtitle}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-white/10 bg-black/60 flex justify-between items-center">
                            <span className="text-gray-400 font-mono text-xs hidden sm:inline">
                                Cleanroom calibrated intake for {brand.name}
                            </span>
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                <button
                                    type="button"
                                    onClick={() => setActiveCategory(null)}
                                    className="px-5 py-2.5 rounded-lg border border-white/15 text-xs font-semibold tracking-wider uppercase text-gray-300 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentCat = activeCategory;
                                        setActiveCategory(null);
                                        handleOpenCommissionModal({
                                            platform: "All Vehicles",
                                            service: currentCat.name,
                                            estimatedTotal: "By Consultation"
                                        });
                                    }}
                                    className="px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_#7c3aed] transition-all cursor-pointer whitespace-nowrap"
                                >
                                    Inquire with Studio &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Featured Builds Section */}
            <section id="builds" className="py-24 md:py-36 px-6 md:px-20 bg-[#020004] relative overflow-hidden">
                <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.18)_0%,rgba(88,28,135,0.06)_45%,transparent_70%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 border-b border-white/[0.08] pb-10">
                        <div className="flex-1 min-w-0 max-w-3xl">
                            <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
                                Hall of Legends // {brand.name} Commissions
                            </span>
                            <h2 className={`${worksHeadingSize} font-black text-white uppercase tracking-tight leading-[1.1] break-words`}>
                                <CyberScramble text={worksHeading} />
                            </h2>
                        </div>
                        <p className="text-gray-400 font-light text-sm md:text-base max-w-md shrink-0">
                            Signature vehicle transformations forged at the {brand.name} {brand.city} cleanroom laboratory. Restored and protected without compromise for track and concourse.
                        </p>
                    </div>

                    {/* Commissions Showcase (3 Vehicles with High-Res Generated Images) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredBuilds.map((build, idx) => (
                            <RevealOnScroll key={build.id} direction="left" width="100%" delay={idx * 150}>
                                <button
                                    type="button"
                                    onClick={() => setActiveBuild(build)}
                                    className="w-full text-left cursor-pointer group relative h-[600px] rounded-2xl overflow-hidden border border-white/[0.1] hover:border-purple-500/50 transition-all duration-500 bg-[#07030a] flex flex-col justify-between hover:-translate-y-1 shadow-2xl"
                                >
                                    {/* Elevated Car Viewport */}
                                    <div className="relative h-[56%] w-full overflow-hidden bg-[#090412]">
                                        <img
                                            src={build.image}
                                            alt={build.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover brightness-[1.08] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#07030a] via-transparent to-black/25 pointer-events-none" />

                                        {/* Top Identification Badge */}
                                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                            <span className="text-[10px] font-mono tracking-widest uppercase text-white/90 font-bold">
                                                {build.project}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Content Container */}
                                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative z-10 bg-gradient-to-t from-[#07030a] via-[#07030a]/90 to-transparent">
                                        <div>
                                            <span className="text-purple-400 font-mono text-[11px] tracking-wider uppercase block mb-1">
                                                {build.finish}
                                            </span>
                                            <h3 className="text-2xl font-bold uppercase text-white group-hover:text-purple-200 transition-colors mb-3">
                                                {build.name}
                                            </h3>
                                            <p className="text-gray-400 text-xs font-light line-clamp-3 leading-relaxed mb-6">
                                                {build.description}
                                            </p>
                                        </div>

                                        {/* Specs Row */}
                                        <div>
                                            <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-white/[0.08] mb-5">
                                                {build.specs.map((spec, sIdx) => (
                                                    <div key={sIdx}>
                                                        <span className="text-[10px] font-mono text-gray-500 uppercase block truncate">
                                                            {spec.label}
                                                        </span>
                                                        <span className="text-xs md:text-sm font-mono font-bold text-white block mt-0.5 truncate">
                                                            {spec.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Action Link */}
                                            <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-white/90 group-hover:text-purple-300 transition-colors">
                                                <span>Inspect Dossier</span>
                                                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-purple-400 group-hover:bg-purple-600/30 transition-all">
                                                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Build Dossier Modal */}
            {activeBuild && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
                    onClick={() => setActiveBuild(null)}
                >
                    <div
                        className="relative w-full max-w-4xl bg-[#090514] border border-white/15 rounded-2xl shadow-[0_20px_70px_rgba(124,58,237,0.35)] overflow-hidden max-h-[92vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-start bg-black/40">
                            <div>
                                <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-1">
                                    Commission Dossier // {activeBuild.project}
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                                    {activeBuild.name}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveBuild(null)}
                                className="text-white/40 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer font-mono text-xs"
                            >
                                ESC ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
                            <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden border border-white/10 bg-black">
                                <img
                                    src={activeBuild.image}
                                    alt={activeBuild.name}
                                    className="w-full h-full object-cover brightness-[1.08]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Narrative */}
                            <div>
                                <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold mb-2 text-purple-300">
                                    Commission Narrative
                                </h4>
                                <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                                    {activeBuild.story}
                                </p>
                            </div>

                            {/* Telemetry Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                {activeBuild.telemetry.map((t, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 text-center">
                                        <span className="text-gray-400 text-[10px] font-mono uppercase block">{t.label}</span>
                                        <span className="text-white font-mono text-base sm:text-lg font-bold mt-1 block">
                                            {t.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Technical Specs Breakdown */}
                            <div className="space-y-4">
                                <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold">
                                    Technical Architecture Breakdown
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {activeBuild.technicalSpecs.map((group, gIdx) => (
                                        <div key={gIdx} className="p-4 rounded-xl bg-black/30 border border-white/5">
                                            <h5 className="text-purple-300 font-mono text-xs font-bold uppercase mb-3">
                                                {group.category}
                                            </h5>
                                            <ul className="space-y-2">
                                                {group.items.map((item, iIdx) => (
                                                    <li key={iIdx} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed font-light">
                                                        <span className="text-purple-400 font-bold text-[10px] mt-0.5">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-black/60 flex justify-between items-center">
                            <span className="text-gray-400 font-mono text-xs hidden sm:inline">
                                Cleanroom Cured • Track &amp; Concourse Ready
                            </span>
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                <button
                                    type="button"
                                    onClick={() => setActiveBuild(null)}
                                    className="px-5 py-2.5 rounded-lg border border-white/15 text-xs font-semibold tracking-wider uppercase text-gray-300 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentBuild = activeBuild;
                                        setActiveBuild(null);
                                        handleOpenCommissionModal({
                                            platform: currentBuild.name,
                                            service: currentBuild.project,
                                            estimatedTotal: "By Commission"
                                        });
                                    }}
                                    className="px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_#7c3aed] transition-all cursor-pointer whitespace-nowrap"
                                >
                                    Inquire with Studio &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Interactive Build / Detailing Estimator */}
            <CommissionConfigurator onOpenModal={handleOpenCommissionModal} />

            {/* Book Now Section */}
            <BookNowSection onOpenModal={() => handleOpenCommissionModal()} />

            {/* About / Atelier Section */}
            <section id="about" className="py-24 md:py-36 px-6 md:px-20 bg-[#030005] relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                        <div>
                            <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
                                Philosophy &amp; Atelier
                            </span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-8 leading-[1.05]">
                                <CyberScramble text="PURPOSE-BUILT" /> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
                                    FOR FLAWLESS ART
                                </span>
                            </h2>
                            <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed font-light">
                                {brand.name} was established on a singular premise: automotive preservation is a surgical art form that demands microscopic precision. From our cleanroom facility in {brand.city}, we fuse master paint jeweling with aerospace-grade self-healing polymer armor.
                            </p>
                            <p className="text-gray-400 text-base mb-10 leading-relaxed font-light border-l border-purple-600/60 pl-6">
                                We do not rush. Every panel is ultrasound-mapped to single microns, every curve of Paint Protection Film is hand-wrapped and tucked, and every ceramic matrix is baked under robotic short-wave infrared heat lamps.
                            </p>

                            {/* Minimalist Metrics */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08]">
                                <div>
                                    <span className="text-3xl font-black text-white font-mono block">99.8%</span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Swirl-Free</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-black text-white font-mono block">ISO-7</span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Cleanroom</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-black text-white font-mono block">10-Yr</span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">PPF Shield</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-black text-white font-mono block">0</span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Holograms</span>
                                </div>
                            </div>
                        </div>

                        {/* Workshop Visual */}
                        <div className="relative">
                            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] rounded-2xl border border-white/[0.12] overflow-hidden group shadow-2xl bg-[#07030a]">
                                <img
                                    src="/logo-imj.webp"
                                    alt={`${brand.name} Cleanroom Architecture`}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.04] contrast-[1.04] transition-all duration-700 group-hover:scale-105 group-hover:brightness-[1.1]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                                <div className="hidden sm:block absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 shadow-lg">
                                    <span className="text-purple-400 font-mono text-xs tracking-wider uppercase block mb-0.5 font-bold">
                                        {brand.city} Cleanroom Curing &amp; Preservation Lab
                                    </span>
                                    <span className="text-white font-medium text-xs sm:text-sm font-mono">
                                        {brand.locationTag}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Location Strip */}
                    <div className="mt-24 pt-16 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div>
                                <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-2 font-semibold">
                                    Direct Inquiries
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase">
                                    Connect With Our Master Detailers
                                </h3>
                                <p className="text-gray-400 text-sm mt-1 font-light">
                                    Private paint gauge evaluations and cleanroom reservation consults by appointment.
                                </p>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="border-b border-white/[0.06] pb-3">
                                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Studio Facility</span>
                                    <p className="text-white text-base font-light">
                                        {brand.isCustomClient ? `${brand.city} Metropolitan Area • Cleanroom Facility, USA (By Appointment)` : "2900 Airway Ave, Suite 100, Costa Mesa, CA 92626, USA"}
                                    </p>
                                </div>
                                <div className="border-b border-white/[0.06] pb-3">
                                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Electronic Inquiries</span>
                                    <a href={`mailto:${brand.email}`} className="text-white text-base font-light hover:text-purple-400 transition-colors">
                                        {brand.email}
                                    </a>
                                </div>
                                <div>
                                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Direct Studio Phone</span>
                                    <p className="text-white text-base font-light">
                                        {brand.isCustomClient ? "+1 (949) 555-0199 (Private Concierge)" : "+1 (949) 555-0199 (09:00 - 18:00 PST, USA)"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map embed - USA Location */}
                        <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#07030a] h-[360px]">
                            <iframe
                                title="USA Facility Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106316.32486745507!2d-117.96263593005885!3d33.6411322238384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd834a0d9b4db%3A0xb3fc685957d62055!2sCosta%20Mesa%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1711111111111!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%) grayscale(20%)" }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Questions FAQ Section */}
            <section id="faq" className="py-24 md:py-36 px-6 md:px-20 bg-[#020004] relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="mb-14 border-b border-white/[0.08] pb-8">
                        <span className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3 font-semibold">
                            Questions & Support
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="divide-y divide-white/[0.08]">
                        {faqs.map((faq, i) => (
                            <RevealOnScroll key={i} width="100%" delay={i * 60} direction="right">
                                <FaqItem faq={faq} index={i} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 md:px-20 border-t border-white/10 bg-[#020003] text-gray-400 text-xs font-mono">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{brand.upper}</span>
                        <span>// {brand.locationTag}</span>
                    </div>
                    <div>
                        © {new Date().getFullYear()} {brand.name}. All Rights Reserved.
                    </div>
                </div>
            </footer>

            {/* Commission Modal (Reservation & Intake) */}
            <CommissionModal
                isOpen={isCommissionModalOpen}
                onClose={() => setIsCommissionModalOpen(false)}
                prefill={commissionPrefill}
            />
        </main>
    );
}
