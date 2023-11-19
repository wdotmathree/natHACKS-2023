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

export default () => {
	const [conc, setConc] = useState(80);

	useEffect(() => {
		axios
			.get("/api/problems")
			.then(async (res) => {
				let problemList = res.data.map(async (p) => {
					return {
						status: Boolean((await axios.get(`/api/problem/${p.pid}/status`)).data),
						problemTitle: p.title,
						rating: p.difficulty,
						problemLink: `/problems/${p.pid}`,
						tag: p.tag,
					};
				});
				problemList = await Promise.all(problemList);
				problemList.sort((a, b) => {
					if (a.rating < b.rating) return -1;
					else if (a.rating > b.rating) return 1;
					else return 0;
				});
				setProblems(problemList);
			})
			.catch((err) => {
				console.error(err);
			});
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
							</div>

							<div className="mb-[4rem] bg-dark-1 rounded px-[1.5rem] py-[1.5rem] border border-border w-full">
								<h2 className="text-grey-1 text-xl font-semibold mb-[1rem]">Reset:</h2>

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
											Default
										</span>
									}
									bgColor="dark-1"
								/>
							</div>

							<Pie />
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};