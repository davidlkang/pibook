from aiohttp import web
from bloat import cors_factory
import os
import json

async def handle_request(request):
  try:
    f = open("file")
    file_content = json.load(f)
    f.close()
    return web.json_response(file_content)
  except:
    return web.json_response([])

async def serve_index(request):
  return web.FileResponse('./public/index.html')

async def serve_script(request):
  return web.FileResponse('./public/script.js')

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
app.router.add_get('/script.js', serve_script)

web.run_app(app,port=3000)
