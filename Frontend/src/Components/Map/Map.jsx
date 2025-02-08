import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "./Map.css";

// Fix default marker icons for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Map = () => {
  const [selectedPosition, setSelectedPosition] = useState([51.505, -0.09]); // Default position
  const [routingControl, setRoutingControl] = useState(null); // Routing control instance
  const [locations, setLocations] = useState([]); // Project locations
  const [mapStyle, setMapStyle] = useState({
    height: "500px",
    width: "100%",
    marginTop: "3rem",
  });

  useEffect(() => {
    // Adjust the map height based on screen width
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setMapStyle({ height: "300px", width: "100%", marginTop: "3rem" });
      } else if (window.innerWidth <= 768) {
        setMapStyle({ height: "400px", width: "100%", marginTop: "3rem" });
      } else {
        setMapStyle({ height: "500px", width: "100%", marginTop: "3rem" });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Fetch project data from the API
    fetch("https://ayzonfoundation.org/api/project-details/")
      .then((response) => response.json())
      .then((data) => {
        const projectLocations = data.map((project) => ({
          id: project.id,
          name: project.title,
          position: [project.latitude, project.longitude],
        }));
        setLocations(projectLocations);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, []);

  // Custom component to handle marker click
  const MarkerWithRouting = ({ position, name }) => {
    const map = useMap();

    const handleMarkerClick = () => {
      // Remove existing routing control if present
      if (routingControl) {
        routingControl.remove();
      }

      // Add new routing control without instructions
      const newRoutingControl = L.Routing.control({
        waypoints: [L.latLng(selectedPosition), L.latLng(position)],
        routeWhileDragging: true,
        show: false,
        createMarker: () => null,
        lineOptions: { styles: [{ color: "#3388ff", weight: 4 }] },
      }).addTo(map);

      newRoutingControl
        .getContainer()
        .classList.add("leaflet-routing-container-hide");
      setRoutingControl(newRoutingControl);
    };

    return (
      <Marker
        position={position}
        eventHandlers={{
          click: handleMarkerClick,
        }}
      >
        <Tooltip direction="top" offset={[0, -20]} opacity={1}>
          {name}
        </Tooltip>
      </Marker>
    );
  };

  // Custom map component to fit the bounds of all markers
  const FitBounds = () => {
    const map = useMap();

    useEffect(() => {
      if (locations.length > 0) {
        const bounds = L.latLngBounds(locations.map((loc) => loc.position));
        map.fitBounds(bounds);
      }
    }, [locations, map]);

    return null;
  };

  return (
    <MapContainer center={selectedPosition} zoom={13} style={mapStyle}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FitBounds />
      {locations.map((loc) => (
        <MarkerWithRouting
          key={loc.id}
          position={loc.position}
          name={loc.name}
        />
      ))}
    </MapContainer>
  );
};

export default Map;
