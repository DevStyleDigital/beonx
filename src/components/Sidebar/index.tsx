"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

type LinkProps = {
	id: number | string;
	route?: string;
	content: string;
	icon?: BTypes.FCIcon;
	child?: LinkProps[];
} & BTypes.FCChildren;

const SidebarLink: BTypes.FC<
	LinkProps & { className?: string; pathname: string | null },
	{},
	false,
	false
> = ({ pathname, className, ...link }) => (
	<Link
		href={link.route!}
		aria-current={pathname === link.route ? "page" : undefined}
		className={clsx(
			"flex items-center outline-none overflow-hidden focus:!bg-opacity-40 px-6 py-2 mt-4 duration-200 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100",
			{
				"bg-gray-600 !bg-opacity-25 !text-gray-100 !border-gray-100":
					pathname === link.route,
			},
			className,
		)}
	>
		{link.icon && <link.icon className="min-w-[1.25rem] min-h-[1.25rem]" />}
		<span className="mx-4 whitespace-nowrap text-ellipsis overflow-hidden ">
			{link.content}
		</span>
	</Link>
);

export const Sidebar: BTypes.FC<{
	links: LinkProps[];
}> = ({ links, children, className, ...props }) => {
	const pathname = usePathname();

	const [open, setOpen] = useState(false);
	const navRef = useRef<HTMLElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) buttonRef.current?.focus();
	}, [open]);

	return (
		<div className={clsx("flex", className)} {...props}>
			<div
				className={clsx(
					"hidden fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden",
					{ "!block": open },
				)}
				aria-hidden
				onClick={() => setOpen(false)}
				onKeyDown={() => {}}
			/>
			<div
				className={clsx(
					"fixed hover:scale-105 lg:hidden active:scale-95 border-2 duration-300 left-2 transition shadow-lg rounded-full top-4 z-50",
					{ "translate-x-60 !left-0": open },
				)}
			>
				<button
					type="button"
					className="text-gray-500 flex bg-white p-2 rounded-full focus:outline-none lg:hidden"
					aria-controls="b-sb"
					aria-expanded={open}
					ref={buttonRef}
					aria-label="Toggle Sidebar"
					onClick={() => {
						setOpen(!open);
						if (!open) navRef.current?.focus();
					}}
				>
					<svg
						className="w-6 h-6"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 6H20M4 12H20M4 18H11"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<title> </title>
					</svg>
				</button>
			</div>
			<div
				className={clsx(
					"-translate-x-full pb-8 scrollbar-thumb-b-dark custom-scrollbar-inputs ease-in fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0",
					{ "translate-x-0 ease-out": open },
				)}
			>
				<div className="flex items-center justify-center mt-8">
					<div className="flex items-center">
						<span className="text-2xl font-semibold text-white">
							GB-Dashboard
						</span>
					</div>
				</div>
				<nav
					className="mt-10 outline-none"
					id="b-sb"
					ref={navRef}
					tabIndex={open ? 0 : -1}
					onKeyDown={(ev) => {
						if (ev.key === "Escape") setOpen(false);
					}}
				>
					{links.map((link: LinkProps) =>
						link.child ? (
							<Fragment key={link.id}>
								<span className="flex items-center px-4 py-2 mt-4 duration-200 text-gray-500">
									- {link.content}
								</span>
								{link.child.map((linkChild: LinkProps, i) => (
									<SidebarLink
										pathname={pathname}
										className={i === 0 ? "!mt-0" : ""}
										key={linkChild.id}
										{...linkChild}
									/>
								))}
								{link.children}
							</Fragment>
						) : (
							<SidebarLink pathname={pathname} key={link.id} {...link} />
						),
					)}
				</nav>
			</div>
		</div>
	);
};
