import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Step = () => {
	const cookieStore = cookies();

	const currStep = cookieStore.get("_CURR_STEP");

	redirect(`/steps/${currStep?.value || 1}`);
};

export default Step;
