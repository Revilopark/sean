import { useEffect, useRef } from "react";
import { MapView } from "./Map";
import { Opportunity } from "../../../shared/schema";

interface OpportunityMapProps {
  opportunities: Opportunity[];
  onMarkerClick?: (opportunityId: number) => void;
}

export function OpportunityMap({ opportunities, onMarkerClick }: OpportunityMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  // Bakersfield coordinates
  const BAKERSFIELD_COORDS = { lat: 35.3733, lng: -119.0187 };

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    
    // Add Bakersfield base camp marker
    const baseCampMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: BAKERSFIELD_COORDS,
      title: "Base Camp: Bakersfield",
      content: createCustomMarkerContent("Base Camp", "bg-primary text-primary-foreground"),
    });

    updateMarkers(map);
  };

  const createCustomMarkerContent = (label: string, className: string) => {
    const div = document.createElement("div");
    div.className = `px-2 py-1 rounded-full text-xs font-bold shadow-md border border-white/20 ${className}`;
    div.textContent = label;
    return div;
  };

  const updateMarkers = async (map: google.maps.Map) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.map = null);
    markersRef.current = [];

    const geocoder = new google.maps.Geocoder();
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(BAKERSFIELD_COORDS);

    // Process opportunities and add markers
    // Note: In a real app, we would geocode these once and store coordinates in DB
    // For this demo, we'll geocode on the fly with a small delay to avoid rate limits
    // or use approximate coordinates based on known cities if possible.
    
    // Group opportunities by location to avoid stacking
    const locationGroups = new Map<string, Opportunity[]>();
    opportunities.forEach(opp => {
      const loc = opp.location.split(',')[0].trim(); // Simple city extraction
      if (!locationGroups.has(loc)) {
        locationGroups.set(loc, []);
      }
      locationGroups.get(loc)?.push(opp);
    });

    let delay = 0;
    for (const [location, opps] of Array.from(locationGroups.entries())) {
      // Skip if location is Bakersfield (already marked as Base Camp)
      if (location.toLowerCase().includes("bakersfield")) {
        // Add job markers slightly offset or just update base camp info?
        // For now, let's just ensure bounds include it
        continue;
      }

      setTimeout(() => {
        geocoder.geocode({ address: `${location}, CA` }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const position = results[0].geometry.location;
            
            const marker = new google.maps.marker.AdvancedMarkerElement({
              map,
              position,
              title: `${opps.length} Opportunities in ${location}`,
              content: createCustomMarkerContent(`${opps.length}`, "bg-accent text-accent-foreground"),
            });

            marker.addListener("click", () => {
              // Zoom in or show info window
              map.setZoom(12);
              map.setCenter(position);
              if (onMarkerClick && opps.length > 0) {
                onMarkerClick(opps[0].id); // Just trigger first one for now or handle group
              }
            });

            markersRef.current.push(marker);
            bounds.extend(position);
            map.fitBounds(bounds);
          }
        });
      }, delay);
      delay += 200; // Stagger requests
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      updateMarkers(mapRef.current);
    }
  }, [opportunities]);

  return (
    <div className="rounded-sm overflow-hidden border-2 border-primary/20 shadow-inner">
      <MapView
        initialCenter={BAKERSFIELD_COORDS}
        initialZoom={6}
        onMapReady={handleMapReady}
        className="h-[400px] w-full"
      />
    </div>
  );
}
