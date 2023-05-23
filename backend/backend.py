from flask import Flask, request
import psycopg2

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='database', # 'database' is docker service name. If you run without docker, use 'localhost'
                            port='5432',
                            database='dis',
                            user='postgres',
                            password='123456')
    return conn

@app.route('/api/data')
def get_data():
    # Get params from get request
    table_name = request.args.get('table', default='*', type=str)
    columns = request.args.get('columns', default='*', type=str).split(',')
    sortBy = request.args.get('sortBy', default='*', type=str)
    offset = request.args.get('offset', default=0, type=int)
    search = request.args.get('search', default='', type=str)
    limit = request.args.get('limit', default=100, type=int)
    
    # Connect to db
    connection = get_db_connection()
    cursor = connection.cursor()
    
    # Set sort direction
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
    
    # Set the query
    if search != '':
        query = f'{select_clause} FROM {table_name} WHERE {sortBy} ILIKE \'%{search}%\' ORDER BY {sortBy} {sort_direction} OFFSET {offset} LIMIT {limit}'
    else:
        query = f'{select_clause} FROM {table_name} ORDER BY {sortBy} {sort_direction} OFFSET {offset} LIMIT {limit}'
    
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
    
    cursor.close()
    connection.close()
    
    return data

@app.route('/api/hello')
def get_hello():
    return {'data': 'Hello from server'}


if __name__ == '__main__':
    app.run()