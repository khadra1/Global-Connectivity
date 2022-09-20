from flask import Flask, render_template, request
from main import load_data

app = Flask(__name__, )


@app.route("/", methods =["GET"])
def home():
    if request.method == "GET":
        return render_template("home.html")

# @app.route("/internet-access", methods =["GET", "POST"])
# def plot_chart():
#     if request.method == "POST":
#         filter1 = request.form.get("filter1")
#         filter2 = request.form.get("filter2")
#         data = load_data(filter1,filter2)

#         return render_template("access.html", data=data)

#     if request.method == "GET":
#         data = load_data('Fixed broadband subscriptions','Zimbabwe')
#         return render_template("access.html", data=data)


f = []
f.append("Secure Internet servers")
f.append("Albania")
@app.route("/internet-access", methods =["GET", "POST"])
def plot_chart():
    if request.method == "POST":
        if "filter1" not in request.form:
            filter2 = request.form.get("filter2")
            f[1] = filter2
            data = load_data(f[0],filter2)
        elif "filter2" not in request.form:
            filter1 = request.form.get("filter1")
            data = load_data(filter1, f[1])
        else:
            filter1 = request.form.get("filter1")
            f[0] = filter1
            filter2 = request.form.get("filter2")
            data = load_data(filter1,filter2)
        return render_template("access.html", data=data)

    if request.method == "GET":
        data = load_data('Fixed broadband subscriptions','Zimbabwe')
        return render_template("access.html", data=data)

    
# def plot_world_map():
#      if request.method == "POST":
#         filter1 = request.form.get("filter1")
#         data = load_data(filter1)
#         return render_template("access.html", data=data)

#      if request.method == "GET":
#         data = load_data('Fixed broadband subscriptions')
#         # Save the cleaned data to the database
#         return render_template("access.html", data=data)


@app.route("/internet-usage", methods =["GET"])
def usage():
    if request.method == "GET":
        return render_template("usage.html")

if __name__ == "__main__":
    app.run(debug=True)