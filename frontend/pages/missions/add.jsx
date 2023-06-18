import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/auth';
import {swarmService} from "@/services/swarms";
import {USER_MENU_LIST} from '@/components/Constants/menu-list.constant';
import Loading from "@/components/Layouts/Shared/Loading";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import {Card, Form, Dropdown, DropdownButton} from "react-bootstrap";
import dynamic from 'next/dynamic';
import Label from "@/components/Forms/Label";
import InputText from "@/components/Forms/InputText";
import CardDroneDetail from "@/components/Generals/Cards/CardDroneDetail";
import Link from "next/link";
import PanelControl from "@/components/Generals/PanelControl";

const MapWithNoSSR = dynamic(() => import('@/components/Generals/Maps/Map'), { ssr: false });
const AddMission = () => {
    const router = useRouter();
	const { user } = useAuth({
		middleware: "auth"
	})
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(null);
	const [swarms, setSwarms] = useState([]);
	const { get } = swarmService();

	useEffect(() => {
		if (user) {
			get({
				setError,
				setSwarm: setSwarms,
				setStatus
			});
		}
	}, [user]);

    const [missionSelected, setMissionSelected] = useState({});
    const [swarmSelected, setSwarmSelected] = useState([]);

	const renderDetailSwarm = () => {
		return (
			<Form>
				<Form.Group className={"mb-3"}>
					<Form.Label htmlFor="swarm">SWARM: </Form.Label>
					<Form.Select
						id="swarm"
						name="swarm"
						className={"form-control"}
						value={swarmSelected ? swarmSelected.id : ''}
					>
						{Array.isArray(swarms) &&
							swarms.map((swm) => (
								<option
									key={swm.id}
									value={swm.id}
									onClick={() => setSwarmSelected(swm)}
								>
									{swm.name}
								</option>
							))}
					</Form.Select>
				</Form.Group>
			</Form>
		)
	}

	const renderDetailMission = (mission) => {
		return (
			<>
				{mission?.map((ms, index) => (
					<CardDroneDetail
						key={index}
						drone={ms}
					/>
				))}
			</>
		)
	}

    const renderIsAuthenticated = (user, sbMenuList) => {
		return (
			<>
				<HeadCustom
					title={`Thêm Mission | HCMUTE Swarm Drones Control`}
					description={`Thêm Mission | HCMUTE Swarm Drones Control`} />
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
												Thêm Mission
											</div>
											<div className={"col-auto"}>
												<Link href={`/`} className={"btn btn-sm btn-outline-primary"}>
													Chỉnh sửa
												</Link>
											</div>
										</div>
									</Card.Header>
									<Card.Body className={"w-auto overflow-auto"}>
										{renderDetailSwarm()}
									</Card.Body>
								</Card>
							</div>
							<div className={"col-md-8 mt-md-0 mt-4"}>
								<div className={"row m-0"} style={{height: '95vh'}}>
									<div className={"border rounded border-width-2 border-dashed w-100 shadow-sm"} style={{height: "100%"}} >
										<MapWithNoSSR mission={missionSelected} isPlanning={true} />
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
            {(user) ? renderIsAuthenticated(user, USER_MENU_LIST) : renderIsNotAuthenticated()}
        </>
    )
}

export default AddMission