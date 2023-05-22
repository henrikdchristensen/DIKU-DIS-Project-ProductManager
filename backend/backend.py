from flask import Flask, request
import psycopg2

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
    columns = request.args.get('columns', default='*', type=str).split(',')
    sortBy = request.args.get('sortBy', default='*', type=str)
    offset = request.args.get('offset', default=0, type=int)
    search = request.args.get('search', default='', type=str)
    limit = request.args.get('limit', default=100, type=int)
    
    connection = get_db_connection()
    cursor = connection.cursor()
    
    sort_direction = 'ASC'
    if sortBy.startswith('-'):
        sort_direction = 'DESC'
        sortBy = sortBy[1:]  # remove the '-' prefix
        
    # Construct the SELECT clause for the specified columns
    if columns != ['*']:
        column_list = ', '.join(columns)
        select_clause = f'SELECT {column_list}'
    else:
        select_clause = 'SELECT *'
    
    if search != '':
        query = f'{select_clause} FROM {table_name} WHERE {sortBy} ILIKE \'%{search}%\' ORDER BY {sortBy} {sort_direction} OFFSET {offset} LIMIT {limit}'
    else:
        query = f'{select_clause} FROM {table_name} ORDER BY {sortBy} {sort_direction} OFFSET {offset} LIMIT {limit}'
    
    print(query)
    
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()

    return {'data': data}

if __name__ == '__main__':
    app.run()