import {P, E, G, AI} from "../functions.js"

export default async function loadAndPlotAI() {

    const totalYears = [];
    const G_values = [];
    for (let year = 2000; year <= 2100; year++) {
        totalYears.push(year);
        G_values.push(G(year));
    }

    const ctx = document.getElementById('combined').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'G(t) - Model',
                    data: totalYears.map((year, i) => ({x: year, y: G_values[i]})),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                    showLine: true,
                    pointRadius: 0
                },
                {
                    label: 'Data Points',
                    data: dataPoints,
                    backgroundColor: 'red',
                    pointRadius: 3,
                    type: 'scatter'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Words per Literate Person Over Time'
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '# Words'
                    }
                }
            }
        }
    });
}