#!/bin/bash

# Rodar o container do PostgreSQL
echo "Iniciando o container do PostgreSQL..."
docker build -t cbo_postgres -f Dockerfile.postgres .
docker run -d --name postgres_container -p 5433:5432 cbo_postgres
echo "PostgreSQL iniciado."

# Rodar o container do Redis
echo "Iniciando o container do Redis..."
docker build -t cbo_redis -f Dockerfile.redis .
docker run -d --name redis-container -p 6379:6379 cbo_redis
echo "Redis iniciado."

# Rodar o Solr para busca elástica
echo "Iniciando o Solr..."
docker build -t cbo_solr -f Dockerfile.solr .
docker run -d --name solr-container -p 8983:8983 cbo_solr
echo "Solr iniciado."

# Criar o ambiente virtual
echo "Criando ambiente virtual..."
python3 -m venv venv
echo "Ambiente virtual criado."

# Ativar o ambiente virtual
echo "Ativando o ambiente virtual..."
source venv/bin/activate

# Instalar as dependências do requirements.txt
echo "Instalando dependências do requirements.txt..."
pip install -r requirements.txt

# Rodar o script Python cbo_ocupacao.py
echo "Iniciando o script Python cbo_ocupacao.py..."
python cbo_ocupacao.py

echo "Containers PostgreSQL, Redis e o script Python foram iniciados com sucesso!"

# Manter o terminal aberto
echo "Pressione Enter para fechar o terminal..."
read
