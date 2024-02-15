import { getDbServer } from "services/supabase/server";
import { Inputs } from "../../Inputs";
import { notFound } from "next/navigation";

const INPUTS_ID = [
	"laundry",
	"purchase",
	"plastic-amenities",
	"resource-retention",
	"sustainability",
	"buying",
	"cleaning-room",
];

const Step = async () => {
	const database = getDbServer();
	const { data: inputs, error: inputError } = await database
		.from("inputs")
		.select("id,input_name,options,type,size")
		.eq("step", "6");

	if (!inputs || inputError)
		notFound();

	return <Inputs inputs={inputs} inputsOrder={INPUTS_ID} step="6" stepByStep />;
};

export default Step;
