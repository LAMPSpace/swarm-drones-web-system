import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

// UI Components
import HeadCustom from '@/components/Layouts/Shared/HeadCustom';
import MainLayout from '@/components/Layouts/MainLayout';
import Loading from '@/components/Layouts/Shared/Loading';
import MainTitleWrap from '@/components/Layouts/Shared/MainTitleWrap';
import { USER_MENU_LIST } from '@/components/Constants/menu-list.constant';

import {
	RiErrorWarningLine,
	RiGithubFill,
	RiTeamFill
} from 'react-icons/ri';
import Link from 'next/link';
import HCMUTELogo from '@/components/Layouts/Shared/HCMUTELogo';
import CardNumber from '@/components/Generals/Cards/CardNumber';
import MainBodyWrap from '@/components/Layouts/Shared/MainBodyWrap';
import CardRelatedLink from '@/components/Generals/Cards/CardRelatedLink';

import {
	GiDeliveryDrone
} from 'react-icons/gi';

export default function Home() {
	const router = useRouter()
	const { user } = useAuth({
		middleware: "auth"
	})

	const renderMainTitle = () => {	
		return <MainTitleWrap>
			<div className="d-flex">
				<div className="row no-gutters w-100">
					<div className="d-flex col-12 col-md">
						<div className='flex-grow-1 d-flex align-items-center'>
							<div>
								<h1 className='h2 font-weight-medium mb-0'>
									Swarm Drones Control System
								</h1>
								<div className="d-flex flex-wrap">
									<div className='d-inline-block mt-2 mr-4'>
										<div className="d-flex">
											<div className="d-inline-flex align-items-center">
												<RiErrorWarningLine className='text-muted fill-current width-4 height-4' />
											</div>
											<div className='d-inline-block ml-2'>
												<Link href="/changelog" className="text-dark text-decoration-none d-flex align-items-center">Phiên bản <span className="badge badge-primary ml-2">0.1.0</span></Link>
											</div>
										</div>
									</div>
									<div className='d-inline-block mt-2 mr-4'>
										<div className="d-flex">
											<div className="d-inline-flex align-items-center">
												<RiGithubFill className='text-muted fill-current width-4 height-4' />
											</div>
											<div className='d-inline-block ml-2'>
												<Link href="https://github.com/HCMUTE-Swarm-Drones/swarm-drones-web-system" className="text-dark text-decoration-none d-flex align-items-center">Source Code <span className="badge badge-success ml-2">Github</span></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex mt-2">
									<div className="d-inline-flex align-items-center">
										<HCMUTELogo />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainTitleWrap>
	}

	const renderOverview = () => {
		return (
			<>
				<div className="row mb-3">
					<div className='col-12 col-lg'>
						<h4>Tổng quan</h4>
					</div>
				</div>
				<div className="row m-n2">
					<div className='col-12 col-md-3 p-2'>
						<CardNumber title="Tổng số lượng drone" number="0" link="/drones" />
					</div>
					<div className='col-12 col-md-3 p-2'>
						<CardNumber title="Tổng số giờ bay" number="0" link="/users" />
					</div>
					<div className='col-12 col-md-3 p-2'>
						<CardNumber title="Tổng số nhiêm vụ bay" number="0" link="/users" />
					</div>
					<div className='col-12 col-md-3 p-2'>
						<CardNumber title="Tổng mẫu cấu hình" number="0" link="/users" />
					</div>
				</div>
			</>
		);
	}

	const renderRelatedLinks = () => {
		return (
			<>
				<div className="row mb-3 mt-5">
					<div className='col-12 col-lg'>
						<h4>Truy cập nhanh</h4>
					</div>
				</div>
				<div className="row m-n2">
					<div className='col-12 col-md-6 col-lg-4 p-2'>
						<CardRelatedLink title="Danh sách drone" link="/drones" icon={<GiDeliveryDrone />} />
					</div>
				</div>
			</>
		);
	}

	const renderIsAuthenticated = (user, sbMenuList) => {
		return (
			<>
				<HeadCustom title="Trang chủ | HCMUTE Swarm Drones Control" description="Trang chủ | HCMUTE Swarm Drones Control" />
				<MainLayout sbMenuList={sbMenuList}>
					{renderMainTitle()}
					<MainBodyWrap>
						{renderOverview()}
						{renderRelatedLinks()}
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
