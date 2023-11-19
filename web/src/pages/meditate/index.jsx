// PROBABLY
// TODO: implement needle in graph (could implement if have time; shouldn't be too hard according to william)
// TODO: either or fix spedometer (honestly js delete it for now)

// ROBERT"S STUFF (some duplicate(s) of the important section)
// TODO: implement exit meditation
// TODO: need to implement volume control (but worst comes to worst if it's too loud i js turn down my system volume)
// * NOTE TO ROBERT: no websockets; we are making requests to backend with HTTP at set intervals now

import axios from "axios";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/button/PrimaryButton";
import NolinkButton from "@/components/button/NolinkButton";
import Footer from "@/components/Footer";
import Graph from "@/components/Graph";
import Pie from "@/components/Pie";
import Audio from "@/components/Audio";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faSearch, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

export default () => {
	const [conc, setConc] = useState(80);
	const [vol, setVol] = useState(100);

	const [showSettings, setShowSettings] = useState(false);

	const audioPlayer = useRef(); // kinda useless rn
	const chartRef = useRef();

	const [origin, setOrigin] = useState(Date.now());
	const [timer, setTimer] = useState(0);
	const [timerIntervalId, setTimerIntervalId] = useState(null);
	const [meditationMode, setMeditationMode] = useState(true);

	const [attentionData, setAttentionData] = useState([]);
	const [alertnessData, setAlertnessData] = useState([]);
	const [sum, setSum] = useState(0);
	const [avgData, setAvgData] = useState([]);

	const [labelData, setLabelData] = useState([]);

	useEffect(() => {
		let timeInterval = null;

		setInterval(() => {
			axios
				.post("/api/concentration")
				.then((res) => {
					console.log(res.data, conc);
					if (timeInterval === null && res.data.concentration * 100 < conc) {
						// timer not running, start it if not concentrated
						timeInterval = setInterval(() => {
							setTimer(Math.floor((Date.now() - origin) / 1000));
						}, 100);

						setTimerIntervalId(timeInterval);
						setOrigin(Date.now());
						setMeditationMode(true);

						audioPlayer.current.muted = false;
					}

					// * For plotting

					const data = res.data;
					const attention = data.attention;
					const alertness = data.alertness;

					setAttentionData((prev) => [...prev, attention]);
					setAlertnessData((prev) => [...prev, alertness]);
					setSum((prev) => prev + attention + alertness);
					setAvgData((prev) => [...prev, sum / (prev.length + 1) / 2]);
					setLabelData((prev) => [...prev, 0]);

					chartRef.current.update();
					console.log(chartRef.current);

					// data.forEach((value, index) => {
					// 	Chart.data.datasets[index].data.push(value);
					// });
					// if (Chart.data.labels.length > 40) {
					// 	data.forEach((value, index) => {
					// 		Chart.data.datasets[index].data.shift();
					// 	});
					// 	Chart.data.labels.shift();
					// }
					// speedometer.data.datasets[0].needleValue = (500 * longTermAvg) / (Chart.data.datasets[0].data.length * 2);
					// speedometer.update();
					// needle(speedometer);
				})
				.catch((err) => {
					console.error(err);
				});
		}, 1000);
	}, []);

	return (
		<>
			<audio src="/sounds/white_noise.wav" autoPlay muted={false} loop ref={audioPlayer}></audio>

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
				<div className="relative w-4/5 mx-auto mt-[10rem] mb-[6rem]">
					<h1 className="mb-16 text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-sky-500 font-bold text-7xl text-center">
						Meditate
					</h1>

					<div className="flex flex-row justify-center items-start">
						<div className="grow px-10">
							<Graph
								chartRef={chartRef}
								attentionData={attentionData}
								alertnessData={alertnessData}
								avgData={avgData}
								labelData={labelData}
							/>
						</div>

						<div className="min-w-[25rem] px-10 flex flex-col justify-center items-start sticky top-[6rem]">
							<div className="bg-dark-1 rounded px-[1.5rem] pt-[0.8rem] border border-border w-full mb-[1rem] pb-[1rem]">
								<div
									className="text-grey-1 flex flex-row justify-between items-center cursor-pointer"
									onClick={() => {
										setShowSettings((prev) => !prev);
									}}
								>
									<h2 className="text-xl">Settings</h2>

									<FontAwesomeIcon
										icon={showSettings ? faCaretUp : faCaretDown}
										className="text-xl inline-block w-[1rem] mt-[-0.25rem]"
									/>
								</div>

								<div className={showSettings ? "block" : "hidden"}>
									<hr className="border-border my-4" />

									<h2 className="text-grey-1 text-xl font-semibold mb-[0.5rem]">Concentration Threshold:</h2>

									<div className="flex flex-row items-center justify-start mb-6">
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
									{/* 
									<hr className="border-border my-4" />

									<h2 className="text-grey-1 text-xl font-semibold mb-[0.5rem]">Volume:</h2>

									<div className="flex flex-row items-center justify-start mb-6">
										<input
											className="w-full"
											type="range"
											min={1}
											max={100}
											value={vol}
											onChange={(e) => {
												setVol(e.currentTarget.value);

												console.log(audioPlayer.current.volume);
												// audioPlayer.current.volume = e.currentTarget.value / 100;
												// audioPlayer.current.volume = 1;
											}}
										/>

										<p className="text-grey-1 ml-2">{vol}</p>
									</div> */}

									<NolinkButton
										onClick={(e) => {
											e.preventDefault();
											clearInterval(timerIntervalId);
										}}
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
							</div>

							{meditationMode && (
								<div className="bg-dark-1 rounded px-[1.5rem] py-[1.5rem] border border-border w-full mb-[1rem]">
									<h2 className="text-grey-1 text-xl font-semibold mb-[1rem] text-center">
										Meditation Timer:
									</h2>

									<div className="flex flex-row items-center justify-center">
										<div className="flex flex-row items-center justify-center bg-dark-0 aspect-square rounded-full w-[80%]">
											<CircularProgressbar
												value={(timer % 300) / 3}
												text={
													(timer / 60 < 10 ? "0" + Math.floor(timer / 60) : Math.floor(timer / 60)) +
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
											link=""
											onClick={(e) => {
												clearInterval(timerIntervalId);
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
							{/* <Pie attentionData={attentionData}/> */}
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};
