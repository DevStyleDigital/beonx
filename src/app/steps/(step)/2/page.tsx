import { getDbServer } from "services/supabase/server";
import { FormControl } from "../FormControl";
import { Bubbles } from "./Bubbles";
import { Inputs } from "../Inputs";
import { INPUTS_ID } from "./InputsId";
import { notFound } from "next/navigation";

const Step = async () => {
	const database = getDbServer();
	const { data: inputs, error: inputError } = await database
		.from("inputs")
		.select("id,input_name,options,type,size")
		.eq("step", "2");

	if (!inputs || inputError)
		notFound();

	return (
		<FormControl>
			<div className="flex max-lg:flex-col-reverse items-center px-8 justify-between gap-5 flex-wrap-reverse">
				<div className="flex max-[1243px]:mb-16 flex-col min-[1243px]:w-96 w-full min-[1243px]:overflow-y-auto min-[1243px]:max-h-[62vh] p-4">
					<Inputs inputs={inputs} inputsOrder={INPUTS_ID} step="2" stepByStep />
				</div>

				<Bubbles />
			</div>
		</FormControl>
	);
};

export default Step;
