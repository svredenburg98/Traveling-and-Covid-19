d3.csv("data").then(function (data) {
    // console.log(data)

    var trips = data.map(countyTrips => countyTrips.trips)
    var covidCases = data.map(countyCovidCases => countyCovidCases.covid_cases)
    var covidDeaths = data.map(countyDeaths => countyDeaths.covid_deaths)
    var countyName = data.map(countyName => countyName.county_name_county)
<<<<<<< HEAD
=======

>>>>>>> c5db5dcb7b6433bab90ef4d8834a32c33bda3abe

    var trace1 = {
        x: trips,
        y: covidCases,
        mode: 'markers',
        type: 'scatter',
        name: 'County',
        text: countyName,
        marker: {
            size: 15,
<<<<<<< HEAD
            color: "blue"
=======
            color: "black"
>>>>>>> c5db5dcb7b6433bab90ef4d8834a32c33bda3abe
        },

    };

    var data = [trace1];

<<<<<<< HEAD
=======

>>>>>>> c5db5dcb7b6433bab90ef4d8834a32c33bda3abe
    var layout = {
        xaxis: {
            title: "Number of Trips Taken",
            range: [0, d3.max(data, d => d.trips)]
        },
        yaxis: {
            title: "COVID-19 Cases",
            range: [0, d3.max(data, d => d.covid_cases)],
            autorange: true
        },
        title: 'Trips vs COVID-19 Cases',
        plot_bgcolor: "white"
    }
    Plotly.newPlot('bar', data, layout);
<<<<<<< HEAD

    var trace2 = {
        x: trips,
        y: covidDeaths,
        mode: 'markers',
        type: 'scatter',
        name: 'County',
        text: countyName,
        marker: {
            size: 15,
            color: "red"
        }
    };

    var data = [trace2];
    var layout = {
        xaxis: {
            title: "Number of Trips Taken",
            range: [0, d3.max(data, d => d.trips)]
        },
        yaxis: {
            title: "COVID-19 Deaths",
            range: [0, d3.max(data, d => d.covid_deaths)],
            autorange: true
        },
        title: 'Trips vs COVID-19 Deaths',
        plot_bgcolor: "white"
    }
    Plotly.newPlot('bar2', data, layout);

})










=======
>>>>>>> c5db5dcb7b6433bab90ef4d8834a32c33bda3abe




    var trace2 = {
        x: trips,
        y: covidDeaths,
        mode: 'markers',
        type: 'scatter',
        name: 'County',
        text: countyName,
        marker: {
            size: 15,
            color: "red"
        }
    };

    var data = [trace2];
    var layout = {
        xaxis: {
            title: "Number of Trips Taken",
            range: [0, d3.max(data, d => d.trips)]
        },
        yaxis: {
            title: "COVID-19 Deaths",
            range: [0, d3.max(data, d => d.covid_deaths)],
            autorange: true
        },
        title: 'Trips vs COVID-19 Deaths',
        plot_bgcolor: "white"
    }
    Plotly.newPlot('bar2', data, layout);

})