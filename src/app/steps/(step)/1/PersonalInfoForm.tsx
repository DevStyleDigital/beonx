"use client";
import colors from "@root/colors.json";
import clsx from "clsx";
import { Input } from "components/Input";
import { InputSkeleton } from "components/InputSkeleton";
import { useSteps } from "contexts/Steps";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

export const PersonalInfoForm = () => {
	const { stepsValues, setStepsValues, setInputUpdated, errors, setErrors } =
		useSteps<"name" | "email" | "phone">();
	const [mounted, setMounted] = useState(false);
	let invalidPhone = false;

	function handleValue(
		obj: {
			[key in "name" | "email" | "phone"]?: { value: string; type: string };
		},
	) {
		setInputUpdated(Object.keys(obj)[0]);

		setStepsValues((prev) => ({
			...(prev || {}),
			"1": {
				...(prev?.[1] || {}),
				...obj,
			},
		}));
	}

	useEffect(() => setMounted(true), []);

	return (
		<section className="flex w-full max-md:flex-col gap-8 px-4 sm:!px-10 ">
			<Input.Root
				className="w-80 max-md:!w-full"
				borderColor={colors.primary}
				id="name"
			>
				<Input.Label className="block h-10">Your name:</Input.Label>
				<Input.Input
					placeholder="Type here..."
					required
					name="name"
					defaultValue={stepsValues?.["1"]?.name?.value as string}
					onBlur={({ target: { value } }) =>
						handleValue({ name: { value, type: "text" } })
					}
				/>
			</Input.Root>
			<Input.Root
				className="w-80 max-md:!w-full"
				borderColor={colors.primary}
				id="email"
			>
				<Input.Label className="block h-10">Your email:</Input.Label>
				<Input.Input
					placeholder="Type here..."
					type="email"
					required
					name="email"
					defaultValue={stepsValues?.[1]?.email?.value as string}
					onBlur={({ target: { value } }) =>
						handleValue({ email: { value, type: "text" } })
					}
				/>
			</Input.Root>

			<div
				className={clsx("input-default phone-input", {
					"!border-none": !mounted,
					"invalid-number": errors?.phone === "invalid",
				})}
			>
				<Input.Label htmlFor="phone" className="block h-10 text-primary">
					Your Phone:{" "}
					{errors?.phone === "invalid" ? (
						<span className="text-xs text-gray-500">
							(invalid phone number)
						</span>
					) : (
						""
					)}
				</Input.Label>

				{mounted ? (
					<PhoneInput
						placeholder="Type here..."
						inputProps={{ id: "phone", required: true }}
						country={"us"}
						isValid={(number, country: any) => {
							const isValid =
								number.length ===
								(country?.format?.replaceAll(/[^.]/g, "").length || 0);
							invalidPhone = !isValid;
							return errors?.phone === "invalid";
						}}
						onChange={() =>
							setErrors((prev) => ({
								...prev,
								phone: invalidPhone ? "invalid" : undefined,
							}))
						}
						value={(stepsValues?.["1"]?.phone?.value as string) || ""}
						onBlur={({ target: { value } }) => {
							handleValue({ phone: { value, type: "text" } });
						}}
					/>
				) : (
					<InputSkeleton />
				)}
			</div>
		</section>
	);
};
