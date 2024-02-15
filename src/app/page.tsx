import { Logo } from "assets/svgs/logo";
import { Mosaic } from "assets/svgs/mosaic";
import { Button } from "components/Button";
import { PlayIcon } from "components/Icons";
import { StartFromStopped } from "components/StartFromStopped";
import Image from "next/image";

const Home = () => {
	return (
		<>
			<StartFromStopped />
			<main className="w-full h-screen relative overflow-hidden">
				<div className="lg:ml-48 max-lg:px-16 max-md:px-4 max-lg:text-center w-full h-full flex flex-col justify-center lg:mr-[28vw] max-lg:items-center">
					<Logo
						aria-label="Beon X"
						className="w-96 max-sm:w-64 max-sm:translate-x-[8%] h-auto max-lg:translate-x-[10%] mb-8"
					/>
					<div>
						<h1 className="sm:text-5xl text-3xl font-black">
							Ready to unlock exponential
							<br />
							sustainable profitability?
						</h1>
						<h3 className="text-lg text-gray-600">Let&#8217;s find your X</h3>
					</div>

					<div className="flex max-[440px]:flex-col items-center mt-8">
						<Button.Root size="large" href="/steps" className="flex">
							<span className="block">Start Digitalization</span>
							<Button.Arrow aria-hidden className="w-[1.2rem] h-auto ml-4" />
						</Button.Root>

						<Button.Root
							href="#"
							size="fit"
							variant="unstyled"
							className="flex group max-[440px]:mt-4 max-[440px]:-translate-x-[5%]"
						>
							<PlayIcon aria-hidden />
							<span className="block group-hover:underline ml-4">
								How it works
							</span>
						</Button.Root>
					</div>
				</div>

				<div
					className="absolute w-screen h-screen top-0 left-0 -z-[1] max-lg:opacity-20"
					aria-hidden
				>
					<div className="absolute -top-1 -left-4">
						<Mosaic />
					</div>

					<div className="w-auto h-full absolute block right-[-5rem] top-0 xl:right-0">
						<Image
							width={1103}
							height={1100}
							src="/imgs/hero-banner.png"
							alt=""
							className="w-full h-full block object-cover"
						/>
					</div>

					<div className="absolute bottom-0 left-0">
						<div className="w-52 h-52 bg-text rotate-45 -translate-x-1/2 translate-y-1/2" />
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
