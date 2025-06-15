import {E} from '../functions.js'

export default async function loadAndPlotEnglishSpeakers() {
    const totalYears = [];
    const E_values = [];
    for (let year = 1500; year <= 2100; year++) {
        totalYears.push(year);
        E_values.push(E(year));
    }

// Original data points
    const english_speakers_data_x = [1950, 2019, 2020, 2021, 2022, 2023, 2025];
    const english_speakers_data_y = [0.09987594521155573, 0.14466233779069992, 0.16102444506610503, 0.1697163580053262, 0.18076628911385684, 0.18043102332483213, 0.18562582898469498];

    const dataPoints = english_speakers_data_x.map((year, i) => ({
        x: year,
        y: english_speakers_data_y[i]
    }));

// Create chart
    const ctx = document.getElementById('speakersChart').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'E(t) - Model',
                    data: totalYears.map((year, i) => ({x: year, y: E_values[i]})),
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
                    text: 'Literate English Speakers Over Time'
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
                        text: 'Number of Speakers'
                    }
                }
            }
        }
    });
}