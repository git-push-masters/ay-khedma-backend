import requests
import unittest
from time import sleep
from os import path
from db import clear_database

DATABASE_PATH = path.join('db', 'test.sqlite3')
BASE_URL = "http://localhost:4000/api/"
saved = {}
headers = {}


class TestAuthentication(unittest.TestCase):

    def test_a_register_successful(self):
        res = requests.post(BASE_URL + "auth/register", json={
            "name": "Ahmed Mansour",
            "phone": "01254298293",
            "email": "anemail@host.com",
            "password": "esa12842"
        })
        assert res.status_code == 201

    def test_b_register_user_exists(self):
        res = requests.post(BASE_URL + "auth/register", json={
            "name": "Ahmed Alaa",
            "phone": "01254298293",
            "email": "anotheremail@host.com",
            "password": "3289398"
        })
        assert res.status_code == 400

    def test_c_login_unverified(self):
        res = requests.post(BASE_URL + "auth/login", json={
            "phone": "01254298293",
            "password": "esa12842"
        })
        assert res.status_code == 406

    def test_d_verify_successful(self):
        res = requests.post(BASE_URL + "auth/verify", json={
            "phone": "01254298293",
            "password": "esa12842",
            "code": "111222"
        })
        assert res.status_code == 200

    def test_e_login_successful(self):
        res = requests.post(BASE_URL + "auth/login", json={
            "phone": "01254298293",
            "password": "esa12842"
        })
        data = res.json()
        assert res.status_code == 200
        assert 'body' in data
        assert "token" in data['body']
        assert "id" in data['body']
        saved['token'] = data['body']['token']
        saved['id'] = data['body']['id']
        headers['Authorization'] = f'Bearer {saved["token"]}'

    def test_f_get_me(self):
        res = requests.get(BASE_URL + 'auth/me', headers=headers)
        data = res.json()
        assert res.status_code == 200
        assert 'body' in data
        assert 'id' in data['body']
        assert data['body']['id'] == saved["id"]


class TestRequests(unittest.TestCase):

    def test_a_get_requests_no_token(self):
        res = requests.get(BASE_URL + 'requests', params={
            "page": 2
        })
        assert res.status_code == 401

    def test_b_get_requests_successful(self):
        res = requests.get(BASE_URL + 'requests', headers=headers, params={
            "page": 3
        })
        data = res.json()
        assert res.status_code == 200
        assert 'body' in data
        assert 'page' in data
        assert int(data['page']) == 3


if __name__ == '__main__':
    clear_database(DATABASE_PATH)
    sleep(5)
    unittest.main()
