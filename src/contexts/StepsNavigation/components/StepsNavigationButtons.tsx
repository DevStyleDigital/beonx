"use client";

import { Button } from "components/Button";
import { useStepsNavigation } from "..";

export const StepsNavigationButtons = () => {
	const { prev, thisStep } = useStepsNavigation();

	return (
		<>
			<Button.Root
				size="fit"
				type="button"
				onClick={() => prev()}
				disabled={thisStep === 1}
			>
				<Button.Arrow
					aria-label="Previously step"
					className="rotate-180 !w-4 !h-auto"
				/>
			</Button.Root>
			<Button.Root
				size="fit"
				className="ml-4"
				type="submit"
				disabled={thisStep === 8}
			>
				<Button.Arrow aria-label="Next step" className="!w-4 !h-auto" />
			</Button.Root>
		</>
	);
};
