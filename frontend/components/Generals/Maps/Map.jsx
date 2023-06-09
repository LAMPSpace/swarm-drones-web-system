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

const Map = ({ drones = [], mission = {}, isPlanning = false, centerLocation = [], waypoints, setWaypoints }) => {
    // const [oldWaypoints, setOldWaypoints] = useState([]);
	const [editedWaypoints, setEditedWaypoints] = useState([]);
	const [deletedWaypoints, setDeletedWaypoints] = useState([]);

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


	const _onEditStart = e => {
		// const oldLayers = e.sourceTarget._layers;
		// const newLayers = Object.values(oldLayers).slice(2);
		// const newWaypoints = newLayers.map(layer => {
		// 	const { lat, lng } = layer._latlng;
		// 	const id = layer._leaflet_id;
		// 	return { id, lat, lng };
		// });
		// setOldWaypoints(newWaypoints);
	};

    const _onEdited = e => {
		const {
			layers: { _layers }
		} = e;

		const newLayers = []

		Object.values(_layers).map(({ _leaflet_id, _latlng }) => {
			const { lat, lng } = _latlng;
			const id = _leaflet_id;

			newLayers.push({ id, lat, lng });
		});

		setEditedWaypoints(newLayers);
    };

	useEffect(() => {
		if (isPlanning) {
			Object.values(editedWaypoints).map((editedWaypoint, index) => {
				const ix =  waypoints.findIndex(oldWaypoint => oldWaypoint.id === editedWaypoint.id);
				if (ix !== -1) {
					setWaypoints(prevWaypoints => {
						const newWaypoints = [...prevWaypoints];
						newWaypoints[ix] = editedWaypoint;
						return newWaypoints;
					})
				}
			})
		}
	}, [editedWaypoints])

	useEffect(() => {
		if (isPlanning) {
			Object.values(deletedWaypoints).map((deletedWaypoint, index) => {
				const ix =  waypoints.findIndex(waypoint => waypoint.id == deletedWaypoint.id);
				if (ix !== -1) {
					setWaypoints(
						prevWaypoints => prevWaypoints
							.filter(waypoint => !Object.values(deletedWaypoints)
								.some(deletedWaypoint => deletedWaypoint.id === waypoint.id))
					);

				}
			})
		}
	}, [deletedWaypoints])

    const _onCreated = e => {
		let type = e.layerType;
		let layer = e.layer;
		if (type === "marker") {
			const { lat, lng } = layer.getLatLng();
			const id = layer._leaflet_id;
			setWaypoints(prevWaypoints => [...prevWaypoints, { id, lat, lng }]);
		} else {
			console.log("_onCreated: something else created:", type, e);
		}
  	};

	const _onDeleted = e => {
		const {
			layers: { _layers }
		} = e;

		const deletedLayers = []

		Object.values(_layers).map(({ _leaflet_id, _latlng }) => {
			const { lat, lng } = _latlng;
			const id = _leaflet_id;

			deletedLayers.push({ id, lat, lng });
		});
		console.log("deletedLayers", deletedLayers);

		setDeletedWaypoints(deletedLayers);
	};

	const _onMounted = drawControl => {
		console.log("_onMounted", drawControl);
	};
	console.log("waypoints", waypoints);


	const _onEditStop = e => {

	};

	const _onDeleteStart = e => {
		//
	};

	const _onDeleteStop = e => {
		console.log("_onDeleteStop", e);
	};

	const _onDrawStart = e => {
		console.log("_onDrawStart", e);
	};

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
							onDeleteStop={_onDeleteStop}
							draw={{
								polyline: false,
								rectangle: true,
								marker: {
									icon: L.icon({
										iconUrl: markerIcon.src,
										iconSize: [32, 32],
									})
								},
								circle: true,
								circlemarker: false,
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