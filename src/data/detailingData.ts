export interface DetailingVariation {
    id: string;
    name: string;
    price: string;
    description: string;
    specs: {
        label: string;
        val: string;
    }[];
}

export interface DetailingCategory {
    id: string;
    name: string;
    detail: string;
    image: string;
    imagePlaceholderNotice: string;
    description: string;
    features: string[];
    specs: {
        label: string;
        val: string;
    }[];
    variations: DetailingVariation[];
}

export interface PortfolioBuild {
    id: string;
    name: string;
    project: string;
    image: string;
    imagePlaceholderNotice: string;
    description: string;
    specs: {
        label: string;
        value: string;
    }[];
    highlights: string[];
}

export const detailingCategories: DetailingCategory[] = [
    {
        id: "paint-correction",
        name: "Paint Correction & Jeweling",
        detail: "Defect Eradication & Mirror Finish",
        image: "/images/services/paint-correction.webp",
        imagePlaceholderNotice: "Recommended: 1200x800 Close-up of rotary/DA polisher under 5000K LED inspection lighting, showing swirl removal line.",
        description: "Multi-stage machine compounding and finishing polishes measured with digital ultrasonic thickness gauges. Safely eliminates 95–99% of spiderweb scratches, wash marring, acid etchings, and hologram trails to deliver an optical mirror gloss.",
        features: [
            "Digital ultrasonic paint depth mapping before cutting",
            "Rotary heavy compounding pass to eliminate deep RIDS",
            "Dual-action jeweling polish for crisp crystal clarity",
            "Alcohol wipe-down (IPA) to verify true zero-filler finish"
        ],
        specs: [
            { label: "Defect Removal", val: "98.5%+" },
            { label: "Gloss Units", val: "99.2 GU" },
            { label: "Clear Coat Removal", val: "2 - 4 Microns" },
            { label: "Turnaround Time", val: "2 - 3 Days" }
        ],
        variations: [
            {
                id: "single-stage",
                name: "Single-Stage Gloss Enhancement",
                price: "$650+",
                description: "Refining pass that eliminates 60-70% of light marring while dramatically boosting reflectivity and depth. Ideal for well-maintained modern vehicles.",
                specs: [
                    { label: "Correction Level", val: "65% - 75%" },
                    { label: "Machine Passes", val: "1 Refining Stage" },
                    { label: "Duration", val: "1 Day" }
                ]
            },
            {
                id: "two-stage",
                name: "Concourse Multi-Stage Correction",
                price: "$1,250+",
                description: "Intensive 2-to-3 stage rotary compounding followed by micro-finishing jeweling polish. Removes 95%+ of all paint defects with zero holograms.",
                specs: [
                    { label: "Correction Level", val: "95% - 99%" },
                    { label: "Machine Passes", val: "2 - 3 Precision Passes" },
                    { label: "Duration", val: "2 - 3 Days" }
                ]
            },
            {
                id: "wetsand-orange-peel",
                name: "Bespoke Orange-Peel Texture Leveling",
                price: "$2,800+",
                description: "Precision wet-sanding with 3000/5000 grit micro-abrasive disks to level OEM orange peel texture for a liquid glass reflection.",
                specs: [
                    { label: "Texture Reduction", val: "100% Mirror Flat" },
                    { label: "Abrasive Grit", val: "2500 - 5000 Trizact" },
                    { label: "Duration", val: "4 - 5 Days" }
                ]
            }
        ]
    },
    {
        id: "ppf",
        name: "Self-Healing PPF Armor",
        detail: "8 mil Thermoplastic Urethane Shield",
        image: "/images/services/paint-protection-film.webp",
        imagePlaceholderNotice: "Recommended: 1200x800 Technician wrapping hood or fender edge with transparent or stealth satin film.",
        description: "Laser-digitized pattern cut film installed with tucked, invisible wrapped edges. Elastomeric polymer technology self-heals swirl marks and minor rock chips upon sunlight or heat exposure.",
        features: [
            "Edge-wrapped installation with hidden seams",
            "Advanced top-coat with hydrophobic oleophobic repellency",
            "Available in Ultra-Gloss or Satin Stealth finishes",
            "10-Year manufacturer warranty against yellowing or peeling"
        ],
        specs: [
            { label: "Film Caliper", val: "8.0 Mil TPU" },
            { label: "Self-Healing Temp", val: "40°C (Direct Sun)" },
            { label: "Tensile Strength", val: "32 MPa" },
            { label: "Warranty", val: "10 Years" }
        ],
        variations: [
            {
                id: "track-pack",
                name: "Track Package PPF",
                price: "$1,850+",
                description: "Full bumper, entire hood, front fenders, mirrors, rocker panels, and rear wheel arch impact zones for spirited track driving.",
                specs: [
                    { label: "Coverage", val: "High-Impact Zone" },
                    { label: "Finish", val: "Gloss or Satin" },
                    { label: "Install Time", val: "2 Days" }
                ]
            },
            {
                id: "full-body-clear",
                name: "Full Body Gloss Armor",
                price: "$5,200+",
                description: "Every exterior painted surface wrapped with rolled edges, emblems removed and re-calibrated. 100% impact resistance.",
                specs: [
                    { label: "Coverage", val: "100% Exterior" },
                    { label: "Finish", val: "High-Gloss Crystal" },
                    { label: "Install Time", val: "4 - 5 Days" }
                ]
            },
            {
                id: "stealth-matte-conversion",
                name: "Full Stealth Satin Conversion",
                price: "$5,800+",
                description: "Transforms factory gloss paint into a frozen satin finish while providing complete rock-chip and scratch defense.",
                specs: [
                    { label: "Coverage", val: "100% Exterior" },
                    { label: "Finish", val: "Frozen Satin Matte" },
                    { label: "Install Time", val: "5 Days" }
                ]
            }
        ]
    },
    {
        id: "ceramic-coating",
        name: "Ceramic & Graphene Shield",
        detail: "9H/10H Molecular Nano-Matrix",
        image: "/images/services/ceramic-coating.webp",
        imagePlaceholderNotice: "Recommended: 1200x800 Extreme water beading droplets on high-gloss obsidian black car hood.",
        description: "SiO2 and graphene oxide coatings chemically bond to clear coat at a molecular level, creating a permanent, glass-like sacrificial barrier that repels water, road salt, bird droppings, and UV radiation.",
        features: [
            "Contact angle exceeding 115° for intense water beading",
            "Chemical resistance across pH 2 to pH 13",
            "Short-wave infrared (IR) cleanroom curing at 65°C",
            "Carfax-registered coating warranty certification"
        ],
        specs: [
            { label: "Surface Hardness", val: "9H - 10H" },
            { label: "Beading Angle", val: "118°" },
            { label: "Chemical Range", val: "pH 2 - pH 13" },
            { label: "IR Baking", val: "65°C (12 Hours)" }
        ],
        variations: [
            {
                id: "pro-ceramic-3yr",
                name: "Professional Ceramic (3-Year)",
                price: "$950+",
                description: "Dual-layer hydrophobic coating offering exceptional gloss enhancement and UV defense for daily-driven performance cars.",
                specs: [
                    { label: "Durability", val: "36 Months" },
                    { label: "Layer Count", val: "2 Coats" },
                    { label: "Cure Time", val: "24 Hours" }
                ]
            },
            {
                id: "infinite-graphene-5yr",
                name: "Graphene Matrix Elite (5-Year)",
                price: "$1,650+",
                description: "Graphene-infused ceramic matrix with lower heat absorption, virtually eliminating water-spotting and offering extreme slickness.",
                specs: [
                    { label: "Durability", val: "60 Months" },
                    { label: "Layer Count", val: "3 Coats (Base + Top)" },
                    { label: "Cure Time", val: "36 Hours" }
                ]
            }
        ]
    },
    {
        id: "wheels-calipers",
        name: "Wheels-Off Ceramic & Calipers",
        detail: "1200°F Thermal Brake Shield",
        image: "/images/services/wheels-ceramic.webp",
        imagePlaceholderNotice: "Recommended: 1200x800 Demounted forged wheel on detailing stand showing ceramic coating applied to barrel and Brembo caliper.",
        description: "Complete removal of all four wheels. Deep ultrasonic wash, acid-free iron decontamination, machine polishing of outer lips and inner barrels, followed by high-temp ceramic coating.",
        features: [
            "Brake dust repelled with a touchless pressure wash",
            "Both wheel face and inner barrels coated 360°",
            "Brembo / Carbon-Ceramic calipers treated and sealed",
            "Torqued strictly to factory OEM specs with digital torque wrench"
        ],
        specs: [
            { label: "Heat Resistance", val: "1200°F (650°C)" },
            { label: "Wheel Coverage", val: "Face + Barrel (360°)" },
            { label: "Caliper Treatment", val: "Cleaned & Coated" },
            { label: "Durability", val: "2 Years" }
        ],
        variations: [
            {
                id: "wheel-face",
                name: "Wheel Face Barrier",
                price: "$350",
                description: "On-vehicle deep clean and ceramic application to outer wheel faces.",
                specs: [
                    { label: "Coverage", val: "Faces Only" },
                    { label: "Duration", val: "4 Hours" }
                ]
            },
            {
                id: "wheels-off-complete",
                name: "Full Wheels-Off Atelier Treatment",
                price: "$750",
                description: "Wheels removed, barrels polished, ceramic applied to faces, inner barrels, and brake calipers.",
                specs: [
                    { label: "Coverage", val: "360° Barrel + Caliper" },
                    { label: "Duration", val: "1 Day" }
                ]
            }
        ]
    },
    {
        id: "interior-restoration",
        name: "Bespoke Leather & Interior Revival",
        detail: "Dry Steam & Connolly Conditioning",
        image: "/images/services/interior-detail.webp",
        imagePlaceholderNotice: "Recommended: 1200x800 Pristine supercar interior with matte finish leather steering wheel and alcantara seats.",
        description: "Restorative deep detailing tailored for Connolly, Nappa, and semi-aniline leathers. Sub-micron steam extraction lifts embedded body oils, while organic conditioners restore natural factory matte sheen without sticky silicone.",
        features: [
            "Sub-micron dry steam extraction lifts ground-in dirt",
            "pH-balanced Swissvax organic hide feeder",
            "Hydrophobic ceramic fabric barrier on carpets and floor mats",
            "Alcantara nap revitalized with zero matting"
        ],
        specs: [
            { label: "Finish Quality", val: "Factory OEM Matte" },
            { label: "Steam Temp", val: "180°C Sanitized" },
            { label: "Leather Shield", val: "Hydrophobic Ceramic" },
            { label: "Turnaround", val: "1 - 2 Days" }
        ],
        variations: [
            {
                id: "cabin-spa",
                name: "Signature Cabin Detail",
                price: "$450+",
                description: "Deep dry steam cleaning, vents sanitized, all leather conditioned, glass crystal polished inside and out.",
                specs: [
                    { label: "Focus", val: "Deep Hygiene & Matte Clean" },
                    { label: "Duration", val: "1 Day" }
                ]
            },
            {
                id: "leather-ceramic-guard",
                name: "Full Leather & Alcantara Ceramic Armor",
                price: "$850+",
                description: "Every leather surface sealed with flexible ceramic coating, preventing denim blue transfer and dye stains.",
                specs: [
                    { label: "Protection", val: "Anti-Dye Transfer & Liquid Barrier" },
                    { label: "Duration", val: "2 Days" }
                ]
            }
        ]
    },
    {
        id: "undercarriage-cryo",
        name: "Cryogenic Dry-Ice Preservation",
        detail: "Sub-Zero Decontamination (No Water)",
        image: "/images/services/dry-ice.webp",
        imagePlaceholderNotice: "Recommended: 1200x800 Underside of classic Porsche or Ferrari on lift being blasted clean with dry ice pellets.",
        description: "High-velocity dry-ice (CO2) pellet blasting lifts decades of road grime, cosmoline, and grease upon sublimation, without water, abrasion, or chemical residue.",
        features: [
            "100% non-abrasive; preserves factory zinc platings and paint marks",
            "Zero water introduced to vintage wiring or sensors",
            "Restores OEM raw metal, suspension arms, and transmission casings",
            "Protective satin anti-corrosion barrier applied post-blast"
        ],
        specs: [
            { label: "Blast Material", val: "Dry Ice Pellets (-78.5°C)" },
            { label: "Water Introduced", val: "0.00 %" },
            { label: "Abrasiveness", val: "Zero Surface Damage" },
            { label: "Turnaround", val: "2 - 3 Days" }
        ],
        variations: [
            {
                id: "engine-bay-cryo",
                name: "Engine Bay Cryo Restoration",
                price: "$550+",
                description: "Complete top-side engine bay decontamination without pressure washing delicate electronics.",
                specs: [
                    { label: "Area", val: "Top Engine Bay & Firewall" },
                    { label: "Duration", val: "1 Day" }
                ]
            },
            {
                id: "full-undercarriage",
                name: "Complete Chassis & Suspension Cryo",
                price: "$1,950+",
                description: "Full underbody on hydraulic lift. Wheel wells, suspension arms, subframes, floor pans blasted to bare original metal.",
                specs: [
                    { label: "Area", val: "100% Undercarriage" },
                    { label: "Duration", val: "3 Days" }
                ]
            }
        ]
    }
];

