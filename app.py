from flask import Flask

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://njuguscorkabpk:14f0dd2bc05cce718487cbff320b81dd7088ba958ac59cc07c82152d4b23909f@ec2-34-225-159-178.compute-1.amazonaws.com:5432/d6sa1vahv1mif0"
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run()