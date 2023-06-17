import {Button, Card, Form, Modal} from "react-bootstrap";
import ButtonIcon from "@/components/Generals/ButtonIcon";
import {GiArrowScope, GiArrowhead, GiTargetArrows} from "react-icons/gi";
import {RiHomeWifiFill} from "react-icons/ri";
import {FcHome} from "react-icons/fc";
import {MdOutlineAutoMode} from "react-icons/md";
import {useState} from "react";
import dynamic from "next/dynamic";
import {toast} from "react-toastify";
import {TOAST_SETTINGS} from "@/components/Constants/common.constant";

const MapWithNoSSR = dynamic(() => import('@/components/Generals/Maps/Map'), { ssr: false });

const PanelControl = ({ title, setMissionSelected, ...rest }) => {
	const [modalShow, setModalShow] = useState(false);

	const [missions, setMissions] = useState([
		{
			id: 1,
			name: "Mission 1",
			swarm_id: 1,
			waypoints: [
				{
					id: 1,
					lat: 10.745379,
					lng: 106.647681,
				},
				{
					id: 2,
					lat: 10.745389,
					lng: 106.647631,
				},
				{
					id: 3,
					lat: 10.745339,
					lng: 106.647641,
				}
			]
		},
		{
			id: 2,
			name: "Mission 2",
			swarm_id: 1,
			waypoints: [
				{
					id: 1,
					lat: 10.745349,
					lng: 106.647621,
				},
				{
					id: 2,
					lat: 10.745349,
					lng: 106.647611,
				},
				{
					id: 3,
					lat: 10.745359,
					lng: 106.647611,
				}
			]
		}
	])

	const [mission, setMission] = useState(missions[0]);

	const renderModal = (props) => {
		return (
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className={"modal-control"}
			>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						CHỌN NHIỆM VỤ CHO BẦY ĐÀN
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className={"mb-3"}>
							<Form.Label htmlFor={"mission"}>NHIỆM VỤ</Form.Label>
							<Form.Select
								id={"mission"}
								name={"mission"}
								value={mission.id}
								onChange={(e) => setMission(
									missions.find(mission => mission.id === parseInt(e.target.value))
								)}
							>
								{
									missions.map((mission, index) => (
										<option key={index} value={mission.id}>{mission.name}</option>
									))
								}
							</Form.Select>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor={"preview"}>XEM TRƯỚC</Form.Label>
							<div id={"preview"} className={"border"} style={{height: "50vh"}}>
								<MapWithNoSSR mission={mission} />
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant={"outline-primary"}
						size={"sm"}
						onClick={() => {
							setMissionSelected(mission);
							props.onHide();
							toast.success("Cài đặt nhiệm vụ thành công!", TOAST_SETTINGS);
						}}>CHỌN</Button>
					<Button variant={"outline-secondary"} size={"sm"} onClick={props.onHide}>HỦY</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	return (
		<div className={"pt-1 h-100"}>
			<Card className="border-0 shadow-sm h-100" {...rest}>
				<Card.Header className={"align-items-center"}>
					<div className={"row"}>
						<div className={"col"}>
							{title}
						</div>
						<div className={"col-auto"}>
							<Button
								variant={"outline-primary"}
								size={"sm"}
								onClick={() => setModalShow(true)}
							>
								CÀI ĐẶT MISSION
							</Button>
							{
								renderModal({
									show: modalShow,
									onHide: () => setModalShow(false)
								})
							}
						</div>
					</div>
				</Card.Header>
				<Card.Body className={"row h-100 overflow-auto"}>
					<div className={"col-md-7 mb-1 mb-md-0"}>
						<div className={"row custom-row-50"}>
							<div className={"col-md-3 pr-1 pl-md-2 pb-1"}>
								<ButtonIcon title={"VỀ HOME"} icon={<RiHomeWifiFill style={{fontSize: "40"}} />} />
							</div>
							<div className={"col-md-3 px-md-1 pr-1 pb-1"}>
								<ButtonIcon title={"ARM"} icon={<GiArrowScope style={{fontSize: "40"}} />} />
							</div>
							<div className={"col-md-3 px-md-1 pr-1 pb-1"}>
								<ButtonIcon title={"BAY LÊN"} icon={<GiArrowhead style={{fontSize: "40"}} />} />
							</div>
							<div className={"col-md-3 pl-md-1 pr-md-2 pr-1 pb-1"}>
								<ButtonIcon title={"HẠ CÁNH"} icon={<GiTargetArrows style={{fontSize: "40"}} />} />
							</div>
						</div>
						<div className={"row custom-row-50"}>
							<div className={"col-md-3 pl-md-1 pl-md-2 pr-1 pt-md-1"}>
								<ButtonIcon title={"AUTO"} icon={<MdOutlineAutoMode style={{fontSize: "40"}} />} />
							</div>
							<div className={"col-md-9 pr-md-2 pl-md-1 pr-1 pt-1"}>
								<ButtonIcon title={"AUTO"} icon={<FcHome style={{fontSize: "40"}} />} />
							</div>
						</div>
					</div>
					<div className={"col-md-5 pr-1 pl-md-0"}>
						<Card className={"h-100 bg-info text-white"}>
							<Card.Body className={"w-100 p-2"}>
								<div className={"row m-0"}>
									<strong><span>THÔNG BÁO</span></strong>
								</div>
							</Card.Body>
						</Card>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
}

export default PanelControl;