export const portfolioBuilds: PortfolioBuild[] = [
    {
        id: "porsche-gt3rs",
        name: "Porsche 911 GT3 RS",
        project: "Weissach Package // Full Body PPF",
        image: "/images/portfolio/porsche-gt3rs.webp",
        imagePlaceholderNotice: "Recommended: 1920x1080 High-angle studio photo of Shark Blue or Lizard Green GT3 RS under softbox lights.",
        description: "Commissioned for complete track protection prior to Nürburgring shakedown. Full body 8mil self-healing PPF installed with 100% wrapped edges, topped with dual-layer Gyeon Q² Infinite ceramic coating.",
        specs: [
            { label: "Correction", value: "Level 2 Concourse" },
            { label: "Protection", value: "Full XPEL Ultimate Plus PPF" },
            { label: "Coating", value: "Gyeon Q² Infinite 9H" },
            { label: "Gloss Metric", value: "99.4 GU" }
        ],
        highlights: [
            "Full Disassembly: Mirrors, lights & aero wing wrapped with 0 visible seams",
            "Carbon Fiber Aero Wings treated with specialized UV-filtering ceramic",
            "Magnesium wheels removed and coated at 1200°F thermal resistance",
            "Interior alcantara treated with hydrophobic oleophobic shield"
        ]
    },
    {
        id: "ferrari-812",
        name: "Ferrari 812 Superfast",
        project: "Nero Daytona // 99.8% Mirror Jeweling",
        image: "/images/portfolio/ferrari-812.webp",
        imagePlaceholderNotice: "Recommended: 1920x1080 Deep gloss black Ferrari 812 with crisp LED reflections.",
        description: "Arrived with heavy dealership swirl marks and buffer trails. Underwent a 3-stage rotary compounding and finishing jeweling cycle, followed by a 10H graphene nano-coating and full Connolly leather restoration.",
        specs: [
            { label: "Correction", value: "Level 3 Concourse Jeweling" },
            { label: "Protection", value: "10H Graphene Oxide Matrix" },
            { label: "Interior", value: "Swissvax Leather Preservation" },
            { label: "Gloss Metric", value: "99.8 GU" }
        ],
        highlights: [
            "Paint thickness mapped across 48 digital ultrasound points",
            "All buffer trails and dealership micro-holograms eradicated",
            "Infrared short-wave heat curing at 65°C for 24 hours",
            "Full leather interior feed restoring OEM matte touch"
        ]
    },
    {
        id: "amg-g63",
        name: "Mercedes-AMG G63",
        project: "Obsidian Black // Stealth Matte Conversion",
        image: "/images/portfolio/amg-g63.webp",
        imagePlaceholderNotice: "Recommended: 1920x1080 Satin matte wrapped G-Wagon in cleanroom atelier studio.",
        description: "Complete transformation from factory high-gloss Obsidian Black into an aggressive Frozen Satin finish using self-healing stealth PPF, including custom treatment for exposed carbon spare wheel cover.",
        specs: [
            { label: "Transformation", value: "Full Stealth Satin PPF" },
            { label: "Coverage", value: "100% Exterior Painted Panels" },
            { label: "Wheels", value: "22\" Forged Wheels-Off Ceramic" },
            { label: "Warranty", value: "10-Year Manufacturer Shield" }
        ],
        highlights: [
            "Exposed door hinges, handles, and brush guards individually wrapped",
            "Satin ceramic top-coat applied to repel water and fingerprint oils",
            "Undercarriage steam decontaminated and anti-rust sealed",
            "Ceramic window tint providing 99% infrared heat rejection"
        ]
    }
];

