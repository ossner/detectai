import {AI} from "../functions.js";

export default async function loadAndPlotAllWords() {

    const totalYears = [];
    const E_values = [];
    for (let year = 2000; year <= 2100; year++) {
        totalYears.push(year);
        E_values.push(AI(year));
    }

// Create chart
    const ctx = document.getElementById('AIWords').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'AllText(t) - Model',
                    data: totalYears.map((year, i) => ({x: year, y: E_values[i]})),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                    showLine: true,
                    pointRadius: 0
                },
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'All AI Text Visible to Humans'
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