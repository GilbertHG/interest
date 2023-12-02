import {SessionCheck} from "@/components/SessionCheck";

export default function MyImage() {
	
	let component = (
		<>
			<section className={"w-full flex-center"}>
				<h1 className={"head_text text-center mb-5"}>Drop your image here</h1>
				{/*	Content */}
			</section>
		</>
	);
	
	return <SessionCheck component={component} />
};