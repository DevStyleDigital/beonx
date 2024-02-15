import { usePersistedState } from "./persisted-state";

export function usePersistedStepsValues<T extends string, U>(): [
	{ [key in T]: U | undefined },
	React.Dispatch<React.SetStateAction<{ [key in T]: U | undefined }>>,
] {
	const [stepsValues, setStepsValues] = usePersistedState<{
		[key in T]: U | undefined;
	}>("STEPS_VALUES", {} as { [key in T]: U });
	return [stepsValues, setStepsValues];
}
