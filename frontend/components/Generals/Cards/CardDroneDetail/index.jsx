import Link from "next/link";
import {Card} from "react-bootstrap";
import {
	MdHeight,
	MdOutlineSpeed
} from "react-icons/md";
import {
	SiApacheairflow
} from "react-icons/si";
import {
	GiMountainClimbing
} from "react-icons/gi";

const CardDroneDetail = ({ drone, className='' }) => {
	const {
		id,
		name,
		data
	} = drone;

	const mappingData = (altitude) => {
		switch (altitude) {
			case 'heading':
				return {
					color: 'bg-info',
					icon: MdHeight,
					text: 'Hướng',
					unit: '°'
				}
			case 'altitude':
				return {
					color: 'bg-danger',
					icon: MdHeight,
					text: 'Độ cao',
					unit: 'm'
				}
			case 'ground_speed':
				return {
					color: 'bg-warning',
					icon: MdOutlineSpeed,
					text: 'Tốc độ',
					unit: 'm/s'
				}
			case 'air_speed':
				return {
					color: 'bg-primary',
					icon: SiApacheairflow,
					text: 'Tốc độ gió',
					unit: 'm/s'
				}
			case 'climb_rate':
				return {
					color: 'bg-success',
					icon: GiMountainClimbing,
					text: 'Tốc độ tăng',
					unit: 'm/s'
				}
			default:
				return {
					color: '',
					icon: '',
					text: ''
				}
		}
	}

	return (
		<Card className="border-0 shadow-sm mb-2">
			<Card.Body className="d-flex border rounded border-width-1 pb-0">
				<div className="d-flex flex-column justify-content-center flex-grow-1">
					<div className='text-muted mb-1'>
						<div className={"row"}>
							<div className={"col"}>
								<div className={"font-weight-medium py-1"}>
									{name}
								</div>
							</div>
							<div className={"col-auto"}>
								<div className={"d-flex position-relative text-dark width-8 height-8 align-items-center justify-content-center flex-shrink-0"}>
									<div className={"position-absolute bg-dark opacity-10 top-0 right-0 bottom-0 left-0 border-radius-lg"}></div>
									<strong><p className={"fill-current my-0"}>{id}</p></strong>
								</div>
							</div>
						</div>
					</div>
					<div className='font-weight-bold h5 mb-0'>
						{
							Object.keys(data).map((key, index) => {
								const dataMapped = mappingData(key);
								return <div className={`row my-1 p-1 border rounded border-width-1 ${dataMapped.color}`} key={index}>
									<div className={"col"}>
										<div className={"d-flex align-items-center"}>
											<div className={"d-flex position-relative text-dark width-8 height-8 align-items-center justify-content-center flex-shrink-0"}>
												<div className={"position-absolute bg-white top-0 opacity-50 right-0 bottom-0 left-0 border-radius-lg"}></div>
												<dataMapped.icon className={"fill-current my-0"}/>
											</div>
											<div className={"ml-2"}>
												<p className={"my-0"}>
													<strong>{dataMapped.text}</strong>
												</p>
											</div>
										</div>
									</div>
									<div className={"col-auto"}>
										<div className={"d-flex align-items-center h-100"}>
											<strong><p className={"fill-current my-0"}>{data[key]} {dataMapped.unit}</p></strong>
										</div>
									</div>
								</div>
							})
						}
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default CardDroneDetail;