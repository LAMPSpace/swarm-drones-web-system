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
	}, [id, user]);

    const [swarm, setSwarm] = useState([
        {
            id: 1,
            name: "swarm-1"
        },
        {
            id: 2,
            name: "swarm-2"
        },
        {
            id: 3,
            name: "swarm-3"
        },
        {
            id: 4,
            name: "swarm-4"
        },
        {
            id: 5,
            name: "swarm-5"
        }
    ]);

    const [missionSelected, setMissionSelected] = useState({});
    const [swarmSelected, setSwarmSelected] = useState([]);

	const renderDetailSwarm = (swa) => {
		return (
			<Form>
                <Form.Group className={"mb-2"}>
					<Label htmlFor={"swarm"}>Swarm</Label>
					<DropdownButton 
                        id="swarm_id" 
                        title = {
                                    swarmSelected && swarmSelected.name
                                    ? swarmSelected.name
                                    : swarmSelected && swarmSelected.length === 0
                                    ? "--Chọn swarm--"
                                    : "Swarm"
                                }
                    >
                        {
                            swa?.map((items, index) => (
                                <Dropdown.Item 
                                    key={items.id}
                                    href=""
                                    onClick={() => setSwarmSelected(items)}
                                >
                                    {items.name}
                                </Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
				</Form.Group>
			</Form>
		)
	}

	// const renderDetailDrone = (drones) => {
	// 	return (
	// 		<>
	// 			{drones?.map((drone, index) => (
	// 				<CardDroneDetail
	// 					key={index}
	// 					drone={drone}
	// 				/>
	// 			))}
	// 		</>
	// 	)
	// }

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
												<Link href={`/`} className={"btn btn-sm btn-outline-primary"}>
													Chỉnh sửa
												</Link>
											</div>
										</div>
									</Card.Header>
									<Card.Body className={"w-auto overflow-auto"}>
										{renderDetailSwarm(swarm)}
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