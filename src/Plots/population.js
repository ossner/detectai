import CubicSpline from "cubic-spline";
import {AI, E, G} from "../functions.js"

export default async function loadAndPlotPopulation() {
    const response = await fetch('/population.csv');
    const csvText = await response.text();

    const lines = csvText.trim().split('\n').slice(1);
    const years = [];
    const populations = [];

    lines.forEach(line => {
        const [yearStr, popStr] = line.split(',');
        years.push(parseFloat(yearStr));
        populations.push(parseFloat(popStr));
    });

    const P = new CubicSpline(years, populations);
    const totalYears = [];
    const interpolatedPopulations = [];
    for (let year = 1564.311475409836; year <= 2100; year++) {
        totalYears.push(year);
        interpolatedPopulations.push(P.at(year));
    }

    const ctx = document.getElementById('populationChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: totalYears,
            datasets: [{
                label: 'Interpolated Population',
                data: interpolatedPopulations,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    title: {display: true, text: 'Year'},
                    ticks: {
                        callback: function (value) {
                            return value.toLocaleString('en-US', {useGrouping: false}); // Remove grouping (e.g., "1,500" -> "1500")
                        }
                    },
                    min: 1564
                },
                y: {
                    title: {display: true, text: 'Population'}
                }
            }
        }
    });

    const human_values = [];
    const AI_values = [];
    const recent_years = []
    for (let year = 1564.311475409836; year <= 2100; year++) {
        recent_years.push(year);
        human_values.push(P.at(year) * E(year) * G(year));
        AI_values.push(AI(year));
    }

    const ctx2 = document.getElementById('combined').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: recent_years,
            datasets: [{
                label: 'Human Generated Words',
                data: recent_years.map((year, i) => ({x: year, y: human_values[i]})),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                showLine: true,
                pointRadius: 0
            }, {
                label: 'AI-Generated Words',
                data: recent_years.map((year, i) => ({x: year, y: AI_values[i]})),
                borderColor: 'rgb(83,91,242)',
                borderWidth: 2,
                fill: false,
                showLine: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    title: {display: true, text: 'Year'},
                    ticks: {
                        callback: function (value) {
                            return value.toLocaleString('en-US', {useGrouping: false}); // Remove grouping (e.g., "1,500" -> "1500")
                        }
                    },
                    min: 1564
                },
                y: {
                    title: {display: true, text: 'Population'}
                }
            }
        }
    });
}
