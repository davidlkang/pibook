from aiohttp import web
from bloat import cors_factory
import os
import json

async def handle_request(request):
  return web.json_response({
    "bla": "blup"
  })

async def serve_index(request):
  return web.FileResponse('./public/index.html')

async def handle_post(request):
  body = await request.json()
  f = open("file", "w+")
  f.write(json.dumps(body))
  f.close()
  return web.json_response(body)

app = web.Application(middlewares=[cors_factory])

app.router.add_get('/todos', handle_request)
app.router.add_post('/todos', handle_post)
app.router.add_get('/', serve_index)

web.run_app(app,port=3000)
