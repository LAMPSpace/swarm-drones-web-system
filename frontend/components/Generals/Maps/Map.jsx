import { Card } from "react-bootstrap";
import { TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  	ssr: false,
});

export default function Map({ coordinates, setCoordinates, title }) {
  // function LocationMarker() {
  //   const [position, setPosition] = useState(null);
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       if (!position) {
  //         setPosition(e.latlng);
  //         map.flyTo(e.latlng, map.getZoom());
  //       }
  //     },
  //   }); 

  //   return position === null ? null : (
  //     <Marker position={position}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   );
  // }

  return (
    <Card className="w-100 border-0 rounded-top shadow-sm overflow-hidden" style={{ height: "80vh"}}>
      <Card.Header className="card-header align-items-center">
        <div className="row">
          <div className="col d-flex align-items-center">
            <div className="d-flex align-items-center font-weight-medium py-1">{title}</div>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
      </MapContainer>
      </Card.Body>
    </Card>
  );
}
