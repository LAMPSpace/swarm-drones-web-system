import { Card } from "react-bootstrap";
import {
	  TileLayer,
	  MapContainer,
	  useMapEvents,
	  Marker,
	  Popup,
	  FeatureGroup
} from 'react-leaflet';
import { useState, useEffect } from 'react';
import { EditControl } from "react-leaflet-draw";
import L from 'leaflet';
import markerIcon from '@/assets/icons/logodep.jpg';
import { icon } from "leaflet"

const Map = ({ coordinates, setCoordinates, title }) => {
    const [position, setPosition] = useState(null);

	const ICON = icon({
		iconUrl: markerIcon.src,
		iconSize: [32, 32],
	})
    const _onEdited = e => {
		let numEdited = 0;
		e.layers.eachLayer(layer => {
            numEdited += 1;
        });
    };
    const _onCreated = e => {
      	let type = e.layerType;
    	let layer = e.layer;
		if (type === "marker") {
			console.log("_onCreated: marker created", e);
		} else {
			console.log("_onCreated: something else created:", type, e);
		}

		// console.log("Geojson", layer.toGeoJSON());
		// console.log("coords", layer.getLatLngs());
		// Do whatever else you need to. (save to db; etc)

		// this._onChange();
  	};

	const _onDeleted = e => {
		let numDeleted = 0;
		e.layers.eachLayer(layer => {
		numDeleted += 1;
		});
		console.log(`onDeleted: removed ${numDeleted} layers`, e);

		// this._onChange();
	};

	const _onMounted = drawControl => {
		console.log("_onMounted", drawControl);
	};

	const _onEditStart = e => {
		console.log("_onEditStart", e);
	};

	const _onEditStop = e => {
		console.log("_onEditStop", e);
	};

	const _onDeleteStart = e => {
		console.log("_onDeleteStart", e);
	};

	const _onDeleteStop = e => {
		console.log("_onDeleteStop", e);
	};

	const _onDrawStart = e => {
		console.log("_onDrawStart", e);
	};
	const LocationMarker = () => {
		const map = useMapEvents({
		click() {
			map.locate();
		},
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
		});

		return position === null ? null : (
		<Marker position={position}>
			<Popup>You are here</Popup>
		</Marker>
		);
	};

  	return (
		<MapContainer
			center={[10.852182, 106.626269]}
			zoom={12}
			scrollWheelZoom={true}
			style={{ height: '100%', width: '100%' }}
		>
			<TileLayer
				attribution='&copy; <a href="https://hcmute.edu.vn">HCMUTE</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<FeatureGroup>
				<EditControl
				position="topleft"
				onCreated={_onCreated}
				onEdited={_onEdited}
				onDeleted={_onDeleted}
				draw={{
					rectangle: true,
					marker: {
						icon: L.icon({
							iconUrl: markerIcon.src,
							iconSize: [32, 32],
						})
					},
					circle: true,
					polygon: true
				}}
				/>
			</FeatureGroup>

			{coordinates.map((location, index) => (
				<Marker key={index} position={[location.lat, location.lng]} icon={ICON}>
					<Popup>{`Marker ${index + 1}`}</Popup>
				</Marker>
			))}
			<LocationMarker />
		</MapContainer>
  	);
};

export default Map;