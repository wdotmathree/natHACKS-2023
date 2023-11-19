import Link from "next/link";
import Image from "next/image";
import CourseOptions from "./CourseOptions";
import { useState } from "react";

const CourseBlob = (props) => {
	const [expanded, setExpanded] = useState(false);
	const [direction, setDirection] = useState(0); // 0 means next click should be clockwise; 1 means next click should be counter clockwise
	const [completed, setCompleted] = useState(false);

	return (
		<div className="relative bg-dark-1 rounded flex pl-[1rem] py-[1rem] mb-[1rem] border border-border">
			<Image
				className="rounded mr-2"
				src={props.cover}
				width={100}
				height={100}
				style={{ objectFit: "scale-down" }}
			/>

			{props.isPin && <Image className="absolute right-12" src="/images/pin.png" width={24} height={24} />}
			<button
				className={`absolute right-4 ${direction ? "animate-spin-clockwise" : "animate-spin-counterclockwise"}`}
				onClick={() => {
					setExpanded(!expanded);
					setDirection((prev) => !prev);
				}}
			>
				<Image src="/images/settings.png" width={24} height={24} />
			</button>

			{expanded && (
				<CourseOptions
					courses={props.courses}
					setExpanded={setExpanded}
					completed={completed}
					setCompleted={setCompleted}
					setCourses={props.setCourses}
					courseId={props.courseId}
					pinned={props.pinned}
					setPinned={props.setPinned}
					key={props.key}
					id={props.id}
					isPin={props.isPin}
					done={props.done} 
					setDone={props.setDone}
				/>
			)}
			{expanded && (
				<button
					className={`fixed left-0 top-0 z-[9] pb-[100vh] pr-[100vw]`}
					onClick={() => {
						setExpanded(!expanded);
						setDirection((prev) => !prev);
					}}
				></button>
			)}

			<div className="flex-col ml-[0.8rem] max-w-[80%]">
				<div className="flex">
					<Link
						className="text-blue-1 font-semibold text-lg transition ease-in-out duration-200 hover:text-blue-0"
						href={"/learn/" + props.courseId}
					>
						{props.title}
					</Link>
					{completed && (
						<Image
							className="ml-[0.7rem] h-[1.5rem] w-[1.5rem]"
							src="/images/complete.png"
							width={20}
							height={20}
						/>
					)}
				</div>

				<p className="text-grey-0">{props.description}</p>
			</div>
		</div>
	);
};

export default CourseBlob;
