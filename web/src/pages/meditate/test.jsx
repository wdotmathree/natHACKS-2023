import axios from "axios";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/button/PrimaryButton";
import Footer from "@/components/Footer";
import Graph from "@/components/Graph";
import Pie from "@/components/Pie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useSound from "use-sound";

export default () => {
	const [conc, setConc] = useState(80);
	const [vol, setVol] = useState(100);

	const [origin, setOrigin] = useState(Math.floor(Date.now() / 1000));
	const [timer, setTimer] = useState(122);
	const [meditationMode, setMeditationMode] = useState(true);

	useEffect(() => {
		setInterval(() => {
			setTimer(Math.floor(Date.now() / 1000) - origin);
		}, 1000);
	}, []);

	return (
		<>
			<Head>
				<title>MediNoise</title>
				<link rel="icon" href="/images/favicon.png" />
			</Head>

			<Navbar
				links={[
					{ text: "Home", url: "/" },
					{ text: "Meditate", url: "/meditate" },
				]}
			/>

			<main className="bg-dark-0 w-full">
				<div className="relative w-4/5 mx-auto mt-[10rem] mb-[6rem] h-[100rem]">
					<h1 className="mb-16 text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-sky-500 font-bold text-7xl text-center">
						Meditate
					</h1>

					<div className="flex flex-row justify-center items-start">
						<div className="grow px-10">
							<Graph />
						</div>

						<div className="min-w-[25rem] px-10 flex flex-col justify-center items-start sticky top-[6rem]">
							<div className="bg-dark-1 rounded px-[1.5rem] py-[1.5rem] border border-border w-full mb-[1rem]">
								<h2 className="text-grey-1 text-xl font-semibold mb-[1rem]">
									Concentration Threshold:
								</h2>

								<div className="flex flex-row items-center justify-start">
									<input
										className="w-full"
										type="range"
										min={1}
										max={100}
										value={conc}
										onChange={(e) => setConc(e.currentTarget.value)}
									/>

									<p className="text-grey-1 ml-2">{conc}</p>
								</div>

								<hr className="border-border my-4" />

								<div className="flex flex-row items-center justify-start">
									<input
										className="w-full"
										type="range"
										min={1}
										max={100}
										value={conc}
										onChange={(e) => setConc(e.currentTarget.value)}
									/>

									<p className="text-grey-1 ml-2">{conc}</p>
								</div>

								<PrimaryButton
									link="/api/problems/random"
									onClick={(e) => {
										e.preventDefault();
										window.open("/api/problems/random");
									}}
									target="_self"
									text={
										<span>
											<FontAwesomeIcon
												icon={faShuffle}
												className="text-xl inline-block w-[1.2rem] mt-[-0.23rem] mr-0.5"
											/>{" "}
											Reset to Default
										</span>
									}
									bgColor="dark-1"
								/>
							</div>

							{meditationMode && (
								<div className="bg-dark-1 rounded px-[1.5rem] py-[1.5rem] border border-border w-full mb-[1rem]">
									<h2 className="text-grey-1 text-xl font-semibold mb-[1rem]">Meditation Timer:</h2>

									<div className="flex flex-row items-center justify-center">
										<div className="flex flex-row items-center justify-center bg-dark-0 aspect-square rounded-full w-[80%]">
											<CircularProgressbar
												value={(timer % 300) / 3}
												text={
													(timer / 60 < 10
														? "0" + Math.floor(timer / 60)
														: Math.floor(timer / 60)) +
													":" +
													(timer % 60 < 10 ? "0" + (timer % 60) : timer % 60)
												}
												styles={buildStyles({
													pathColor: `rgb(0, 198, 255)`,
													textColor: "#b8b5b5",
													trailColor: "#111d25",
												})}
											/>
										</div>
									</div>

									<hr className="border-border my-4" />

									<div className="flex flex-row items-center justify-center">
										<PrimaryButton
											link="/api/problems/random"
											onClick={(e) => {
												e.preventDefault();

											}}
											target="_self"
											text={
												<span>
													<FontAwesomeIcon
														icon={faShuffle}
														className="text-xl inline-block w-[1.2rem] mt-[-0.23rem] mr-0.5"
													/>{" "}
													Exit Meditation
												</span>
											}
											bgColor="dark-1"
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};
