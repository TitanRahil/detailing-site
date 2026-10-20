import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBrand } from "../context/BrandContext";

export default function Navbar() {
    const brand = useBrand();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const isPast = window.scrollY > 50;
            setScrolled(prev => (prev !== isPast ? isPast : prev));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    const handleHashScroll = (to: string) => {
        setIsMobileMenuOpen(false);
        if (to.includes("#")) {
            const targetId = to.split("#")[1];
            if (location.pathname === "/") {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    const navLinks = [
        { name: "Catalog", link: "/#modifications" },
        { name: "Builds", link: "/#builds" },
        { name: "Estimator", link: "/#configurator" },
        { name: "Book Now", link: "/#booking" },
        { name: "Atelier", link: "/#about" },
        { name: "FAQ", link: "/#faq" }
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
                scrolled || isMobileMenuOpen
                    ? "py-4 bg-[#030005]/85 backdrop-blur-xl border-purple-900/20 shadow-2xl"
                    : "py-7 bg-gradient-to-b from-black/90 to-transparent border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-20 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="group relative z-10 block pr-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-lg sm:text-xl md:text-2xl font-black italic tracking-tight text-white pr-2 whitespace-nowrap truncate max-w-[220px] sm:max-w-[320px] md:max-w-[300px] lg:max-w-[420px]">
                            {brand.upper}
                        </span>
                        <div className="h-2 w-2 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] group-hover:scale-125 transition-transform shrink-0 self-center" />
                    </div>
                    <span className="block font-mono text-[9px] tracking-[0.3em] uppercase text-purple-400 font-semibold pl-0.5">
                        PAINT PRESERVATION LAB
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.link}
                            onClick={() => handleHashScroll(item.link)}
                            className="text-xs font-mono tracking-widest uppercase text-gray-300 hover:text-white transition-colors duration-200 relative group py-1"
                        >
                            {item.name}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#a855f7]" />
                        </a>
                    ))}
                </div>

                {/* Right Call-To-Action Button */}
                <div className="hidden sm:flex items-center gap-4">
                    <a
                        href="/#booking"
                        onClick={() => handleHashScroll("/#booking")}
                        className="px-5 py-2.5 rounded-xl bg-purple-600/90 hover:bg-purple-500 text-white font-mono text-xs tracking-wider uppercase font-bold transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] flex items-center gap-2"
                    >
                        <span>Reserve Bay</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Navigation Menu"
                    className="lg:hidden relative z-50 p-2 text-white hover:text-purple-400 focus:outline-none transition-colors"
                >
                    <div className="w-6 h-5 flex flex-col justify-between items-end">
                        <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-6 -rotate-45 translate-y-2 bg-purple-400" : "w-6"}`} />
                        <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "w-4"}`} />
                        <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-6 rotate-45 -translate-y-2 bg-purple-400" : "w-5"}`} />
                    </div>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`fixed inset-0 bg-[#030005]/98 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center px-8 z-40 lg:hidden ${
                    isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex flex-col gap-6">
                    {navLinks.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.link}
                            onClick={() => handleHashScroll(item.link)}
                            className="text-2xl font-black uppercase tracking-tight text-white/90 hover:text-purple-400 transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="pt-6 border-t border-white/10 mt-4">
                        <a
                            href="/#booking"
                            onClick={() => handleHashScroll("/#booking")}
                            className="w-full py-4 rounded-xl bg-purple-600 text-center text-white font-mono text-sm tracking-widest uppercase font-bold block"
                        >
                            Reserve Cleanroom Bay
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
