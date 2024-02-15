import { SelectBoolean } from "components/Pages/Inputs/Boolean";
import { InputCurrency } from "components/Pages/Inputs/Currency";
import { InputNumber } from "components/Pages/Inputs/InputNumber";
import { InputPercent } from "components/Pages/Inputs/Percent";
import { Select } from "components/Pages/Inputs/Select";
import { SelectTag } from "components/Pages/Inputs/Tag";

export const INPUTS_COMPONENTS = {
	boolean: SelectBoolean,
	"select-tag": SelectTag,
	select: Select,
	percent: InputPercent,
	number: InputNumber,
	currency: InputCurrency,
} as const;
