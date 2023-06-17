import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/auth';
import {swarmService} from "@/services/swarms";
import {USER_MENU_LIST} from '@/components/Constants/menu-list.constant';
import Loading from "@/components/Layouts/Shared/Loading";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import {Card, Form} from "react-bootstrap";
import dynamic from 'next/dynamic';
import Label from "@/components/Forms/Label";
import InputText from "@/components/Forms/InputText";
import CardDroneDetail from "@/components/Generals/Cards/CardDroneDetail";
import Link from "next/link";
import PanelControl from "@/components/Generals/PanelControl";

const MapWithNoSSR = dynamic(() => import('@/components/Generals/Maps/Map'), { ssr: false });

const SwarmDashboard = () => {
	const router = useRouter();
	const { id } = router.query;
	const { user } = useAuth({
		middleware: "auth"
	})
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(null);

	const { find } = swarmService();

	useEffect(() => {
		if (id && user) {
			find({
				id,
				setSwarm: setData,
				setError,
				setStatus,
			})
		}
	}, [find, id, user]);

	const renderIsNotAuthenticated = () => {
		return (
			<Loading />
		)
	}

	const [drones, setDrones] = useState([
		{
			id: 1,
			name: "Drone 1",
			data: {
				heading: 143,
				altitude: 100,
				ground_speed: 10,
				air_speed: 10,
				climb_rate: 10,
			},
			location: {
				lat: 10.745389,
				lng: 106.647691,
			}
		},
		{
			id: 2,
			name: "Drone 2",
			data: {
				heading: 143,
				altitude: 100,
				ground_speed: 10,
				air_speed: 10,
				climb_rate: 10,
			},
			location: {
				lat: 10.746826,
				lng: 106.644925,
			}
		},
		{
			id: 3,
			name: "Drone 3",
			data: {
				heading: 143,
				altitude: 100,
				ground_speed: 10,
				air_speed: 10,
				climb_rate: 10,
			},
			location: {
				lat: 10.744572,
				lng: 106.645282,
			}
		}
	]);

	const [missionSelected, setMissionSelected] = useState({});

	const renderDetailSwarm = () => {
		return (
			<Form>
				<Form.Group className={"mb-2"}>
					<Label htmlFor={"username"}>ĐỊA CHỈ IP</Label>
					<InputText
						id={"ip_address"}
						name={"ip_address"}
						type={"text"}
						value={data?.ip_address}
						className={`form-control`}
						disabled={true}
					/>
				</Form.Group>
			</Form>
		)
	}

	const renderDetailDrone = (drones) => {
		return (
			<>
				{drones?.map((drone, index) => (
					<CardDroneDetail
						key={index}
						drone={drone}
					/>
				))}
			</>
		)
	}

	const renderIsAuthenticated = (user, sbMenuList) => {
		return (
			<>
				<HeadCustom
					title={`${data?.name} | HCMUTE Swarm Drones Control`}
					description={`${data?.name} | HCMUTE Swarm Drones Control`} />
				<MainLayout sbMenuList={sbMenuList} isFrontModule={false}>
					<MainBodyWrap isFluid={true}>
						<div className={"row"}>
							<div className={"col-md-4 pr-md-0 pr-3"}>
								<Card className={"border-0 shadow-sm"} style={{
									height: '95vh',
								}}>
									<Card.Header className={"align-items-center"}>
										<div className={"row"}>
											<div className={"col"}>
												GIÁM SÁT | <strong>{data?.name}</strong>
											</div>
											<div className={"col-auto"}>
												<Link href={`/swarms/${id}/edit`} className={"btn btn-sm btn-outline-primary"}>
													Chỉnh sửa
												</Link>
											</div>
										</div>
									</Card.Header>
									<Card.Body className={"w-auto overflow-auto"}>
										{renderDetailSwarm()}
										{drones && renderDetailDrone(drones)}
									</Card.Body>
								</Card>
							</div>
							<div className={"col-md-8 mt-md-0 mt-4"}>
								<div className={"row m-0"} style={{height: '95vh'}}>
									<div className={"border rounded border-width-2 border-dashed w-100 shadow-sm"} style={{height: "70%"}} >
										<MapWithNoSSR drones={drones} mission={missionSelected} isPlanning={true} />
									</div>
									<div className={"w-100"} style={{height: "30%"}} >
										<PanelControl title={"BẢNG ĐIỀU KHIỂN"} setMissionSelected={setMissionSelected} />
									</div>
								</div>
							</div>
						</div>
					</MainBodyWrap>
				</MainLayout>
			</>
		)
	}

	return (
		<>
			{(user && data) ? renderIsAuthenticated(user, USER_MENU_LIST) : renderIsNotAuthenticated()}
		</>
	)
}

export default SwarmDashboard;