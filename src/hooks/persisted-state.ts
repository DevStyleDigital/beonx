import { useEffect, useState } from "react";

export function usePersistedState<T>(
	key: string,
	initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [data, setData] = useState<T>(() => {
		if (typeof window !== "undefined") {
			const storageValue = localStorage.getItem(key);
			if (storageValue) return JSON.parse(storageValue);
		}
		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(data));
	}, [key, data]);

	return [data, setData];
}
