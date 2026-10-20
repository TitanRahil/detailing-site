import { PortfolioBuild } from "../data/detailingData";

interface Props {
    build: PortfolioBuild | null;
    onClose: () => void;
    onInquire: (vehicleName: string) => void;
}

export default function PortfolioModal({ build, onClose, onInquire }: Props) {
    if (!build) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
            <div className="relative w-full max-w-4xl bg-[#090514] border border-white/15 rounded-2xl shadow-[0_0_60px_rgba(124,58,237,0.35)] overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-start bg-black/40">
                    <div>
                        <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold block mb-1">
                            {build.project}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                            {build.name}
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

                {/* Content */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
                    {/* Image Slot */}
                    <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden border border-white/10 image-placeholder-box flex items-center justify-center">
                        <img
                            src={build.image}
                            alt={build.name}
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-10 text-center p-6 max-w-md bg-black/70 backdrop-blur-md rounded-xl border border-white/10">
                            <span className="text-purple-400 font-mono text-[10px] uppercase tracking-widest font-bold block mb-1">
                                [ IMAGE SLOT: {build.image} ]
                            </span>
                            <p className="text-gray-300 text-xs font-mono">
                                {build.imagePlaceholderNotice}
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                        {build.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {build.specs.map((s, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                                <span className="text-gray-400 text-[10px] font-mono uppercase block">{s.label}</span>
                                <span className="text-white font-mono text-xs sm:text-sm font-bold mt-1 block truncate">
                                    {s.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Highlights */}
                    <div className="pt-4 border-t border-white/10">
                        <h4 className="text-white font-mono text-xs uppercase tracking-wider font-bold mb-3">
                            Commission Treatment Highlights
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {build.highlights.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                                    <span className="text-purple-400 font-bold">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/40">
                    <span className="text-gray-400 font-mono text-xs">
                        Similar preservation package available for your vehicle.
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            onInquire(build.name);
                        }}
                        className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs tracking-wider uppercase font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
                    >
                        Request This Exact Treatment &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
}
