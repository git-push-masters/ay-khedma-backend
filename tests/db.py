import sqlite3

tables = ['Sections', 'Users', 'Admins', 'Requests', 'Offers', 'Reviews', 'Reports']

def clear_database(DB_PATH):
    # Connect to the SQLite database
    conn = sqlite3.connect(DB_PATH)

    # Create a cursor object
    cursor = conn.cursor()

    # Truncate each table
    for table in tables:
        cursor.execute(f"DELETE FROM {table};")
        print(f"Truncated table: {table}")

    # Commit the changes and close the connection
    conn.commit()
    conn.close()