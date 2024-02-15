export function removeDuplicatesFromArray<T extends any[]>(arr: T): T {
	const arrStringify = arr.map((data) => JSON.stringify(data));
	const newArray = [...new Set(arrStringify)].map((data) => JSON.parse(data));
	return newArray as T;
}
