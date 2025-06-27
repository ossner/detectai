import {AI} from "../functions.js";

export default async function loadAndPlotAllWords() {

    const totalYears = [];
    const E_values = [];
    for (let year = 2020; year <= 2100; year++) {
        totalYears.push(year);
        E_values.push(AI(year));
    }

    const ctx = document.getElementById('AIWords').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'AllText(t) - Model',
                    data: totalYears.map((year, i) => ({x: year, y: E_values[i]})),
                    borderColor: 'rgb(83,91,242)',
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
                    text: 'New English AI Text Visible to Humans'
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Year'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('en-US', {useGrouping: false});
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: '# Words'
                    },
                    ticks: {
                        callback: function (value) {
                            return value.toExponential();
                        }
                    },
                }
            }
        }
    });
}