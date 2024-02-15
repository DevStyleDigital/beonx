import { getDbServer } from "services/supabase/server";
import { Inputs } from "../../Inputs";
import { notFound } from "next/navigation";

const INPUTS_ID = [
	"price-rooms-individually",
	"sell-packages",
	"market-positioning",
	"upgrades-dynamic-pricing",
	"cor",
	"market-data",
	"flight-data",
	"dynamic-pricing",
	"policy-price",
	"segmentation",
	"attribute-based-pricing",
	"index-rates",
	"price-groups",
	"quality-data-point",
	"competitor-pricing",
	"event-data",
];

const Step = async () => {
	const database = getDbServer();
	const { data: inputs, error: inputError } = await database
		.from("inputs")
		.select("id,input_name,options,type,size")
		.eq("step", "4");

	if (!inputs || inputError)
		notFound();

	return <Inputs inputs={inputs} inputsOrder={INPUTS_ID} step="4" stepByStep />;
};

export default Step;
