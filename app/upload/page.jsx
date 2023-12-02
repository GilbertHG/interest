import {SessionCheck} from "@/components/SessionCheck";
import {UploadForm} from "@/components/UploadForm";

export default function UploadPage() {
	let component = (
		<>
			<section className={"w-full flex-center"}>
				<h1 className={"head_text text-center mb-5"}>Drop your image here</h1>
				<UploadForm />
			</section>
		</>
	);
	
	return <SessionCheck component={component} />
};