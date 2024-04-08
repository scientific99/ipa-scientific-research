from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token

def validate_auth(username, password):
    if username != "admin" or password != "malueihnmeohnhna":
        return jsonify({'message': 'Invalid username or password'}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200