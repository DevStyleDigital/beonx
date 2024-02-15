"use client";

import clsx from "clsx";
import * as Icon from "components/Icons";
import { useStepsNavigation } from "..";
import { Button } from "components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const StepsNavigationRoot: BTypes.FC<{}, {}, true, false, false> = ({
	...props
}) => {
	const { stepsCompleted, currStep, thisStep } = useStepsNavigation();
	const router = useRouter();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div {...props}>
			<nav className="flex items-center p-4 custom-scrollbar-inputs overflow-auto">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((step, i) => {
					const isCurrentStep = currStep === step;
					const current = thisStep === step;
					const completed = stepsCompleted?.includes(step);
					const completedOrCurrent = completed || current;

					return (
						<div
							key={step}
							className={clsx("relative cursor-not-allowed", {
								"!cursor-default": mounted && completedOrCurrent,
							})}
						>
							{i !== 0 && (
								<span
									aria-hidden
									className={clsx(
										"pointer-events-none cursor-default w-14 absolute top-1/2 -z-10 -translate-y-1/2 h-[2px] bg-gray-150",
										{
											"bg-primary":
												mounted && (completedOrCurrent || isCurrentStep),
										},
									)}
								/>
							)}
							<Button.Root
								size="no-pd"
								variant="unstyled"
								onClick={() => router.push(`/steps/${step}`)}
								className={clsx(
									"bg-background pointer-events-none select-none border-2 relative border-gray-600 !rounded-full min-w-[2rem] h-8 flex items-center justify-center",
									{
										"ml-14": i !== 0,
										"text-gray-600":
											mounted && !completedOrCurrent && !isCurrentStep,
										"!text-primary": mounted && isCurrentStep && !current,
										"!text-background": mounted && current && isCurrentStep,
										"!bg-primary !border-primary !text-background":
											mounted && completedOrCurrent,
										"!border-primary !pointer-events-auto !cursor-pointer":
											mounted && (completedOrCurrent || isCurrentStep),
									},
								)}
							>
								{mounted && completed && !current ? (
									<Icon.ConfirmIcon className="w-4 h-auto" />
								) : (
									step
								)}
							</Button.Root>
						</div>
					);
				})}
			</nav>
		</div>
	);
};
