from flask import Flask
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from scripts.main import load_data

app = Flask(__name__)
db_url = "postgres://njuguscorkabpk:14f0dd2bc05cce718487cbff320b81dd7088ba958ac59cc07c82152d4b23909f@ec2-34-225-159-178.compute-1.amazonaws.com:5432/d6sa1vahv1mif0"
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
db = SQLAlchemy(app)

def connection():
    db= create_engine(db_url)
    conn= db.connect()
    df = load_data()
    df.to_sql('data', con=conn, if_exists='replace',index=False)
    # conn = psycopg2.connect()
@app.route("/")
def hello_world():
    connection()
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run()