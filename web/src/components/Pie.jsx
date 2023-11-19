import { Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js"; 

Chart.register(CategoryScale);

export default function Pie() {
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
                        data: [500, 500, 500],
                        needleValue: 580
                    }
                ]
            }}/>
    );
}
