import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/auth';
import {swarmService} from "@/services/swarms";
import {USER_MENU_LIST} from '@/components/Constants/menu-list.constant';
import Loading from "@/components/Layouts/Shared/Loading";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import {Button, Card, Form, Modal} from "react-bootstrap";
import dynamic from 'next/dynamic';
import Label from "@/components/Forms/Label";
import InputText from "@/components/Forms/InputText";
import CardDroneDetail from "@/components/Generals/Cards/CardDroneDetail";
import Link from "next/link";
import PanelControl from "@/components/Generals/PanelControl";
import {toast} from "react-toastify";
import {TOAST_SETTINGS} from "@/components/Constants/common.constant";
import {
	BiLink,
	BiUnlink
} from "react-icons/bi";
import InputError from "@/components/Forms/InputError";

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
	const [showEditModal, setShowEditModal] = useState(false);
	const [isConnected, setIsConnected] = useState(true);
	const [isCreatingMission, setIsCreatingMission] = useState(false);
	const [ip_address, setIpAddress] = useState("");
	const [name, setName] = useState("");
	const [port, setPort] = useState("");
	const [editFormError, setEditFormError] = useState({});

	const { find, update } = swarmService();

	useEffect(() => {
		if (id && user) {
			find({
				id,
				setSwarm: setData,
				setError,
				setStatus,
			})
		}
	}, [id, user]);

	useEffect(() => {
		if (data) {
			setName(data?.name);
			setIpAddress(data?.ip_address);
			setPort(data?.port);
		}
	}, [data]);

	const handleEdit = async () => {
		update({
			id,
			name,
			ip_address,
			port,
			setSwarm: setData,
			setErrors: setEditFormError,
			setStatus,
		})

		setShowEditModal(false);

		if (status) {
			toast.success('Cập nhật thành công', TOAST_SETTINGS);
		}
	}

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

	const renderDetailSwarm = (isEdit = false) => {
		return (
			<Form>
				{
					isEdit && (
						<Form.Group className={"mb-2"}>
							<Label htmlFor={"username"}>Tên đội</Label>
							<InputText
								id={"name"}
								name={"name"}
								type={"text"}
								value={name}
								className={`form-control`}
								disabled={!isEdit}
								onChange={(e) => setName(e.target.value)}
							/>
							{
								isEdit && (
									<InputError message={editFormError?.name} />
								)
							}
						</Form.Group>
					)
				}
				<Form.Group className={"mb-2"}>
					<Label htmlFor={"username"}>ĐỊA CHỈ IP</Label>
					<InputText
						id={"ip_address"}
						name={"ip_address"}
						type={"text"}
						value={ip_address}
						className={`form-control`}
						disabled={!isEdit}
						onChange={(e) => setIpAddress(e.target.value)}
					/>
					{
						isEdit && (
							<InputError message={editFormError?.ip_address} />
						)
					}
				</Form.Group>
				<Form.Group className={"mb-2"}>
					<Label htmlFor={"username"}>CỔNG KẾT NỐI</Label>
					<InputText
						id={"port"}
						name={"port"}
						type={"text"}
						value={port}
						className={`form-control`}
						disabled={!isEdit}
						onChange={(e) => setPort(e.target.value)}
					/>
					{
						isEdit && (
							<InputError message={editFormError?.port} />
						)
					}
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

	const renderEditModal = (props) => {
		return (
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						Chỉnh sửa thông tin đội
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{renderDetailSwarm(true)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => handleEdit()}>Lưu</Button>
					<Button onClick={props.onHide}>Đóng</Button>
				</Modal.Footer>
			</Modal>
		);
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
												<Button variant={isConnected ? "outline-success" : "outline-danger"}
												        size={"sm"}
														className={"mr-1"}
												>
													{
														isConnected ? (
															<>
																<BiLink />
																<span className={"ml-1"}>Đã kết nối</span>
															</>
														) : (
															<>
																<BiUnlink />
																<span className={"ml-1"}>Chưa kết nối</span>
															</>
														)
													}
												</Button>
												<Button variant={"outline-primary"}
												        size={"sm"}
												        onClick={() => setShowEditModal(true)}>Chỉnh sửa</Button>
												{
													showEditModal &&
													renderEditModal({
														show: showEditModal,
														onHide: () => setShowEditModal(false)
													})
												}
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