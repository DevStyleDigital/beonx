"use client";

import { usePersistedState } from "hooks/persisted-state";
import { cookies } from "services/cookies";
import { useEffect, useState } from "react";

export const CookieConfirmation = () => {
	const [mounted, setMounted] = useState(false);
	const [hiddenToast, setHiddenToast] = useState(
		cookies.get("DISMISS_COOKIE") === "true",
	);

	useEffect(() => {
		setMounted(true);
		const timer = setTimeout(
			() => {
				setHiddenToast(true);
			},
			1 * 60 * 1000,
		); // set the delay here (in milliseconds)
		return () => clearTimeout(timer);
	}, [setHiddenToast]);

	function dismissToast() {
		cookies.set("DISMISS_COOKIE", "true");
		setHiddenToast(true);
	}

	return (
		<>
			{mounted && !hiddenToast && (
				<div
					className="fixed z-50 bottom-0 left-0 m-4"
					role="alert"
					aria-live="polite"
				>
					<div className="bg-gray-700 text-white px-4 py-3 rounded shadow-md">
						<div className="flex justify-between items-center">
							<div className="mr-2">
								<p className="text-sm">
									We use cookies to enhance your experience on our website and
									for internal purposes such as website performance analysis and
									optimization.
								</p>
							</div>
							<div>
								<button
									type="button"
									className="text-gray-400 hover:text-gray-200"
									onClick={dismissToast}
									aria-label="Dismiss cookie confirmation message"
								>
									X
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
