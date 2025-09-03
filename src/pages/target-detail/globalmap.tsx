import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 修复 Leaflet 图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 创建自定义高亮图标
const highlightIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// 创建蓝色图标
const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// 地图初始化组件
function MapInitializer() {
  const map = useMap();

  useEffect(() => {
    // 确保地图容器正确初始化
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

interface LocationPoint {
  id: string;
  name: string;
  position: [number, number];
  description?: string;
  type?: string;
}

interface WorldMapProps {
  center?: [number, number];
  zoom?: number;
  locations?: LocationPoint[];
  height?: string;
  width?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({
  center = [20, 0], // 世界地图中心
  zoom = 2, // 显示整个世界
  locations = [
    {
      id: "1",
      name: "China",
      position: [35.8617, 104.1954],
      description: "Fastest growing market region",
      type: "city",
    },
    {
      id: "2",
      name: "India",
      position: [20.5937, 78.9629],
      description: "",
      type: "city",
    },
    {
      id: "3",
      name: "Mexico",
      position: [23.6345, -102.5528],
      description: "",
      type: "city",
    },
    {
      id: "4",
      name: "Germany",
      position: [51.1657, 10.4515],
      description: "",
      type: "city",
    },
    {
      id: "5",
      name: "France",
      position: [46.2276, 2.2137],
      description: "",
      type: "city",
    },
    {
      id: "6",
      name: "US",
      position: [37.0902, -95.7129],
      description: "Accounts for 40-45% Market Share",
      type: "city",
    },
    {
      id: "7",
      name: "Tokyo",
      position: [35.6762, 139.6503],
      description: "",
      type: "city",
    },
    {
      id: "8",
      name: "Italy",
      position: [41.8719, 12.5674],
      description: "",
      type: "city",
    },
    {
      id: "9",
      name: "Russia",
      position: [61.524, 105.3188],
      description: "",
      type: "city",
    },
    {
      id: "10",
      name: "South Korea",
      position: [35.9078, 127.7669],
      description: "",
      type: "city",
    },
    {
      id: "11",
      name: "Brazil",
      position: [-14.235, -51.9253],
      description: "",
      type: "city",
    },
    {
      id: "12",
      name: "Argentina",
      position: [-25.2744, -57.5698],
      description: "",
      type: "city",
    },
    {
      id: "13",
      name: "Turkey",
      position: [38.9637, 35.2433],
      description: "",
      type: "city",
    },
    {
      id: "14",
      name: "Israel",
      position: [31.7683, 35.2137],
      description: "",
      type: "city",
    },
    {
      id: "15",
      name: "Saudi Arabia",
      position: [23.8859, 45.0792],
      description: "",
      type: "city",
    },
    {
      id: "16",
      name: "Spain",
      position: [40.4637, -3.7492],
      description: "",
      type: "city",
    },
    {
      id: "17",
      name: "Sweden",
      position: [60.1282, 18.6435],
      description: "",
      type: "city",
    },
    {
      id: "18",
      name: "Norway",
      position: [60.472, 8.4689],
      description: "",
      type: "city",
    },
    {
      id: "19",
      name: "Australia",
      position: [-25.2744, 133.7751],
      description: "",
      type: "city",
    },
    {
      id: "20",
      name: "Thailand",
      position: [15.87, 100.9925],
      description: "",
      type: "city",
    },
    {
      id: "21",
      name: "South Africa",
      position: [-29.0469, 24.685],
      description: "",
      type: "city",
    },
    {
      id: "22",
      name: "UAE",
      position: [23.4241, 53.8478],
      description: "",
      type: "city",
    },
    {
      id: "23",
      name: "Kuwait",
      position: [23.4241, 53.8478],
      description: "",
      type: "city",
    },
  ],
  height = "300px", // 从600px减少到400px
  width = "100%",
}) => {
  return (
    <div
      style={{
        height,
        width,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        zoomControl={true}
        doubleClickZoom={true}
        boxZoom={true}
        keyboard={true}
        dragging={true}
      >
        <MapInitializer />

        {/* 使用 OpenStreetMap 瓦片服务 */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {/* 标记所有位置点 */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            icon={
              location.name === "China" || location.name === "US"
                ? blueIcon
                : highlightIcon
            }
          >
            <Popup>
              <div style={{ minWidth: "200px" }}>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  {location.name}
                </h3>
                {location.description && (
                  <p
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "14px",
                      color: "#6b7280",
                      lineHeight: "1.4",
                    }}
                  >
                    {location.description}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
