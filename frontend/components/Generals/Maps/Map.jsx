import { Card } from "react-bootstrap";
import { TileLayer, MapContainer } from 'react-leaflet';
import { useState, useEffect } from 'react';

const Map = ({ coordinates, setCoordinates, title }) => {
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
                        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>
                  </Card.Body>
            </Card>
      );
}

export default Map;