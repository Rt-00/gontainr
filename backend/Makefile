PHONY: help dev dev_seed

help:
	@echo "Available commands:"
	@echo "dev  - Start development environment"
	@echo "stop  - Stop all containers"
	@echo "clean  - Clean all containers and volumes"

dev:
	@echo "Starting development environment"
	docker compose -f ../docker-compose.yml up -d

	sleep 3 # TODO:remove this in future and use depends_on for docker image
	
	@echo "Starting server"
	go run cmd/main.go

stop:
	@echo "Stopping containers"
	docker compose -f ../docker-compose.yml down

clean:
	@echo "Limpando containers, volumes e imagens..."
	docker compose -f ../docker-compose.yml down -v
	docker compose -f ../docker-compose.yml down -v
	docker system prune -f