from flask import Flask, request
import psycopg2
import sys

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='dis',
                            user='postgres',
                            password='qph97rjw')
    return conn

@app.route('/api/table_info')
def get_table_info():    
    connection = get_db_connection()
    cursor = connection.cursor()

    table_query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"    
    cursor.execute(table_query)
    tables = cursor.fetchall()
    table_info = []

    for table in tables:
        table_name = table[0]
        column_query = f"SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '{table_name}'"
        cursor.execute(column_query)
        columns = cursor.fetchall()
        table_info.append({'table_name': table_name, 'columns': columns})

    cursor.close()
    connection.close()

    return {'table_info': table_info}


@app.route('/api/data')
def get_data():
    table_name = request.args.get('table', default='*', type=str)
    sort_by = request.args.get('sortBy', default='*', type=str)
    offset = request.args.get('offset', default=0, type=int)
    search = request.args.get('search', default='', type=str)
    limit = request.args.get('limit', default=100, type=int)
    
    connection = get_db_connection()
    cursor = connection.cursor()
    
    sort_direction = 'ASC'
    if sort_by.startswith('-'):
        sort_direction = 'DESC'
        sort_by = sort_by[1:]  # remove the '-' prefix
    if search != '':
        query = f'SELECT * FROM {table_name} WHERE {sort_by} ILIKE \'%{search}%\' ORDER BY {sort_by} {sort_direction} OFFSET {offset} LIMIT {limit}' # ILIKE is case insensitive, whereas LIKE is case sensitive
    else:
        query = f'SELECT * FROM {table_name} ORDER BY {sort_by} {sort_direction} OFFSET {offset} LIMIT {limit}'
    
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