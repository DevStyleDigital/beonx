import { Nunito_Sans, Work_Sans } from "@next/font/google";

import { getDbClient } from "services/supabase";
import { SupabaseProvider } from "contexts/Supabase";
import { SupabaseListener } from "contexts/Supabase/Listener";

import clsx from "clsx";
import { CookieConfirmation } from "components/CookieConfirmation";

import "styles/global.css";
import "react-phone-input-2/lib/style.css";

const nunitoSans = Nunito_Sans({
	weight: ["400", "900"],
	variable: "--font-primary",
	fallback: ["sans-serif"],
	subsets: ["latin"],
});
const workSans = Work_Sans({
	weight: ["400"],
	variable: "--font-secondary",
	fallback: ["sans-serif"],
	subsets: ["latin"],
});

const RootLayout = async ({ children }: BTypes.FCChildren) => {
	const database = getDbClient();

	const {
		data: { session },
	} = await database.auth.getSession();

	return (
		<html lang="en" className={clsx(nunitoSans.variable, workSans.variable)}>
			<head />
			<body className="font-sans text-text reset">
				<CookieConfirmation />
				<SupabaseProvider>
					<SupabaseListener serverAccessToken={session?.access_token} />
					{children}
				</SupabaseProvider>
			</body>
		</html>
	);
};

export default RootLayout;
