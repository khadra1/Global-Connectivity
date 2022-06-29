from flask import Flask, render_template
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
# import psycopg2
from scripts.main import load_data

app = Flask(__name__)
db_url = "postgresql://njuguscorkabpk:14f0dd2bc05cce718487cbff320b81dd7088ba958ac59cc07c82152d4b23909f@ec2-34-225-159-178.compute-1.amazonaws.com:5432/d6sa1vahv1mif0"
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
db = SQLAlchemy(app)

def create_database():
    db= create_engine(db_url)
    conn= db.connect()
    df = load_data()
    print(df)
    df.to_sql('data', con=conn, if_exists='replace',index=False)
    # conn = psycopg2.connect()
@app.route("/")
def hello_world():
    # create_database()
    data = load_data()
    # data={"name": "data"}


    return render_template("map.html", data=data)

if __name__ == "__main__":
    app.run()