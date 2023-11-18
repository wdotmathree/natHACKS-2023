import Image from "next/image";
import AddButton from "@/components/AddButton";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<AddButton />
		</main>
	);
}
