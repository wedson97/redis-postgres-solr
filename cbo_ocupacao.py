import csv
import psycopg2

DB_CONFIG = {
    "dbname": "cbo_ocupacao",
    "user": "postgres",
    "password": "123456",
    "host": "localhost", 
    "port": "5433", 
}

try:
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()
    print("Conexão com o banco de dados estabelecida.")

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cbo_ocupacao (
            id SERIAL PRIMARY KEY,
            titulo TEXT NOT NULL
        )
    """)
    conn.commit()
    print("Tabela verificada/criada com sucesso.")

    with open("CBO2002 - Ocupacao.csv", newline="", encoding="ISO-8859-1") as csvfile:
        arquivo_lido = csv.reader(csvfile)
        next(arquivo_lido)
        for linha in arquivo_lido:
            itens = linha[0].split(';')
            id = itens[0]
            titulo = itens[1]
            cursor.execute("INSERT INTO cbo_ocupacao (id, titulo) VALUES (%s, %s) ON CONFLICT (id) DO NOTHING;", (id, titulo))
    
    conn.commit()
    print("Dados inseridos com sucesso.")

except Exception as e:
    print(f"Erro: {e}")

finally:
    if conn:
        cursor.close()
        conn.close()
        print("Conexão com o banco de dados fechada.")
