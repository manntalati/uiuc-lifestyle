from flask_cors import CORS
from flask import Flask, jsonify, request
import flask
from flask_login import LoginManager, UserMixin
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)