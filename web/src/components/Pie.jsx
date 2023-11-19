import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export default function Pie(props) {
	const { attentionData } = props;
	return (
		<Doughnut
			options={{
				circumference: Math.PI,
				rotation: Math.PI,
				responsive: false,
			}}
			data={{
				datasets: [
					{
						borderColor: "#00ff41",
						data: attentionData,
						needleValue: 580
					}
				]
		}}/>
	);
}
