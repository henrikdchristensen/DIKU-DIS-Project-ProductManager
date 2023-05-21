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

@app.route('/api/data')
def get_data():
    table_name = request.args.get('table', default='*', type=str)
    sort_by = request.args.get('sortBy', default='*', type=str)
    offset = request.args.get('offset', default=0, type=int)
    
    connection = get_db_connection()
    cursor = connection.cursor()
    
    if sort_by != '*':
        sort_direction = 'ASC'
        if sort_by.startswith('-'):
            sort_direction = 'DESC'
            sort_by = sort_by[1:]  # Remove the '-' prefix
        cursor.execute(f'SELECT * FROM {table_name} ORDER BY {sort_by} {sort_direction} OFFSET {offset} LIMIT 100')
    else:
        cursor.execute(f'SELECT * FROM {table_name} OFFSET {offset} LIMIT 100')

    data = cursor.fetchall()
    cursor.close()
    connection.close()

    return {'data': data}


if __name__ == '__main__':
    app.run()