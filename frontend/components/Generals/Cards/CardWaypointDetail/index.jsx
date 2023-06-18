import CardWrap from "@/components/Generals/Cards/CardWrap";
import {MdHeight} from "react-icons/md";
import {TbGps} from "react-icons/tb";

const CardWaypointDetail = ({ waypoint, index }) => {
	const data = {
		latitude: waypoint?.lat,
		longitude: waypoint?.lng,
	}

	return (
		<CardWrap>
			<div className="d-flex flex-column justify-content-center flex-grow-1">
				<div className='text-muted mb-1'>
					<div className={"row"}>
						<div className={"col"}>
							<div className={"font-weight-medium py-1"}>
								Tọa độ
							</div>
						</div>
						<div className={"col-auto"}>
							<div className={"d-flex position-relative text-dark width-8 height-8 align-items-center justify-content-center flex-shrink-0"}>
								<div className={"position-absolute bg-dark opacity-10 top-0 right-0 bottom-0 left-0 border-radius-lg"}></div>
								<strong><p className={"fill-current my-0"}>{index + 1}</p></strong>
							</div>
						</div>
					</div>
				</div>
				<div className='font-weight-bold h5 mb-0'>
					<div className={`row my-1 p-1 border rounded border-width-1 bg-info`}>
						<div className={"col"}>
							<div className={"d-flex align-items-center"}>
								<div className={"d-flex position-relative text-dark width-8 height-8 align-items-center justify-content-center flex-shrink-0"}>
									<div className={"position-absolute bg-white top-0 opacity-50 right-0 bottom-0 left-0 border-radius-lg"}></div>
									<TbGps className={"fill-current my-0"}/>
								</div>
								<div className={"ml-2"}>
									<p className={"my-0"}>
										<strong>Vĩ độ (Lat)</strong>
									</p>
								</div>
							</div>
						</div>
						<div className={"col-auto"}>
							<div className={"d-flex align-items-center h-100"}>
								<strong><p className={"fill-current my-0"}>{data.latitude}</p></strong>
							</div>
						</div>
					</div>
					<div className={`row my-1 p-1 border rounded border-width-1 bg-gray-100`}>
						<div className={"col"}>
							<div className={"d-flex align-items-center"}>
								<div className={"d-flex position-relative text-dark width-8 height-8 align-items-center justify-content-center flex-shrink-0"}>
									<div className={"position-absolute bg-white top-0 opacity-50 right-0 bottom-0 left-0 border-radius-lg"}></div>
									<TbGps className={"fill-current my-0"}/>
								</div>
								<div className={"ml-2"}>
									<p className={"my-0"}>
										<strong>Kinh độ (Long)</strong>
									</p>
								</div>
							</div>
						</div>
						<div className={"col-auto"}>
							<div className={"d-flex align-items-center h-100"}>
								<strong><p className={"fill-current my-0"}>{data.longitude}</p></strong>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CardWrap>
	)
}

export default CardWaypointDetail;