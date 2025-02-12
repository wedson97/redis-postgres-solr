# Rodar o container do PostgreSQL
docker build -t cbo_postgres -f Dockerfile.postgres .
docker run -d --name postgres_container -p 5433:5432 cbo_postgres

# Rodar o container do Redis
docker build -t cbo_redis -f Dockerfile.redis .
docker run -d --name redis-container -p 6379:6379 cbo_redis

# Rodar o script Python cbo_ocupacao.py
echo "Iniciando o script Python cbo_ocupacao.py..."
python3 cbo_ocupacao.py

echo "Containers PostgreSQL, Redis e o script Python foram iniciados com sucesso!"
