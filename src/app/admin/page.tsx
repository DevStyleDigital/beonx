import { getDbServer } from "services/supabase/server";
import { GetServerSideProps } from "next";
import { AuthUI } from "./AuthUI";
import { notFound, redirect } from "next/navigation";

const Admin = async () => {
	const database = getDbServer();
	const {
		data: { user },
		error,
	} = await database.auth.getUser();
	if (user?.user_metadata.roles?.includes("admin") && !error)
		redirect("/admin/dash");
	if (user && !error) redirect("/");

	return (
		<main className="max-w-lg mx-auto mt-24 p-2">
			<h1 className="title">LOGIN:</h1>
			<AuthUI />
		</main>
	);
};

export default Admin;
