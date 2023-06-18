import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/auth';
import {swarmService} from "@/services/swarms";
import {USER_MENU_LIST} from '@/components/Constants/menu-list.constant';
import Loading from "@/components/Layouts/Shared/Loading";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import {Card, Form, Dropdown, DropdownButton, Button} from "react-bootstrap";
import dynamic from 'next/dynamic';
import Label from "@/components/Forms/Label";
import InputText from "@/components/Forms/InputText";
import CardDroneDetail from "@/components/Generals/Cards/CardDroneDetail";
import Link from "next/link";
import CardWrap from "@/components/Generals/Cards/CardWrap";
import InputError from "@/components/Forms/InputError";
import CardWaypointDetail from "@/components/Generals/Cards/CardWaypointDetail";
const MapWithNoSSR = dynamic(() => import('@/components/Generals/Maps/Map'), { ssr: false });

const AddMission = () => {
    const router = useRouter();
	const { user } = useAuth({
		middleware: "auth"
	})
	const title = "THÊM NHIỆM VỤ";
	const [name, setName] = useState("");
	const [swarm_id, setSwarmId] = useState("");
	const [swarmLookups, setSwarmLookups] = useState([]);
	const [formErrors, setFormErrors] = useState({});
	const [waypoints, setWaypoints] = useState([]);
	const [status, setStatus] = useState(null);
	const { get } = swarmService();

	console.log("waypoints", waypoints);

	useEffect(() => {
		if (user) {
			get({
				setError: setFormErrors,
				setSwarm: setSwarmLookups,
				setStatus
			});
		}
	}, [user]);

	const renderDetailForm = () => {
		return (
			<Form>
				<Form.Group className={"mb-3"}>
					<Form.Label htmlFor="name">Tên nhiệm vụ</Form.Label>
					<Form.Control
						id="name"
						name="name"
						type="text"
						placeholder={"Nhập tên nhiệm vụ"}
						className={"form-control"}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<InputError message={formErrors?.name} />
				</Form.Group>
				<Form.Group className={"mb-3"}>
					<Form.Label htmlFor="swarm">Chọn bầy đàn</Form.Label>
					<Form.Select
						id="swarm"
						name="swarm"
						className={"form-control"}
						value={swarm_id}
						onChange={(e) => setSwarmId(e.target.value)}
					>
						{
							swarmLookups?.map((swarm, index) => (
								<option key={index} value={swarm.id}>{swarm.name}</option>
							))
						}
					</Form.Select>
					<InputError message={formErrors?.swarm_id} />
				</Form.Group>
			</Form>
		)
	}

	const handleAddMission = async () => {
		// Handle here
	}

	const renderSubHeader = () => {
		return (
			<div className={"input-group input-group-sm"}>
				<Button className={"btn btn-primary ml-2"} onClick={() => handleAddMission()}>
					Thêm nhiệm vụ
				</Button>
			</div>
		)
	}

	const renderDetailMission = () => {
		return (
			<>
				{waypoints?.map((waypoint, index) => (
					<CardWaypointDetail
						key={index}
						index={index}
						waypoint={waypoint}
					/>
				))}
			</>
		)
	}

    const renderIsAuthenticated = (user, sbMenuList) => {
		return (
			<>
				<HeadCustom
					title={`${title} | HCMUTE Swarm Drones Control`}
					description={`${title} | HCMUTE Swarm Drones Control`} />
				<MainLayout sbMenuList={sbMenuList} isFrontModule={false}>
					<MainBodyWrap isFluid={true}>
						<div className={"row"}>
							<div className={"col-md-4 pr-md-0 pr-3"}>
								<CardWrap
									title={title}
									subHeader={renderSubHeader()}
									customCard={{
										style: {
											height: '95vh',
										},
									}}
									customCardBody={{
										className: "w-auto overflow-auto",
									}}
								>
									{renderDetailForm()}
									{renderDetailMission()}
								</CardWrap>
							</div>
							<div className={"col-md-8 mt-md-0 mt-4"}>
								<div className={"row m-0"} style={{height: '95vh'}}>
									<div className={"border rounded border-width-2 border-dashed w-100 shadow-sm"} style={{height: "100%"}} >
										<MapWithNoSSR
											isPlanning={true}
											waypoints={waypoints}
											setWaypoints={setWaypoints}
										/>
									</div>
								</div>
							</div>
						</div>
					</MainBodyWrap>
				</MainLayout>
			</>
		)
	}

    const renderIsNotAuthenticated = () => {
        return (
            <Loading />
        )
    }

    return (
        <>
            {(user && swarmLookups) ? renderIsAuthenticated(user, USER_MENU_LIST) : renderIsNotAuthenticated()}
        </>
    )
}

export default AddMission