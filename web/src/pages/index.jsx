import Head from "next/head";
import Image from "next/image";
import Octahedron from "@/components/Octahedron";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";

export default () => {
	return (
		<>
			<Head>
				<title>MediNoise</title>
				<meta name="description" content="Learn competitive programming and solve programming problems!" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/pzoj.png" />
			</Head>

			<Navbar
				className=""
				links={[
					{ text: "Home", url: "/" },
					{ text: "Meditate", url: "/meditate" },
				]}
			/>

			<main className="bg-dark-0 w-full pt-[4rem] pb-[6rem]">
				<div className="px-[10rem] mx-auto mb-[6rem]">
					<div className="flex flex-row justify-center items-center">
						<div className="mr-[4rem] z-[2]">
							<div className="mb-6">
								<h1 className="z-[100] text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-sky-500">
									MediNoise —
								</h1>
								<h1 className="z-[100] mt-4 text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-sky-500">
									Meditate.
								</h1>
								<h1 className="z-[100] mt-4 text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-sky-500">
									White Noise.
								</h1>
							</div>

							<p className="text-grey-1 text-xl">
								Software that allows you to meditate using self-generated white noise.
							</p>
						</div>

						<div className="w-[40rem] h-[40rem] relative ml-[4rem] z-[0]">
							<Canvas className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
								<OrbitControls />
								<ambientLight args={["#ffffff", 0.5]} />
								<directionalLight args={["#ffffff", 0.5]} position={[-3, 8, 1]} />
								<Octahedron />
							</Canvas>
						</div>
					</div>
				</div>

				{/* next section */}

				<div className="relative mt-[calc(250px+0rem)] mx-auto mb-[6rem]">
					<div className="absolute top-[-423.547px] left-0 right-0">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
							<path
								fill="#1c2830"
								fill-opacity="1"
								d="M0,256L48,256C96,256,192,256,288,224C384,192,480,128,576,133.3C672,139,768,213,864,234.7C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
							></path>
						</svg>
					</div>

					<div className="bg-dark-1 pt-8 pb-[6rem] px-[10rem]">
						<div className="flex flex-row justify-center items-center">
							<div>
								<h2 className="block cock text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-sky-500 mb-6">
									Supercharge your
									<br />
									peace of mind.
								</h2>
								<p className="block cock text-grey-1 text-xl max-w-[27rem]">
									By recommending problems based on what you've struggled on and areas you're
									unfamiliar with, this is the perfect tool to get started with competitive
									programming with.
								</p>
							</div>
							{/* 
							<Image
								src="/images/image.png"
								className="border-2 border-border"
								width={400}
								height={1200}
							/> */}
						</div>
					</div>
					{/* We offer built courses for all
								skill levels, which combined with our elaborate editorials allow
								anyone to understand a problem, even without previous knowledge. */}
				</div>
			</main>

			<Footer />
		</>
	);
};
