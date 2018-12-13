pull-website:
	scp -r raspy:~/website-wg ./src/public

deploy-website:
	scp -r ./src/public raspy:~/api

pull-api:
	scp -r raspy:~/api .

deploy-api:
	scp ./src/bloat.py raspy:~/api
	scp ./src/server.py raspy:~/api
	scp ./src/requirements.txt raspy:~/api
	ssh raspy 'sudo systemctl restart simple_api'
