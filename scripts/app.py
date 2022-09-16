# from dataclasses import dataclass
# from flask import Flask, render_template, request
# from sqlalchemy import create_engine
# from flask_sqlalchemy import SQLAlchemy

# from main import load_data
# app = Flask(__name__)
# db_url = "postgres://njuguscorkabpk:14f0dd2bc05cce718487cbff320b81dd7088ba958ac59cc07c82152d4b23909f@ec2-34-225-159-178.compute-1.amazonaws.com:5432/d6sa1vahv1mif0"
# app.config["SQLALCHEMY_DATABASE_URI"] = db_url
# db = SQLAlchemy(app)
# def create_database(filter1, filter2):
#     db= create_engine(db_url)
#     conn= db.connect()
#     data = load_data('world_bank_internet_data.csv',filter1,filter2)
#     data.to_sql('data', con=conn, if_exists='replace',index=False)
    

# def fetch_database():
#     db= create_engine(db_url)
#     conn= db.connect()
#     return data
    
# @app.route("/", methods =["GET", "POST"])
# def plot_chart():

#     if request.method == "POST":
#         filter1 = request.form.get("filter1")
#         filter2 = request.form.get("filter2")
#         data = load_data(filter1,filter2)
#         create_database(filter1, filter2)
#         return render_template("index.html", data=data)
#     data = load_data('Fixed broadband subscriptions','Zimbabwe')
#     return render_template("index.html", data=data)
# if __name__ == "__main__":
#     app.run(debug=True, host="localhost", port=8000)

from flask import Flask, render_template, request
from flask_pymongo import PyMongo
from main import load_data


app = Flask(__name__, )
mongo = PyMongo(app, uri="mongodb://localhost:27017/connectivity_app")
db = mongo.db
    
@app.route("/", methods =["GET", "POST"])
def plot_chart():

    if request.method == "POST":
        filter1 = request.form.get("filter1")
        filter2 = request.form.get("filter2")
        data = load_data(filter1,filter2)
        return render_template("index.html", data=data)

    if request.method == "GET":
        data = load_data('Fixed broadband subscriptions','Zimbabwe')
        # Save the cleaned data to the database
        conn_db = mongo.db.connectivity
        conn_db.update_one({}, {"$set": data}, upsert=True)
        return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)