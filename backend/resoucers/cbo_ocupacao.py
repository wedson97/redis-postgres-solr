from flask_restful import Resource, reqparse, marshal
import redis
import json 
import time
from models.cbo_ocupacao import cbo_ocupacao_fields, Cbo_ocupacao_Model

class Cbo_ocupacao(Resource):
    parser = reqparse.RequestParser()

    def get(self):
        redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

        comeco_requisicaoredis = time.time() 
        cached_data = redis_client.get("cbo_ocupacao_cache")
        termico_requisicao_redis = time.time()

        if cached_data:
            cached_data = json.loads(cached_data)
            print(f"Tempo de consulta no Redis: {((termico_requisicao_redis - comeco_requisicaoredis) * 1000):.2f} ms")
            return cached_data, 200

        comeco_requisicao_db = time.time()
        cbos = Cbo_ocupacao_Model.query.all()
        termico_requisicao_db = time.time() 

        serialized_data = json.dumps(marshal(cbos, cbo_ocupacao_fields))
        redis_client.set("cbo_ocupacao_cache", serialized_data) 

        print(f"Tempo de consulta ao banco de dados: {((termico_requisicao_db - comeco_requisicao_db) * 1000):.2f} ms")
        return marshal(cbos, cbo_ocupacao_fields), 200
