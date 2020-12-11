d3.json("/data").then(function (data) {
    // console.log(data)

    var trips = []
    var covid_cases = []
    var covid_deaths = []

    data.forEach(function (data) {
        // data.trips = +data.trips;
        // console.log(data.trips)
        trips.push(data.trips)
    });
    console.log(trips)

    data.forEach(function (data) {
        // data.trips = +data.trips;
        // console.log(data.trips)
        covid_cases.push(data.covid_cases)
    });
    console.log(covid_cases)

    data.forEach(function (data) {
        // data.trips = +data.trips;
        // console.log(data.trips)
        covid_deaths.push(data.covid_deaths)
    });
    console.log(covid_deaths)

    var trace1 = {
        x: trips,
        y: covid_cases,
        mode: 'markers',
        type: 'scatter',
        name: 'Team A',
        text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
        marker: { size: 12 }

    };


    var data = [trace1];
    var layout = {
        xaxis: {
            title: "Number of Trips Taken",
            range: [0, d3.max(data, d => d.trips)]
        },
        yaxis: {
            title: "COVID-19 Cases",
            range: [0, d3.max(data, d => d.covid_cases)]
        },
        title: 'Trips vs COVID-19 Cases'
    }
    Plotly.newPlot('bar', data, layout);
})





// var trace1 = {
//     x: [1, 2, 3, 4, 5],
//     y: [1, 6, 3, 6, 1],
//     mode: 'markers',
//     type: 'scatter',
//     name: 'Team A',
//     text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
//     marker: { size: 12 }
// };
// var trace2 = {
//     x: [1.5, 2.5, 3.5, 4.5, 5.5],
//     y: [4, 1, 7, 1, 4],
//     mode: 'markers',
//     type: 'scatter',
//     name: 'Team B',
//     text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
//     marker: { size: 12 }
// };
// var data = [trace1, trace2];
// var layout = {
//     xaxis: {
//         range: [0.75, 5.25]
//     },
//     yaxis: {
//         range: [0, 8]
//     },
//     title: 'Data Labels Hover'
// };
// Plotly.newPlot('myDiv', data, layout);















