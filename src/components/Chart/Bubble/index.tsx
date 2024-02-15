"use client";

export type ChartData = {
	id: number | string;
	color: string;
	label: string;
	fill: boolean;
	visible: boolean;
	x: number;
	y: number;
	r: number;
};

export const BubbleChart: BTypes.FC<{
	options?: any;
	data: ChartData[];
}> = ({ data }) => {
	return (
		<div className="relative w-full h-full border-gray-600 border-b-2 border-l-2">
			<div className="w-full h-full">
				{data.map((bubble, i) => (
					<span
						key={bubble.id}
						style={{
							minWidth: `${bubble.r * 2}rem`,
							minHeight: `${bubble.r * 2}rem`,
							maxWidth: `${bubble.r * 2 + bubble.r * 2 * 0.4}rem`,
							maxHeight: `${bubble.r * 2 + bubble.r * 2 * 0.4}rem`,
							opacity: bubble.visible ? 1 : 0,
							borderColor: bubble.color,
							background: bubble.fill ? `${bubble.color}33` : "transparent",
							zIndex: i + 1,
							top: `calc(${bubble.y * -1}% + 50%)`,
							left: `calc(${bubble.x}% + 50%)`,
						}}
						className="rounded-full animation-bubble text-sm -translate-x-1/2 opacity-80 hover:opacity-100 -translate-y-1/2 absolute border-2 w-fit h-fit flex items-center [white-space:wrap] p-2 transition justify-center hover:scale-100 hover:!z-50"
					>
						<span className="w-min text-center">{bubble.label}</span>
					</span>
				))}
			</div>

			<div className="w-full h-full absolute top-0 left-0">
				<span className="w-px h-full bg-gray-600 absolute -translate-x-1/2 left-1/2 block" />
				<span className="w-full h-px bg-gray-600 absolute -translate-y-1/2 top-1/2 block" />
			</div>
		</div>
	);
};
