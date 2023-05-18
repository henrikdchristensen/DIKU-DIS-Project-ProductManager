from flask import Flask, request
import psycopg2
import time

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='dis',
                            user='dis',
                            password='1234')
    return conn

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/data')
def get_data():
    table_name = request.args.get('table', default='*', type=str)
    offset = request.args.get('offset', default=0, type=int)
    
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute(f'SELECT * FROM {table_name} OFFSET {offset} LIMIT 100;')
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    
    return {'data': data}

if __name__ == '__main__':
    app.run()