# gunicorn.conf.py
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv(".env")

# Configurações do Gunicorn
bind = "0.0.0.0:5000"  # Endereço e porta
workers = 4  # Número de workers
timeout = 120  # Tempo máximo de resposta