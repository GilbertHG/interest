import { HiCheck, HiInformationCircle, HiX } from "react-icons/hi";
import { Toast } from "flowbite-react";
import {getProviders} from "next-auth/react";
import {useEffect, useState} from "react";

/**
 * Enum representing the types of toasts.
 * @enum {string}
 */
const ToasterType = {
	INFO: 'INFO',
	ERROR: 'ERROR',
	SUCCESS: 'SUCCESS'
};

/**
 * Retrieves toast properties based on the provided type.
 *
 * @function
 * @param {string} type - The type of the toast.
 * @returns {Object} An object containing icon, background color, and text color for the toast.
 */
const getToastProps = (type) => {
	const typeProps = {
		INFO: {
			icon: <HiInformationCircle className="h-5 w-5" />,
			bgColor: "bg-green-100",
			textColor: "text-green-500",
		},
		ERROR: {
			icon: <HiX className="h-5 w-5" />,
			bgColor: "bg-red-100",
			textColor: "text-red-500",
			message: "Something went wrong"
		},
		SUCCESS: {
			icon: <HiCheck className="h-5 w-5" />,
			bgColor: "bg-orange-100",
			textColor: "text-orange-500",
		},
	};
	
	return typeProps[type] || {};
};

/**
 * Component for displaying toasts based on type and message.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {string} toaster - The instance of the toast.
 * @returns {JSX.Element} JSX element representing the toast.
 */
const Toaster = ({ setToaster, toaster }) => {
	const [showToast, setShowToast] = useState(false);
	
	useEffect(() => {
		setTimeout(() => {
			setToaster({ type: null, message: null });
		}, 3000);
	}, [toaster]);
	
	if (toaster?.type == null || toaster?.message == null) {
		return null;
	}
	
	const { icon, bgColor, textColor, message } = getToastProps(toaster?.type);
	
	return (
		<div className={"my-2 grid justify-items-end"}>
			{icon && bgColor && textColor && (
				<Toast>
					<div
						className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bgColor} ${textColor} dark:${bgColor.replace(
							"100",
							"800"
						)} dark:${textColor.replace("500", "200")}`}
					>
						{icon}
					</div>
					<div className="ml-3 text-sm font-normal">{toaster && toaster.message ? toaster.message : message}</div>
					<Toast.Toggle />
				</Toast>
			)}
		</div>
	);
};

export { Toaster, ToasterType };