export const detailingFaqs = (brandName: string, city: string) => [
    {
        q: "What is the difference between Paint Protection Film (PPF) and Ceramic Coating?",
        a: "PPF (Paint Protection Film) is a thick, 8mil self-healing urethane barrier designed specifically to absorb physical impacts like rock chips, gravel, and door dings. Ceramic Coating is a microscopic nano-liquid (approx. 2-3 microns) that chemically bonds to clear coat to provide intense gloss, UV protection, chemical resistance, and extreme water beading. At " + brandName + " " + city + ", our pinnacle treatment combines both: PPF on high-impact areas topped with a full ceramic matrix."
    },
    {
        q: "Will paint correction remove all clear coat from my car?",
        a: "No. Clear coat on modern performance vehicles is approximately 40 to 60 microns thick. A multi-stage paint correction at " + brandName + " only removes 2 to 4 microns—just enough to level the surface imperfections. We measure paint thickness across dozens of points with digital ultrasonic gauges before any polisher touches your vehicle."
    },
    {
        q: "How long does a full treatment take at your facility?",
        a: "A single-stage enhancement takes approximately 1 to 2 days. Multi-stage paint correction with full ceramic coating requires 3 to 4 days, including a mandatory 24-hour cleanroom infrared (IR) bake. Full-body PPF installations take 4 to 6 business days due to extensive edge wrapping and custom pattern tucking."
    },
    {
        q: "How do I maintain my car after ceramic coating or PPF?",
        a: "We recommend a touchless, two-bucket hand wash using pH-neutral foam shampoos and plush microfibers. Avoid automatic brush car washes, which scratch clear coats and degrade film edges. " + brandName + " provides all clients with an Atelier Maintenance Guide and complimentary aftercare wash chemistry."
    }
];
