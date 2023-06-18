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
import droneIcon from '@/assets/icons/drones.png';
import markerIcon from '@/assets/icons/marker.jpg';
import { icon } from "leaflet"

const Map = ({ drones = [], mission = {}, isPlanning = false, centerLocation = [], onCreate, onEdit, onDelete }) => {
    const [position, setPosition] = useState(null);
	const [markerPosition, setMarkerPosition] = useState(null);
	console.log("mission", mission);

	const iconWithNumber = (number) => {
		const iconStyle = `
		  position: relative;
		  width: 32px;
		  height: 32px;
		  text-align: center;
		  z-index: 100;
		`;

		const numberStyle = `
			position: absolute;
			top: 30%;
			left: 75%;
			transform: translateX(-50%) translateY(-100%);
			font-weight: bold;
			font-size: 20px;
			color: red;
		`;

		const html = `
			<div class="marker-icon" style="${iconStyle}">
				<span style="${numberStyle}">${number}</span>
				<img src="${droneIcon.src}" width="50" height="50" style="pointer-events: none;" />
			</div>
		`;

		return L.divIcon({
			html: html,
			className: 'custom-marker-icon',
			iconSize: [32, 32],
		});
	  };



	const ICONDRONE = icon({
		iconUrl: droneIcon.src,
		iconSize: [32, 32],
	})

	const ICONMARKER = icon({
		iconUrl: markerIcon.src,
		iconSize: [32, 32],
	})

    const _onEdited = e => {
		let numEdited = 0;
		e.layers.eachLayer(layer => {
			numEdited += 1;
		});
		console.log(`_onEdited: edited ${numEdited} layers`, e);
    };
    const _onCreated = e => {
		let type = e.layerType;
		let layer = e.layer;
		if (type === "marker") {
			const { lat, lng } = layer.getLatLng();
			if (markerPosition	 !== null) {
				setMarkerPosition(...markerPosition, { lat, lng });
			} else {
				setMarkerPosition({ lat, lng });
			}
			console.log("_onCreated: marker created", lat, lng);
		} else {
			console.log("_onCreated: something else created:", type, e);
		}
  	};



	const _onDeleted = e => {
		let numDeleted = 0;
		e.layers.eachLayer(layer => {
			numDeleted += 1;
		});
		console.log(`onDeleted: removed ${numDeleted} layers`, e);
	};

	const _onMounted = drawControl => {
		console.log("_onMounted", drawControl);
	};

	const _onEditStart = e => {
		console.log("_onEditStart", e);
	};

	const _onEditStop = e => {
		console.log(e);
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
console.log(markerPosition);
  	return (
		<MapContainer
			center={[10.852182, 106.626269]}
			zoom={12}
			scrollWheelZoom={true}
			style={{ height: '100%', width: '100%' }}
		>
			<TileLayer
				attribution='&copy; <a href="https://hcmute.edu.vn">HCMUTE</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{
				isPlanning && (
					<FeatureGroup>
						<EditControl
							position="topleft"
							onCreated={_onCreated}
							onEdited={_onEdited}
							onDeleted={_onDeleted}
							onMounted={_onMounted}
							onEditStart={_onEditStart}
							onEditStop={_onEditStop}
							onDeleteStart={_onDeleteStart}
							onDeleteStop={_onDeleteStop}
							onDrawStart={_onDrawStart}
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
				)
			}

			{
				Object.keys(mission).length > 0 && (
					mission?.waypoints.map((waypoint, index) => (
						<Marker
							key={index}
							position={[waypoint.lat, waypoint.lng]}
							icon={ICONMARKER}
						>
							<Popup>
								{waypoint.id}
							</Popup>
						</Marker>
					))
				)
			}

			{
				drones.map((drone, index) => (
					<Marker
						key={index}
						position={[drone.location.lat, drone.location.lng]}
						icon={iconWithNumber(drone.id)}
					>
						<Popup>
							{drone.name}
						</Popup>
					</Marker>
				))
			}
		</MapContainer>
  	);
};

export default Map;