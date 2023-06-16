import {Button} from "react-bootstrap";

const ButtonIcon = ({ title, icon, onClick, className, ...props }) => {

	return (
		<Button
			className={`btn w-100 h-100 ${className}`}
			onClick={onClick}
			{...props}
		>
			{icon && (
				<div className={"d-flex justify-content-center align-items-center"}>
					{icon}
				</div>
			)}
			<div className={"text-center"}>
				{title}
			</div>
		</Button>
	);
}

export default ButtonIcon;