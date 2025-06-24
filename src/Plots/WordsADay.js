import {G} from "../functions.js"

export default async function loadAndPlotWords() {

    const totalYears = [];
    const G_values = [];
    for (let year = 1564.311475409836; year <= 2100; year++) {
        totalYears.push(year);
        G_values.push(G(year));
    }

    const human_words_data_x = [1700, 1900, 2000, 2025];
    const human_words_data_y = [25, 200, 1000, 2000];

    const dataPoints = human_words_data_x.map((year, i) => ({
        x: year,
        y: human_words_data_y[i]
    }));

    const ctx = document.getElementById('wordsChart').getContext('2d');
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
                    },
                    ticks: {
                        callback: function (value) {
                            return value.toLocaleString('en-US', {useGrouping: false});
                        }
                    },
                    min: 1564
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of English Words'
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