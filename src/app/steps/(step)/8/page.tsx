"use client";

import colors from "@root/colors.json";
import { DoughnutChart } from "components/DoughnutChart";
import { Button } from "components/Button";
import { purifyText } from "services/purifyText";
import { useWindowSize } from "hooks/window-size";
import { usePercentages } from "contexts/Percentages";

const PROFITABILITY_INDEX_PERCENT_NAMES = [
	{ id: 1, name: "Tech Stack (Digitalisation Index)" },
	{ id: 2, name: "Channel Strategy & Distribution Index" },
	{ id: 3, name: "Pricing Strategy" },
	{ id: 4, name: "Customer<br />Journey" },
	{ id: 5, name: "Revenue<br />Retention" },
	{ id: 6, name: "Revenue<br />Generation" },
	{ id: 7, name: "Cost<br />Optimization" },
	{ id: 8, name: "Sustainability" },
];

const Step = () => {
	const { percentages } = usePercentages();
	const size = useWindowSize();

	return (
		<div className="mt-8 flex px-4 gap-8 sm:!px-10 pb-8 flex-wrap justify-between items-center max-[1136px]:flex-col">
			<section className="w-fit">
				<DoughnutChart.Root
					defaultPercent={percentages?.total || 0}
					contentSize={size.width && size.width <= 360 ? "5rem" : "8.125rem"}
					textClassName={
						size.width && size.width <= 360 ? "!text-2xl" : "!text-9xl"
					}
					percentRange={100}
				>
					<DoughnutChart.Pie
						color={colors.pink[600]}
						id="average-percent"
						percent={percentages?.total || 0}
						strokeWidth={size.width && size.width <= 360 ? "1rem" : "2rem"}
						backgroundColor={colors.gray[100]}
					/>
				</DoughnutChart.Root>

				<Button.Root className="mt-8">
					<span className="w-full text-xl text-center">I need help now</span>
				</Button.Root>
			</section>
			<section className="min-[1136px]:w-[60%]">
				<ul className="flex flex-wrap justify-center min-[1136px]:justify-between gap-8 px-4">
					{PROFITABILITY_INDEX_PERCENT_NAMES.map(
						(profitabilityIndexPercentName) => (
							<li
								key={profitabilityIndexPercentName.id}
								className="flex items-center"
							>
								<span
									className="min-[1136px]:w-44 w-36 text-lg block min-[1136px]:text-right font-sans-secondary text-primary mr-4"
									dangerouslySetInnerHTML={{
										__html: purifyText(profitabilityIndexPercentName.name),
									}}
								/>
								<DoughnutChart.Root
									defaultPercent={percentages?.total || 0}
									contentSize="1.5rem"
									textClassName="!text-3xl"
								>
									<DoughnutChart.Pie
										color={colors.orange}
										id="average-percent"
										percent={percentages?.total || 0}
										strokeWidth={
											size.width && size.width <= 360 ? "0.6rem" : "0.8rem"
										}
										backgroundColor={colors.gray[100]}
									/>
								</DoughnutChart.Root>
							</li>
						),
					)}
				</ul>
			</section>
		</div>
	);
};

export default Step;
