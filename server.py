from aiohttp import web
import os
import json
import uuid

def item_valid(item):
  try:
    if type(item["title"]) == str and type(item["description"]) == str and type(item["recipe"]) == str:
      return True
    return False
  except:
    return False

def get_item_list_from_file():
  try:
    f = open("file")
    file_content = json.load(f)
    f.close()
    return file_content
  except:
    return []

async def handle_request(request):
  return web.json_response(get_item_list_from_file())

async def serve_index(request):
  return web.FileResponse('./public/index.html')

async def serve_script(request):
  return web.FileResponse('./public/script.js')

async def serve_render_helper(request):
  return web.FileResponse('./public/renderHelper.js')

async def handle_post(request):
  item = await request.json()
  print(item)
  if not item_valid(item):
    return web.json_response({"error": "item is not valid"}, status=400)
  item["id"] = str(uuid.uuid4())
  item_list = get_item_list_from_file()
  item_list.append(item)
  f = open("file", "w+")
  f.write(json.dumps(item_list))
  f.close()
  return web.json_response(item_list)

app = web.Application()

app.router.add_get('/todos', handle_request)
app.router.add_post('/todos', handle_post)
app.router.add_get('/', serve_index)
app.router.add_get('/script.js', serve_script)
app.router.add_get('/renderHelper.js', serve_render_helper)

web.run_app(app,port=3000)
