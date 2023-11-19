"use client";

import { Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useRef } from "react";

Chart.register(CategoryScale);

// const socket = new WebSocket(window.location.origin.replace(/^http/, 'ws') + "/ws");
// socket.addEventListener('open', () => {
//     console.log('Connected to server');
// });

// socket.addEventListener('message', (event) => {
//     chart.data.labels.push(chart.data.labels[chart.data.labels.length - 1] + 1);
//     let data = JSON.parse(event.data);
//     data.forEach((value, index) => {
//         chart.data.datasets[index].data.push(value);
//     });
//     if (chart.data.labels.length > 40) {
//         data.forEach((value, index) => {
//             chart.data.datasets[index].data.shift();
//         });
//         chart.data.labels.shift();
//     }
//     chart.update();
//     speedometer.data.datasets[0].needleValue = 500 * data[2];
//     speedometer.update();
//     needle(speedometer);
// });

export default function Graph(props) {
	const { chartRef, alertnessData, attentionData, avgData, labelData } = props;

	return (
		<Line
			ref={chartRef}
			width={1000}
			height={500}
			plugins={[
				{
					afterDraw: (chart) => {
						var needleValue = chart.config.data.datasets[0].needleValue;
						var dataTotal = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
						var angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
						var ctx = chart.ctx;
						var cw = chart.canvas.offsetWidth;
						var ch = chart.canvas.offsetHeight;
						var cx = cw / 2;
						var cy = ch - 15;

						ctx.translate(cx, cy);
						ctx.rotate(angle);
						ctx.beginPath();
						ctx.moveTo(0, -3);
						ctx.lineTo(ch - 10, 0);
						ctx.lineTo(0, 3);
						ctx.fillStyle = "rgb(0, 0, 0)";
						ctx.fill();
						ctx.rotate(-angle);
						ctx.translate(-cx, -cy);
						ctx.beginPath();
						ctx.arc(cx, cy, 5, 0, Math.PI * 2);
						ctx.fill();
					},
				},
			]}
			data={{
				labels: labelData,
				datasets: [
					{
						label: "Attention",
						data: attentionData,
						fill: false,
						borderColor: "rgba(89, 239, 254, 0.4)",
						backgroundColor: "transparent",
					},
					{
						label: "Alertness",
						data: alertnessData,
						borderColor: "rgba(255, 0, 211, 0.4)",
						fill: false,
						backgroundColor: "transparent",
					},
					{
						label: "Long-Term Average",
						data: avgData,
						borderColor: "rgba(0, 255, 65, 0.4)",
						fill: false,
						backgroundColor: "transparent",
					},
				],
			}}
			options={{
				responsive: false,
				title: {
					display: true,
					text: "Average Attentiveness and Alertness",
					fontColor: "rgba(255, 255, 255, 0.87)",
				},
				legend: {
					// Display a legend for the two datasets
					display: true,
					labels: {
						fontColor: "rgba(255, 255, 255, 0.87)",
					},
				},
				animation: {
					duration: 1000,
				},
				scales: {
					x: {
						display: false,
					},
					y: {
						fontColor: "rgba(255, 255, 255, 0.87)",
						suggestedMin: 0,
						suggestedMax: 1,
						stepSize: 0.1,
					},
				},
				tooltips: {
					enabled: false,
				},
				hover: {
					mode: null,
				},
			}}
		/>
	);
}
