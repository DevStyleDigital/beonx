"use client";

import { useContext, useState, createContext, useRef, useEffect } from "react";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import ReactInputMask from "@mona-health/react-input-mask";
import { InputSkeleton } from "components/InputSkeleton";

interface InputContextProps {
	id: string;
	disabled?: boolean;
}

const InputContext = createContext<InputContextProps>({} as InputContextProps);
const useInput = () => useContext(InputContext);

export const InputRoot: BTypes.FC<
	{ id: string; borderColor?: string; disabled?: boolean },
	React.InputHTMLAttributes<HTMLInputElement>,
	false
> = ({ disabled, borderColor, ...props }) => {
	return (
		<InputContext.Provider value={{ id: props.id, disabled }}>
			<div
				{...props}
				style={{
					["--color" as string]: borderColor || "#000",
					opacity: disabled ? "0.5" : "1",
					...props.style,
				}}
			/>
		</InputContext.Provider>
	);
};

export const InputLabel: BTypes.FC<
	{},
	React.LabelHTMLAttributes<HTMLLabelElement>,
	false
> = ({ ...props }) => {
	const { id } = useInput();

	return (
		<label
			htmlFor={id}
			{...props}
			className={clsx("text-lg text-[var(--color)]", props.className)}
		/>
	);
};

export const InputInput: BTypes.FC<
	{
		mask?: string | (string | RegExp)[];
		maskChar?: string;
		beforeMaskedStateChange?: (option: any) => string;
	},
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "disabled">,
	false
> = ({
	mask,
	type = "text",
	maskChar,
	beforeMaskedStateChange,
	className,
	style,
	placeholder,
	...props
}) => {
	const { id, disabled } = useInput();
	const inputRef = useRef<any>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [mounted, setMounted] = useState(false);
	const Comp = mask ? ReactInputMask : "input";

	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="relative select-none z-10">
			{mounted ? (
				<Comp
					type={showPassword ? "text" : type}
					className={`input-default ${className}`}
					ref={inputRef}
					mask={mask || ""}
					maskplaceholder={maskChar}
					min={type === "password" ? 6 : undefined}
					max={type === "password" ? 132 : undefined}
					placeholder={placeholder}
					{...{
						[mask ? "beforeMaskedStateChange" : "onFocus"]:
							beforeMaskedStateChange,
					}}
					{...props}
					disabled={disabled}
					id={id}
				/>
			) : (
				<InputSkeleton />
			)}
			{type === "password" && (
				<button
					type="button"
					className="absolute right-0 mr-2 top-1/2 transform -translate-y-1/2 [&>*]:text-[var(--color)]"
					onClick={togglePasswordVisibility}
					disabled={disabled}
				>
					{showPassword ? <EyeNoneIcon /> : <EyeOpenIcon />}
				</button>
			)}
		</div>
	);
};
