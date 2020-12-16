# Traveling-and-Covid-19
 * Our first repo reached its storage limit, so we created a new one. The old repo is here - https://github.com/svredenburg98/Traveling-And-COVID19-Cases
 
contributors: 
Vincent Adams 
Tia Anderson-Ortega
Krishna Pulipaka
Sylvester Vredenburg

Project Objective:

Evaluate the Number of Personal Trips and COVID-19 Cases and Deaths
Determine if movement of individuals contributes to increase in COVID19 cases and Deaths

Data Sets:

CDC Daily COVID19 data by county 
Bureau of Transportation Statistics travel data
Open Data Soft county polygons

In this project, we manipulated the data from various sources and imported them to a PostegreSQL database, then created two county maps with circles representing magnitude of COVID19 cases and deaths as compared to amount of individuals leaving their homes during quarantine. The data used in the visualizations was brought in from the database using a python Flask application.

To run this application:

1. Create a Postgres database called "data_trips_covid_db"
2. Create a table using the SQL schema provided. (/data_trips_covid_db/PostegreSQL)
3. import the "TEST_DATA_trp_covid_cnty_pnts" into the table
4. Add your postgres password to the flask application (app.py)
5. Add your mabpox api key to "config.js" (static/js/config.js)
6. run "python app.py" in bash terminal
