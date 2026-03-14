import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  X,
  Biohazard,
  Activity,
  ShieldAlert,
  Database,
  Cpu,
} from "lucide-react";
import { viruses, Virus } from "../data";

interface VirusTabletProps {
  isOpen: boolean;
  onClose: () => void;
  heavyNostalgiaMode?: boolean;
}

export const VirusTablet: React.FC<VirusTabletProps> = ({
  isOpen,
  onClose,
  heavyNostalgiaMode,
}) => {
  const { t } = useTranslation();
  const [selectedVirus, setSelectedVirus] = useState<Virus>(viruses[0]);

  const fontClass = heavyNostalgiaMode ? "font-pixel" : "font-mono";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-auto bg-black/60 backdrop-blur-md"
        >
          {/* Tablet Frame */}
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-6xl h-[85vh] bg-[#0a0505] border-4 border-[#1a1a1a] rounded-[2rem] shadow-[0_0_80px_rgba(220,38,38,0.15)] flex flex-col relative overflow-hidden ring-1 ring-red-900/50"
          >
            {/* Tablet Hardware Details */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-xl flex items-center justify-center gap-2 z-20">
              <div className="w-2 h-2 rounded-full bg-red-500/50 animate-pulse" />
              <div className="w-12 h-1 rounded-full bg-black/50" />
            </div>

            {/* Screen Content */}
            <div className="flex-1 m-3 sm:m-6 bg-[#0f0a0a] rounded-xl border border-red-900/30 overflow-hidden flex flex-col relative">
              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[length:100%_4px] z-10" />

              {/* Header */}
              <div className="h-16 border-b border-red-900/30 bg-red-950/20 flex items-center justify-between px-6 relative z-20">
                <div className="flex items-center gap-3 text-red-500">
                  <Biohazard className="w-6 h-6 animate-pulse" />
                  <h2 className={`${fontClass} text-xl font-bold tracking-widest uppercase`}>
                    {t("app.virus_database")}
                  </h2>
                  <span className={`text-xs ${fontClass} text-red-500/50 ml-2 px-2 py-1 border border-red-900/50 rounded bg-red-950/30`}>
                    CLASSIFIED
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-red-500 hover:text-red-400 hover:bg-red-950/50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-20">
                {/* Left Sidebar - Virus List */}
                <div className="w-full md:w-1/3 border-r border-red-900/30 bg-black/40 overflow-y-auto custom-scrollbar">
                  <div className="p-4 space-y-2">
                    {viruses.map((virus) => (
                      <button
                        key={virus.id}
                        onClick={() => setSelectedVirus(virus)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 group
                          ${
                            selectedVirus.id === virus.id
                              ? "bg-red-950/40 border-red-500/50 shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]"
                              : "bg-black/20 border-red-900/20 hover:border-red-500/30 hover:bg-red-950/20"
                          }`}
                      >
                        <div
                          className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]"
                          style={{
                            color: virus.color,
                            backgroundColor: virus.color,
                          }}
                        />
                        <div className="flex-1">
                          <div
                            className={`${fontClass} font-bold uppercase tracking-wider ${selectedVirus.id === virus.id ? "text-red-400" : "text-red-500/70 group-hover:text-red-400"}`}
                          >
                            {t(`viruses.${virus.id}.name`)}
                          </div>
                          <div className={`text-xs ${fontClass} text-red-500/40 mt-1`}>
                            {virus.year}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Area - Details */}
                <div className="flex-1 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)] overflow-y-auto custom-scrollbar p-6 lg:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedVirus.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="max-w-3xl mx-auto space-y-8"
                    >
                      {/* Title Section */}
                      <div className="border-b border-red-900/30 pb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center border border-current/30 shadow-[0_0_30px_currentColor]"
                            style={{
                              color: selectedVirus.color,
                              backgroundColor: `${selectedVirus.color}15`,
                            }}
                          >
                            <Biohazard className="w-8 h-8" />
                          </div>
                          <div>
                            <h3
                              className={`text-3xl ${fontClass} font-bold text-white tracking-widest uppercase`}
                              style={{
                                textShadow: `0 0 20px ${selectedVirus.color}80`,
                              }}
                            >
                              {t(`viruses.${selectedVirus.id}.name`)}
                            </h3>
                            <div className={`flex items-center gap-4 mt-2 ${fontClass} text-sm`}>
                              <span className="text-red-400 flex items-center gap-1">
                                <Cpu className="w-4 h-4" />{" "}
                                {t(`viruses.${selectedVirus.id}.creator`)}
                              </span>
                              <span className="text-red-500/50">•</span>
                              <span className="text-red-400 flex items-center gap-1">
                                <Database className="w-4 h-4" />{" "}
                                {selectedVirus.year}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info Cards */}
                      <div className="grid grid-cols-1 gap-6">
                        <div className="bg-black/40 border border-red-900/30 rounded-xl p-6 relative overflow-hidden group">
                          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
                          <h4 className={`${fontClass} text-red-500 mb-3 flex items-center gap-2 uppercase tracking-wider text-sm`}>
                            <ShieldAlert className="w-4 h-4" /> {t("app.description")}
                          </h4>
                          <p className="text-gray-300 leading-relaxed font-sans">
                            {t(`viruses.${selectedVirus.id}.description`)}
                          </p>
                        </div>

                        <div className="bg-black/40 border border-red-900/30 rounded-xl p-6 relative overflow-hidden group">
                          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
                          <h4 className={`${fontClass} text-red-500 mb-3 flex items-center gap-2 uppercase tracking-wider text-sm`}>
                            <Activity className="w-4 h-4" /> {t("app.symptoms")}
                          </h4>
                          <p className="text-gray-300 leading-relaxed font-sans">
                            {t(`viruses.${selectedVirus.id}.symptoms`)}
                          </p>
                        </div>
                      </div>

                      {/* Decorative Tech Elements */}
                      <div className={`pt-8 flex items-center justify-between text-red-900/40 ${fontClass} text-xs`}>
                        <div className="flex gap-2">
                          <span className="animate-pulse">●</span>
                          <span>SYS.OP.NORMAL</span>
                        </div>
                        <div>
                          UMBRELLA CORP. ARCHIVE // {new Date().getFullYear()}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
