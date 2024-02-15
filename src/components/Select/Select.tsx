"use client";

import * as SelectRadix from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import React, { useState, createContext, useContext, useEffect } from "react";
import { InputSkeleton } from "components/InputSkeleton";

interface SelectContextProps {
	// open: boolean;
	color: string;
	// setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectContext = createContext<SelectContextProps>(
	{} as SelectContextProps,
);

const useSelect = () => useContext(SelectContext);

export const SelectRoot: BTypes.FC<
	SelectRadix.SelectProps,
	{ color?: string; className?: string; inputName: JSX.Element },
	false
> = ({ color = "#0003", inputName, ...props }) => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	return (
		<SelectContext.Provider value={{ color }}>
			{mounted ? (
				<div
					className="relative w-full [&>div]:w-full [&>div]:!absolute [&>div]:left-0"
					style={{
						["--color" as string]: color,
						opacity: props.disabled ? "0.5" : "1",
					}}
				>
					<SelectRadix.Root {...props} />
				</div>
			) : (
				<div className="flex flex-col w-full h-100% justify-between">
					{inputName}
					<InputSkeleton />
				</div>
			)}
		</SelectContext.Provider>
	);
};

export const SelectTrigger: BTypes.FC<
	SelectRadix.SelectTriggerProps,
	{placeholder?: string},
	false
> = ({ children, ...props }) => {
	return (
		<SelectRadix.Trigger
			{...props}
			className="flex flex-col w-full h-full justify-between outline-none"
		>
			{children}
			<span
				className={clsx(
					"w-full flex justify-between relative z-10 py-1 items-end border-b-[1px] border-[var(--color)] transition-all border-opacity-75 focus:border-opacity-100 outline-none",
					props.className,
				)}
			>
				<SelectRadix.Value
					placeholder={
						<span className="text-gray-600 text-sm font-sans-secondary">
							{props.placeholder}
						</span>
					}
				/>
				<SelectRadix.Icon className="mr-3">
					<ChevronDownIcon className="w-4 h-4 text-[var(--color)]" />
				</SelectRadix.Icon>
			</span>
		</SelectRadix.Trigger>
	);
};

export const SelectPortal: BTypes.FC<SelectRadix.SelectPortalProps, {className?:string}, false> =
	({ children, ...props }) => {
		return (
			<SelectRadix.Content
				suppressHydrationWarning
				{...props}
				position="popper"
				sideOffset={8}
				className={clsx(
					"bg-white z-50 rounded-md py-2 drop-shadow-lg max-h-48",
					props.className,
				)}
			>
				<SelectRadix.Viewport className="!overflow-y-auto py-3 custom-scrollbar-inputs">
					{children}
				</SelectRadix.Viewport>
			</SelectRadix.Content>
		);
	};

export const SelectOption: BTypes.FC<SelectRadix.SelectItemProps, {}, false> =
	({ children, ...props }) => {
		const { color } = useSelect();
		return (
			<SelectRadix.Item
				{...props}
				style={{
					["--color" as string]: color,
				}}
				className="
        flex
        items-center
        h-6
        p-5
        relative
        select-none
        focus:bg-gray-100
        outline-none
        [&[data-state=checked]]:bg-[var(--color)]
        [&[data-state=checked]]:focus:bg-[var(--color)]
      "
			>
				<SelectRadix.ItemText>{children}</SelectRadix.ItemText>
			</SelectRadix.Item>
		);
	};
