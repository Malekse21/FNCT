"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type ErosionZone, riskColors } from "@/lib/erosion-data";

const riskRadius: Record<string, number> = {
  critique: 18,
  "élevé": 14,
  "modéré": 11,
  faible: 8,
};

interface ErosionMapProps {
  zones: ErosionZone[];
  onSelectZone: (zone: ErosionZone | null) => void;
  selectedZoneId: string | null;
}

export default function ErosionMapInner({ zones, onSelectZone, selectedZoneId }: ErosionMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.CircleMarker>>({});

  useEffect(() => {
    if (!mapRef.current) return;
    
    // Initialize map
    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current, {
        zoomControl: false,
      }).setView([36.8, 10.18], 11);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OSM',
      }).addTo(leafletMap.current);
    }

    const map = leafletMap.current;

    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    let bounds = L.latLngBounds([]);

    // Add new markers
    zones.forEach(zone => {
      bounds.extend([zone.lat, zone.lng]);
      
      const isSelected = selectedZoneId === zone.id;
      
      const marker = L.circleMarker([zone.lat, zone.lng], {
        radius: riskRadius[zone.risk],
        color: isSelected ? "#263238" : riskColors[zone.risk],
        fillColor: riskColors[zone.risk],
        fillOpacity: isSelected ? 0.9 : 0.55,
        weight: isSelected ? 3 : 1.5,
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="font-family: sans-serif; font-size: 12px; min-width: 180px;">
          <strong style="font-size: 14px; display: block; margin-bottom: 4px;">${zone.name}</strong>
          <span style="display: inline-block; padding: 2px 6px; border-radius: 4px; color: white; font-size: 10px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; background-color: ${riskColors[zone.risk]};">
            ${zone.risk} — ${zone.riskScore}/100
          </span>
          <p style="color: #666; margin-top: 4px; margin-bottom: 0;">${zone.description}</p>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on("click", () => {
        onSelectZone(zone);
      });

      markersRef.current[zone.id] = marker;
    });

    if (zones.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [zones, onSelectZone, selectedZoneId]);

  return (
    <div className="w-full h-full rounded-[4px] overflow-hidden border-[1.5px] border-[#455A64]/30 relative z-0">
      <div ref={mapRef} className="w-full h-full" style={{ background: "#EDE8E0" }} />
    </div>
  );
}
