import { clsx } from "clsx";

const DoughnutChartPie: BTypes.FC<
	{
		index?: number;
		id: number | string;
		amount?: number;
		percent: number;
		delay?: number;
		strokeWidth?: string;
		color?: string;
		backgroundColor?: string;
		fillColor?: string;
		className?: string;
	},
	{},
	false,
	false
> = ({
	amount = 1,
	id,
	index = 0,
	percent,
	className,
	delay = 0,
	strokeWidth = "1rem",
	backgroundColor = "#0003",
	color = "#000",
	fillColor = "#FFF",
}) => {
	const strokeWidthNumber = Number(
		strokeWidth.replaceAll(/(\d*[.]?\d*).*/g, "$1"),
	);

	const size = (additionalSize = 0) =>
		`calc(${index + 1} * (${strokeWidth} + 1rem) + (${strokeWidth} / -2 + ${
			additionalSize * strokeWidthNumber
		}rem + var(--content-size)))`;

	return (
		<div
			key={id}
			style={{
				["--percent" as string]: 0,
				["--curr-percent" as string]: percent,
				zIndex: amount - index,
			}}
			className={clsx(
				"opacity-90 overflow-hidden hover:opacity-100 rounded-full transition-opacity",
				{
					relative: index === amount - 1,
					"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2":
						index !== amount - 1,
				},
				className,
			)}
		>
			<div
				style={{ animationDelay: `${delay}s` }}
				className="animate-percentage rotate-[calc((var(--percent))*-3.6deg)]"
			>
				<span
					style={{
						padding: size(),
						background: backgroundColor,
					}}
					className={clsx("rounded-full block")}
				/>
				<span
					key={id}
					style={{
						background: `conic-gradient(${color} calc(var(--percent)*1%),#0000 0)`,
						padding: size(),
						transition: "1s ease-in-out",
					}}
					className={clsx("block absolute z-1 top-0 rounded-full")}
				/>
				<span
					style={{
						padding: size(-1),
						background: fillColor,
					}}
					className={clsx(
						"block absolute z-1 top-1/2 left-1/2 -translate-x-1/2 rounded-full -translate-y-1/2",
					)}
				/>
				<span
					style={{ background: color, width: strokeWidth, height: strokeWidth }}
					className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 z-10"
				/>
			</div>
			<span
				style={{ background: color, width: strokeWidth, height: strokeWidth }}
				className="top-0 left-1/2 -translate-x-1/2 rounded-full absolute"
			/>
		</div>
	);
};

const DoughnutChartRoot: BTypes.FC<
	{
		defaultPercent: number;
		textClassName?: string;
		contentSize?: string;
		percentRange?: number;
	},
	{},
	false
> = ({
	defaultPercent,
	percentRange,
	textClassName,
	contentSize = "3rem",
	children,
}) => {
	return (
		<div
			className="relative w-fit h-fit"
			style={{
				["--content-size" as string]: contentSize,
			}}
		>
			{children}
			<span
				className={clsx(
					"font-black flex items-center flex-col text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
					textClassName,
				)}
			>
				<span>{defaultPercent}</span>
				{percentRange && (
					<span className="text-lg font-medium text-gray-600">
						0-{percentRange}
					</span>
				)}
			</span>
		</div>
	);
};

export const DoughnutChart = {
	Root: DoughnutChartRoot,
	Pie: DoughnutChartPie,
};
