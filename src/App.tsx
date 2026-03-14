import { useState, useMemo, useEffect } from "react";
import Map3D from "./components/Map3D";
import Overlay from "./components/Overlay";
import CRTOverlay from "./components/CRTOverlay";
import { VirusTablet } from "./components/VirusTablet";
import { Character, Location, locations, gameOrder } from "./data";

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>("All");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [nostalgiaMode, setNostalgiaMode] = useState(false);
  const [heavyNostalgiaMode, setHeavyNostalgiaMode] = useState(false);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [isVirusTabletOpen, setIsVirusTabletOpen] = useState(false);

  // Calculate sorted active locations for the current character
  const sortedActiveLocations = useMemo(() => {
    if (selectedCharacter === "All") return [];

    const activeLocations = locations.filter((loc) =>
      loc.characters.includes(selectedCharacter),
    );

    const getEarliestGameIndex = (loc: Location) => {
      let minIndex = Infinity;
      loc.games.forEach((g) => {
        const idx = gameOrder.indexOf(g);
        if (idx !== -1 && idx < minIndex) minIndex = idx;
      });
      return minIndex;
    };

    return [...activeLocations].sort(
      (a, b) => getEarliestGameIndex(a) - getEarliestGameIndex(b),
    );
  }, [selectedCharacter]);

  const handleSelectCharacter = (char: Character) => {
    setSelectedCharacter(char);
    setCurrentWaypointIndex(0);

    // If switching to a specific character, select their first location automatically
    if (char !== "All") {
      // We need to recalculate this here because the memoized value won't be updated yet
      const activeLocations = locations.filter((loc) =>
        loc.characters.includes(char),
      );
      const getEarliestGameIndex = (loc: Location) => {
        let minIndex = Infinity;
        loc.games.forEach((g) => {
          const idx = gameOrder.indexOf(g);
          if (idx !== -1 && idx < minIndex) minIndex = idx;
        });
        return minIndex;
      };
      const sorted = [...activeLocations].sort(
        (a, b) => getEarliestGameIndex(a) - getEarliestGameIndex(b),
      );

      if (sorted.length > 0) {
        setSelectedLocation(sorted[0]);
      } else {
        setSelectedLocation(null);
      }
    } else {
      // If switching to 'All', keep current selection if valid, otherwise clear
      if (selectedLocation) {
        // Keep it
      } else {
        setSelectedLocation(null);
      }
    }
  };

  const handleNextWaypoint = () => {
    if (currentWaypointIndex < sortedActiveLocations.length - 1) {
      const newIndex = currentWaypointIndex + 1;
      setCurrentWaypointIndex(newIndex);
      setSelectedLocation(sortedActiveLocations[newIndex]);
    }
  };

  const handlePrevWaypoint = () => {
    if (currentWaypointIndex > 0) {
      const newIndex = currentWaypointIndex - 1;
      setCurrentWaypointIndex(newIndex);
      setSelectedLocation(sortedActiveLocations[newIndex]);
    }
  };

  // Sync waypoint index if user manually selects a location
  const handleSelectLocation = (loc: Location | null) => {
    setSelectedLocation(loc);
    if (loc && selectedCharacter !== "All") {
      const index = sortedActiveLocations.findIndex((l) => l.id === loc.id);
      if (index !== -1) {
        setCurrentWaypointIndex(index);
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1a1515] text-slate-50 selection:bg-red-500/30">
      <div className="w-full h-full">
        <Map3D
          selectedCharacter={selectedCharacter}
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
          nostalgiaMode={nostalgiaMode}
          heavyNostalgiaMode={heavyNostalgiaMode}
        />
        <Overlay
          selectedCharacter={selectedCharacter}
          onSelectCharacter={handleSelectCharacter}
          selectedLocation={selectedLocation}
          onCloseLocation={() => setSelectedLocation(null)}
          nostalgiaMode={nostalgiaMode}
          onToggleNostalgia={() => {
            setNostalgiaMode(!nostalgiaMode);
            if (nostalgiaMode) setHeavyNostalgiaMode(false); // turn off heavy when turning off normal
          }}
          heavyNostalgiaMode={heavyNostalgiaMode}
          onToggleHeavyNostalgia={() => setHeavyNostalgiaMode(!heavyNostalgiaMode)}
          onNextWaypoint={handleNextWaypoint}
          onPrevWaypoint={handlePrevWaypoint}
          currentWaypointIndex={currentWaypointIndex}
          totalWaypoints={sortedActiveLocations.length}
          onOpenVirusTablet={() => setIsVirusTabletOpen(true)}
        />
      </div>
      <CRTOverlay enabled={nostalgiaMode} heavy={heavyNostalgiaMode} />
      <VirusTablet
        isOpen={isVirusTabletOpen}
        onClose={() => setIsVirusTabletOpen(false)}
        heavyNostalgiaMode={heavyNostalgiaMode}
      />
    </div>
  );
}
