export type Option = {
	size: number;
	label: string;
	value: string;
};

export type InputType = {
	id: string;
	step: number;
	size?: number;
	type: "select" | "select-tag" | "boolean" | "percent" | "number" | "currency";
	options?: Option[];
	input_name: string;
};

export interface Database {
	public: {
		Tables: {
			inputs: {
				Row: InputType;
				Insert: InputType;
				Update: Partial<InputType>;
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
