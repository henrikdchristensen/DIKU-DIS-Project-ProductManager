from flask import Flask, request
import psycopg2
import sys
from datetime import datetime

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='dis',
                            user='postgres',
                            password='qph97rjw')
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

@app.route('/api/product_template')
def get_product_template():
    # Get params from get request
    id = request.args.get('id', default='', type=str)
    if id == '':
        return {'data': []}

    # Connect to db
    connection = get_db_connection()
    cursor = connection.cursor()

    # Get template data
    query = f"SELECT * FROM product_templates WHERE id='{id}'"
    cursor.execute(query)
    field_names = [i[0] for i in cursor.description]
    product_data = cursor.fetchone()
    data = {}
    for name, field in zip(field_names, product_data):
        data[name] = field
    
    # Get params
    query = f"SELECT P.name FROM product_templates JOIN parameters P ON id = related_to WHERE id='{id}'"
    cursor.execute(query)
    parameter_data = cursor.fetchall()
    data["parameters"] = [i[0] for i in parameter_data]

    # Get produced products
    query = f"SELECT P.serial_number, P.date, P.produced_by FROM product_templates JOIN produced_products P ON id = of_type WHERE id='{id}'"
    cursor.execute(query)
    product_data = cursor.fetchall()
    product_data = [(i[0], str(i[1]), i[2]) for i in product_data]
    data["produced_products"] = product_data

    # Get compatible products
    query = f"SELECT P.component FROM product_templates JOIN compatible P ON id = compatible_to WHERE id='{id}'"
    cursor.execute(query)
    compatible_products = cursor.fetchall()
    data["components"] = [i[0] for i in compatible_products]

    print(parameter_data, file=sys.stdout)
    return data



if __name__ == '__main__':
    app.run()