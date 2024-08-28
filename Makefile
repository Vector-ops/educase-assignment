IMAGE_NAME=educase_backend
CONTAINER_NAME=educase_backend
PORT=3000
DOCKERFILE_PATH=infrastructure/Dockerfile
BUILD_CONTEXT=.
DOCKER_USERNAME=vectorx13
DOCKER_REPO=educase_backend

all: build run

start: build-node
		npm run start

build-node:
		npm run build

stop:
	docker compose down

run:
	docker compose up

push:
	@echo "Tagging Docker image..."
	docker tag $(IMAGE_NAME) $(DOCKER_USERNAME)/$(DOCKER_REPO):latest
	@echo "Pushing Docker image to Docker Hub..."
	docker push $(DOCKER_USERNAME)/$(DOCKER_REPO):latest

clean: stop
	@echo "Removing Docker image..."
	docker rmi $(IMAGE_NAME) || true


.PHONY: all build stop run push clean