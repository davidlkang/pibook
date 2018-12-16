dep:
	pip install -r requirements.txt

run:
	python server.py

deploy-website:
	scp -r ./public raspy:~/api

deploy-api:
	scp ./server.py raspy:~/api
	scp ./requirements.txt raspy:~/api
	ssh raspy 'sudo systemctl restart simple_api'

deploy: deploy-website deploy-api
