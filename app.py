from flask import Flask, render_template, jsonify
import psycopg2
#from config import db_password

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# setup postgres connection
conn = psycopg2.connect(f"dbname='data_trips_covid_db' user='postgres' host='localhost' password='YOUR-PASSWORD-HERE'")

#set up cursor

cur = conn.cursor()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def data():
    cur.execute("""SELECT * FROM traveling_covid""")
    rows = cur.fetchall()

    all_counties = []
    for row in rows:
        
        covid_dict = {"county": row[0],
                        "pop_at_home": row[1],
                        "pop_not_at_home": row[2],
                        "trips": row[3],
                        "covid_cases": row[4],
                        "covid_deaths": row[5],
                        "long": row[6],
                        "lat": row[7]}
        all_counties.append(covid_dict)

    return jsonify(all_counties)



if __name__ == "__main__":
    app.run(debug=True)