from flask_cors import CORS
from flask import Flask, jsonify, request
import flask
from flask_login import LoginManager, UserMixin
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import requests

app = Flask(__name__)
CORS(app)

load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
db = SQLAlchemy(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

login_manager = LoginManager()
login_manager.init_app(app)

@app.route('/login', methods=['POST', 'GET'])
def login():
    #form = LoginForm()
    #if form.validate_on_submit():
    #    login_user(user)
    #    flask.flash('Login successful!', 'success')
    #    next = flask.request.args.get('next')
    #    if not url_has_allowed_host_and_scheme(next, request.host):
    #        return flask.abort(400)
    #    return flask.redirect(next or flask.url_for('index'))
    return jsonify({'message': 'Register endpoint'})

@app.route('/register', methods=['POST', 'GET'])
def register():
    return jsonify({'message': 'Register endpoint'})


@app.route('/bustracker', methods=['POST', 'GET'])
def bustracker():
    # Get Vehicles by Route
    # - important to use next_stop_id from it
    # - important to use location so its lat and long to track where the bus is at

    api_key = os.getenv('API_KEY')
    url = "https://developer.cumtd.com/api/v2.2/json/GetVehiclesByRoute"
    params = {
        'key': api_key,
        'route_id': 'ILLINI'
    }
    response = requests.get(url, params=params)
    information = []
    if response.status_code == 200:
        vehicles = response.json().get("vehicles", [])
        for vehicle in vehicles:
            information.append({
                'next_stop_id': vehicle.get('next_stop_id', 'N/A'),
                'lat': vehicle['location'].get('lat', 'N/A'),
                'lon': vehicle['location'].get('lon', 'N/A')
            })
    else:
        return jsonify({'error': 'Failed to fetch data from API'}), 500
    
    return jsonify(information)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)