import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  User,
  Gamepad2,
  X,
  Activity,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Target,
  Database,
  Globe,
  ChevronDown,
} from "lucide-react";
import { Location, Character, characters, characterPortraits } from "../data";
import { useTranslation } from "react-i18next";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
];

interface OverlayProps {
  selectedCharacter: Character;
  onSelectCharacter: (char: Character) => void;
  selectedLocation: Location | null;
  onCloseLocation: () => void;
  nostalgiaMode: boolean;
  onToggleNostalgia: () => void;
  heavyNostalgiaMode?: boolean;
  onToggleHeavyNostalgia?: () => void;
  onNextWaypoint?: () => void;
  onPrevWaypoint?: () => void;
  currentWaypointIndex?: number;
  totalWaypoints?: number;
  onOpenVirusTablet?: () => void;
}

export default function Overlay({
  selectedCharacter,
  onSelectCharacter,
  selectedLocation,
  onCloseLocation,
  nostalgiaMode,
  onToggleNostalgia,
  heavyNostalgiaMode,
  onToggleHeavyNostalgia,
  onNextWaypoint,
  onPrevWaypoint,
  currentWaypointIndex = 0,
  totalWaypoints = 0,
  onOpenVirusTablet,
}: OverlayProps) {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  const currentLangName = languages.find(l => l.code === i18n.language.split('-')[0])?.name || i18n.language.toUpperCase();

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 overflow-hidden">
      {/* Header */}
      <header className="pointer-events-auto flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className={`text-3xl font-black tracking-tighter text-red-600 uppercase drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] ${heavyNostalgiaMode ? "font-pixel" : ""}`}>
              {t('app.title')}
            </h1>
            <h2 className={`text-sm font-mono text-red-500/80 tracking-widest uppercase mt-1 ${heavyNostalgiaMode ? "font-pixel" : ""}`}>
              {t('app.subtitle')}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleNostalgia}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-all duration-300 w-fit
                ${
                  nostalgiaMode
                    ? "bg-green-900/30 border-green-500/50 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                    : "bg-[#1a1515]/60 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600"
                }
              `}
            >
              <Monitor size={14} />
              {nostalgiaMode ? t('app.nostalgia_on') : t('app.nostalgia_off')}
            </button>

            {nostalgiaMode && onToggleHeavyNostalgia && (
              <button
                onClick={onToggleHeavyNostalgia}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-all duration-300 w-fit
                  ${
                    heavyNostalgiaMode
                      ? "bg-purple-900/30 border-purple-500/50 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                      : "bg-[#1a1515]/60 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-600"
                  }
                `}
              >
                <Activity size={14} />
                {heavyNostalgiaMode ? t('app.crt_max') : t('app.crt_min')}
              </button>
            )}

            {onOpenVirusTablet && (
              <button
                onClick={onOpenVirusTablet}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border bg-[#1a1515]/60 border-slate-800 text-slate-500 hover:text-red-400 hover:border-red-800/50 text-xs font-mono uppercase tracking-wider transition-all duration-300 w-fit"
              >
                <Database size={14} />
                {t('app.virus_database')}
              </button>
            )}
          </div>
        </div>

        {/* Language Dropdown - Top Right */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-all duration-300
              ${isLangOpen 
                ? "bg-red-900/30 border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(220,38,38,0.2)]" 
                : "bg-[#1a1515]/60 border-slate-800 text-slate-500 hover:text-blue-400 hover:border-blue-800/50"
              }
            `}
          >
            <Globe size={14} />
            <span>{currentLangName}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-40 bg-[#1a1515]/95 backdrop-blur-md border border-red-900/50 rounded-lg overflow-hidden z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              >
                <div className="max-h-64 overflow-y-auto custom-scrollbar py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`
                        w-full text-left px-4 py-2 text-xs font-mono transition-colors
                        ${i18n.language.startsWith(lang.code)
                          ? "bg-red-950/50 text-red-400"
                          : "text-slate-400 hover:bg-red-900/20 hover:text-slate-200"
                        }
                      `}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Character Filter (Left Sidebar) */}
      <div className="pointer-events-auto absolute left-6 top-1/2 -translate-y-1/2 flex flex-col w-56">
        {/* Character Portrait - Positioned absolutely to the right of the menu */}
        <AnimatePresence mode="wait">
          {selectedCharacter !== "All" && (
            <motion.div
              key={selectedCharacter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-full top-0 ml-6 w-48 rounded-lg overflow-hidden border border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.2)] group z-50"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1515] via-transparent to-transparent z-10" />
              <img
                src={characterPortraits[selectedCharacter]}
                alt={t(`characters.${selectedCharacter}`)}
                className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-3 z-20">
                <span className={`text-xs font-mono font-bold text-red-100 drop-shadow-md ${heavyNostalgiaMode ? "font-pixel" : ""}`}>
                  {t(`characters.${selectedCharacter}`).toUpperCase()}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-xs font-mono text-slate-400 uppercase mb-2 flex items-center gap-2 bg-[#1a1515]/80 p-2 rounded backdrop-blur-sm border border-red-900/30">
          <Activity size={14} className="text-red-500" />
          {t('app.track_subject')}
        </div>

        <div className="flex flex-col gap-1.5">
          {characters.map((char) => (
            <button
              key={char}
              onClick={() => onSelectCharacter(char)}
              className={`
                text-left px-4 py-2.5 rounded font-mono text-sm transition-all duration-200 border-l-2 backdrop-blur-sm
                ${
                  selectedCharacter === char
                    ? "bg-red-950/70 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    : "bg-[#1a1515]/60 border-transparent text-slate-400 hover:bg-red-950/40 hover:text-slate-200 hover:border-red-800/50"
                }
              `}
            >
              {t(`characters.${char}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Waypoint Navigation Controls */}
      {selectedCharacter !== "All" && totalWaypoints > 0 && (
        <div className="pointer-events-auto absolute left-6 bottom-6 flex items-center gap-2 z-50">
          <button
            onClick={onPrevWaypoint}
            disabled={currentWaypointIndex <= 0}
            className="p-2 bg-[#1a1515]/80 border border-red-900/50 rounded hover:bg-red-950/60 disabled:opacity-30 disabled:cursor-not-allowed text-red-400 transition-colors backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>

          <div className={`px-4 py-2 bg-[#1a1515]/80 border border-red-900/50 rounded font-mono text-xs text-red-400 flex items-center gap-2 backdrop-blur-sm ${heavyNostalgiaMode ? "font-pixel" : ""}`}>
            <Target size={14} />
            <span>
              {t('app.waypoint', { current: currentWaypointIndex + 1, total: totalWaypoints })}
            </span>
          </div>

          <button
            onClick={onNextWaypoint}
            disabled={currentWaypointIndex >= totalWaypoints - 1}
            className="p-2 bg-[#1a1515]/80 border border-red-900/50 rounded hover:bg-red-950/60 disabled:opacity-30 disabled:cursor-not-allowed text-red-400 transition-colors backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Location Details Panel (Right Sidebar) */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="pointer-events-auto absolute right-6 top-24 bottom-6 w-80 bg-[#1a1515]/90 backdrop-blur-xl border border-red-900/50 rounded-xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          >
            {/* Panel Header */}
            <div className="p-4 border-b border-red-900/50 bg-red-950/20 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-red-500 mb-1">
                  <MapPin size={16} />
                  <span className="text-xs font-mono uppercase tracking-wider">
                    {t('app.location_data')}
                  </span>
                </div>
                <h3 className={`text-xl font-bold text-slate-100 leading-tight ${heavyNostalgiaMode ? "font-pixel" : ""}`}>
                  {t(`locations.${selectedLocation.id}.name`)}
                </h3>
              </div>
              <button
                onClick={onCloseLocation}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Panel Content */}
            <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Gamepad2 size={14} />
                  <span className="text-xs font-mono uppercase">
                    {t('app.featured_in')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.games.map((game) => (
                    <span
                      key={game}
                      className="px-2 py-1 bg-[#241c1c] text-red-400 text-xs font-mono rounded border border-red-900/50"
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <User size={14} />
                  <span className="text-xs font-mono uppercase">
                    {t('app.subjects_present')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.characters.map((char) => (
                    <span
                      key={char}
                      className={`px-2 py-1 text-xs font-mono rounded border ${
                        selectedCharacter === char
                          ? "bg-red-900/60 text-red-300 border-red-700/60 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                          : "bg-[#241c1c] text-slate-400 border-slate-800/60"
                      }`}
                    >
                      {t(`characters.${char}`)}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Activity size={14} />
                  <span className="text-xs font-mono uppercase">
                    {t('app.incident_summary')}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t(`locations.${selectedLocation.id}.summary`)}
                </p>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-red-900/50 bg-red-950/20 text-xs font-mono text-slate-500 flex justify-between">
              <span>{t('app.lat')}: {selectedLocation.lat.toFixed(4)}</span>
              <span>{t('app.lng')}: {selectedLocation.lng.toFixed(4)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Instructions - Only show when no character selected or no waypoints */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center flex flex-col gap-2">
        {selectedCharacter === "All" && (
          <p className="text-xs font-mono text-red-400/80 bg-[#1a1515]/80 px-5 py-2.5 rounded-full backdrop-blur-md border border-red-900/50 shadow-lg">
            {t('app.instructions')}
          </p>
        )}
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter opacity-50 whitespace-nowrap">
          Resident Evil is a trademark of Capcom. Character art by Fandom Wiki &{" "}
          <a
            href="https://www.evilsource.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-400 transition-colors pointer-events-auto"
          >
            EvilSource.com
          </a>
          {" "}· Non-commercial fan project ·{" "}
          <a
            href="https://github.com/VittorioCodes/RE_World_Map"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-400 transition-colors pointer-events-auto"
          >
            GitHub
          </a>
        </p>
      </div>
      </div>
    </div>
  );
}
