import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';

// UI Components
import HeadCustom from '@/components/Layouts/Shared/HeadCustom';
import MainLayout from '@/components/Layouts/MainLayout';
import Loading from '@/components/Layouts/Shared/Loading';
import { USER_MENU_LIST } from '@/components/Constants/menu-list.constant';
import MainBodyWrap from '@/components/Layouts/Shared/MainBodyWrap';
import Map from '@/components/Generals/Maps/Map';


export default function GPSList() {
	const router = useRouter()
	const { user } = useAuth({
		middleware: "auth"
	})

	const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

	const renderIsAuthenticated = (user, sbMenuList) => {
		return (
			<>
				<HeadCustom title="Trang chủ | HCMUTE Swarm Drones Control" description="Trang chủ | HCMUTE Swarm Drones Control" />
				<MainLayout sbMenuList={sbMenuList} isFrontModule={true}>
					<MainBodyWrap>
						<Map
							coordinates={coordinates}
							setCoordinates={setCoordinates}
							title="Địa điểm GPS hiện tại"
						/>
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
			{user ? renderIsAuthenticated(user, USER_MENU_LIST) : renderIsNotAuthenticated()}
		</>
	)
}