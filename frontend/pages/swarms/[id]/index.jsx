import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/auth';
import {swarmService} from "@/services/swarms";
import {USER_MENU_LIST} from '@/components/Constants/menu-list.constant';
import Loading from "@/components/Layouts/Shared/Loading";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";
import {Card} from "react-bootstrap";
import dynamic from 'next/dynamic';

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
	}, [id, user]);

	const renderIsNotAuthenticated = () => {
		return (
			<Loading />
		)
	}

	const [footerHeight, setFooterHeight] = useState(0);
	const [windowHeight, setWindowHeight] = useState(0);
	useEffect(() => {
		const handleResize = () => {
			setFooterHeight(document.querySelector(".footer")?.offsetHeight || 0);
			setWindowHeight(window.innerHeight);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const calcHeight = () => {
		return windowHeight - footerHeight - 100;
	}

	const last_locations = [
		{ lat: 10.745389, lng: 106.647691 }, // Ví dụ vị trí 1
		{ lat: 10.746826, lng: 106.644925 }, // Ví dụ vị trí 2
		{ lat: 10.744572, lng: 106.645282 }  // Ví dụ vị trí 3
	];
	const [coordinates, setCoordinates] = useState(last_locations);

	const renderIsAuthenticated = (user, sbMenuList) => {
		return (
			<>
				<HeadCustom
					title={`${data?.name} | HCMUTE Swarm Drones Control`}
					description={`${data?.name} | HCMUTE Swarm Drones Control`} />
				<MainLayout sbMenuList={sbMenuList} isFrontModule={false}>
					<MainBodyWrap isFluid={true}>
						<div className={"row"}>
							<div className={"col-md-4"}>
								<Card className={"border-0 shadow-sm"} style={{
									height: calcHeight(),
								}}>
									<Card.Header className={"align-items-center"}>
										<div className={"row"}>
											<div className={"col"}>
												BẢNG ĐIỀU KHIỂN | <strong>{data?.name}</strong>
											</div>
										</div>
									</Card.Header>
									<Card.Body className={"v-auto"}>
									</Card.Body>
								</Card>
							</div>
							<div className={"col-md-8 mt-md-0 mt-4"}>
								<div
									className={"border rounded border-width-2 border-dashed"}
									style={{
										height: calcHeight(),
									}}
								>
									<MapWithNoSSR coordinates={coordinates} setCoordinates={setCoordinates} title="Địa điểm GPS hiện tại"/>
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