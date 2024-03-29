import { getDbServer } from "services/supabase/server";
import { Inputs } from "../../Inputs";
import { notFound } from "next/navigation";

const INPUTS_ID = [
	"tour-operation",
	"channel-differentiated-pricing",
	"wholesalers",
	"ota",
	"corporate",
	"crew",
	"mice",
	"yieldable",
	"leisure",
	"direct-channels",
	"rate-parity",
	"loyalty-programme",
	"added-direct-channels",
	"inventory-parity",
];

const Step = async () => {
	const database = getDbServer();
	const { data: inputs, error: inputError } = await database
		.from("inputs")
		.select("id,input_name,options,type,size")
		.eq("step", "3");

	if (!inputs || inputError)
		notFound();

	return <Inputs inputs={inputs} inputsOrder={INPUTS_ID} step="3" stepByStep />;
};

export default Step;
