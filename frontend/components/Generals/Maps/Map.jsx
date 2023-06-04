import GoogleMapReact from "google-map-react";
import { Card } from "react-bootstrap";

export default function Map({ coordinates, setCoordinates, title }) {
    return (
        <Card className="w-100 border-0 rounded-top shadow-sm overflow-hidden" style={{ height: "80vh"}}>
            <Card.Header className="card-header align-items-center">
                <div class="row">
                    <div class="col d-flex align-items-center">
                        <div class="d-flex align-items-center font-weight-medium py-1">{title}</div>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}}
                    defaultZoom={10}
                    defaultCenter={coordinates}
                    center={coordinates}
                    options={""}
                    onChange={() => {}}
                    onChildClick={() => {}}
                >

                </GoogleMapReact>
            </Card.Body>
        </Card>
    );
}