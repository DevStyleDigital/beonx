import { FormControl } from "../FormControl";

const StepLayout: BTypes.NPage<BTypes.FCChildren, true> = async ({
	children,
}) => {
	return (
		<FormControl>
			<div className="flex h-full flex-col justify-center py-8">
				<div className="flex h-fit gap-8 max-w-7xl mx-auto justify-center sm:[&>div]:max-w-[18rem] px-4 flex-wrap">
					{children}
				</div>
			</div>
		</FormControl>
	);
};

export default StepLayout;
