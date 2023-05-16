from flask import Flask
from flask import request
import psycopg2
import time

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='dis',
                            user='dis',
                            password='1234')
    return conn


@app.route('/api/data')
def get_data():
    list = request.args.get('list', default = '*', type = str)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(f'SELECT * FROM {list};')
    #data = cur.fetchall()
    data = cur.fetchmany(10)
    cur.close()
    conn.close()
    return data