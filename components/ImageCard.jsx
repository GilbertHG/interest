import {Card, Carousel, Flowbite} from "flowbite-react";

const ImageCard = ({setMainImage, mainImage}) => {
	// Flowbite custom style
	const customTheme = {
		"root": {
			"base": "flex mx-auto rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
			"children": "flex h-full flex-col justify-center gap-4 p-6",
			"horizontal": {
				"off": "flex-col",
				"on": "flex-col sm:flex-row"
			},
			"href": "hover:bg-gray-100 dark:hover:bg-gray-700"
		},
		"img": {
			"base": "",
			"horizontal": {
				"off": "rounded-t-lg",
				"on": "w-full rounded-t-lg object-cover lg:w-1/2 sm:w-1/2 md:rounded-none md:rounded-l-lg"
			}
		}
	};
	
	return (
		<>
			<div className={"flex flex-row items-center"}>
				<div className={"mr-2"}>
					<button className="rounded-full bg-gray-300 p-3">
						<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
						     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							      d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
						</svg>
					</button>
				</div>
				<div className={"basis-full"}>
					<Card theme={customTheme} className={"max-w-7xl mb-5"}
					      imgSrc="https://source.unsplash.com/600x500?computer" horizontal>
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							File: {}
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							Credit: {}
						</p>
					</Card>
				</div>
				<div className={"ml-2"}>
					<button className="rounded-full bg-gray-300 p-3">
						<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
						     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
						</svg>
					</button>
				</div>
			</div>
		</>
	)
};

export default ImageCard;