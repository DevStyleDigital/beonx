import Link from "next/link";
import { LinkIcon } from "components/Icons";
import { getDbServer } from "services/supabase/server";

const Step1 = async ({ params }: { params: { step: string } }) => {
	const database = getDbServer();
	const { data: inputs } = await database
		.from("inputs")
		.select("id,input_name")
		.eq("step", params.step);

	return (
		<div>
			<ul className="flex gap-4 flex-col">
				{inputs?.map((input) => (
					<li
						key={input.id}
						className="w-full cursor-pointer shadow-lg bg-white rounded-md hover:shadow-sm hover:bg-gray-100"
					>
						<Link
							href={`/admin/dash/steps/1/${input.id}`}
							className="py-4 px-8 flex items-center justify-between"
						>
							<span className="font-bold text-xl">{input.input_name}</span>
							<LinkIcon className="w-6 h-6" />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Step1;
