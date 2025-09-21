"use client";

import { useState, useEffect, useRef } from "react";
import {GoogleMap,Marker,DirectionsRenderer,useLoadScript,} from "@react-google-maps/api";
import { FaCar, FaWalking, FaBicycle, FaPlus, FaMinus } from "react-icons/fa";
import { useLocale } from "next-intl";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

interface NavigationMapWithVoiceProps {
  destination: { lat: number; lng: number };
}

export default function NavigationMapWithVoice({ destination }: NavigationMapWithVoiceProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  const locale = useLocale()
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode>('DRIVING' as google.maps.TravelMode);
  const [eta, setEta] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(15);

  const mapRef = useRef<google.maps.Map | null>(null);

  const spokenStepsRef = useRef<Set<number>>(new Set()); 

  const transportModes = [
    { mode: "DRIVING", label: "سيارة", icon: <FaCar /> },
    { mode: "WALKING", label: "سير", icon: <FaWalking /> },
    { mode: "BICYCLING", label: "دراجة", icon: <FaBicycle /> },
  ];

  // Text-to-Speech
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale; 
    window.speechSynthesis.speak(utterance);
  };


  useEffect(() => {
    if (!navigationStarted || !navigator.geolocation) return;

    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);

        if (mapRef.current) mapRef.current.panTo(newLocation);

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: newLocation,
            destination,
            travelMode,
          },
          (result, status) => {
            if (status === "OK" && result) {
              setDirections(result);

              const leg = result.routes[0].legs[0];
              setEta(leg.duration?.text || null);
              setDistance(leg.distance?.text || null);

              leg.steps.forEach((step, idx) => {
                if (!spokenStepsRef.current.has(idx)) {
                  const stepEnd = step.end_location;
                  const distanceMeters = haversineDistance(newLocation, {
                    lat: stepEnd.lat(),
                    lng: stepEnd.lng(),
                  });
                  if (distanceMeters <= 20) {
                    speak(step.instructions.replace(/<[^>]+>/g, "")); // إزالة HTML
                    spokenStepsRef.current.add(idx);
                  }
                }
              });
            }
          }
        );
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [navigationStarted, travelMode, destination]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  if (!isLoaded) return <div>Loading Map...</div>;
  if (!userLocation) return <div>Getting your location...</div>;

  const haversineDistance = (loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371e3; 
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLng = toRad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="flex flex-col h-screen relative">
      {/* ETA*/}
      {eta && distance && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded shadow-md text-center font-semibold">
          {`المسافة: ${distance} | الوقت المتوقع: ${eta}`}
        </div>
      )}

      {/* Transporter*/}
      <div className="flex justify-center gap-2 p-2 bg-white shadow-md z-10">
        {transportModes.map((t) => (
          <button
            key={t.mode}
            className={`flex items-center gap-1 px-3 py-2 rounded font-semibold ${
              travelMode === t.mode ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setTravelMode(t.mode as google.maps.TravelMode)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Start */}
      <div className="flex justify-center p-2 bg-white shadow-md z-10">
        <button
          className={`px-4 py-2 rounded font-semibold ${
            navigationStarted ? "bg-green-500 text-white" : "bg-green-600 text-white hover:bg-green-700"
          }`}
          onClick={() => setNavigationStarted(true)}
          disabled={navigationStarted}
        >
          {navigationStarted ? "الرحلة بدأت" : "ابدأ الرحلة"}
        </button>
      </div>

      {/* Zoom */}
      <div className="absolute right-2 top-48 flex flex-col gap-2 z-20">
        <button
          className="bg-white shadow-md rounded p-2"
          onClick={() => setZoom((prev) => Math.min(prev + 1, 21))}
        >
          <FaPlus />
        </button>
        <button
          className="bg-white shadow-md rounded p-2"
          onClick={() => setZoom((prev) => Math.max(prev - 1, 0))}
        >
          <FaMinus />
        </button>
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={zoom}
        onLoad={(map)=>{mapRef.current = map }}
        // onLoad={(map) => (mapRef.current = map)}
      >
        <Marker position={destination} label="المطعم" />
        <Marker position={userLocation} label="أنت" />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* turn-by-turn */}
      {directions && (
        <div className="absolute bottom-0 w-full max-h-64 overflow-y-auto bg-white/90 backdrop-blur-sm p-4 border-t shadow-inner">
          <h2 className="font-bold mb-2 text-center text-lg">خطوات الوصول</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {directions.routes[0].legs[0].steps.map((step, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: step.instructions }} />
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
