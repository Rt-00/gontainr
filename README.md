# Docker Container Management

Docker container management application with Go backend and TypeScript frontend.

## Features

- View, start, stop, and remove containers
- Monitor resources (CPU, memory)
- Manage Docker images
- Modern and responsive web interface

## Technologies

- **Backend**: Go + Docker API
- **Frontend**: TypeScript + React
- **Styling**: Tailwind CSS

## Installation

### Using Docker Compose

```bash
git clone https://github.com/yourusername/gontainr.git
cd gontainr
docker-compose up -d
```

### Development

**Backend:**
```bash
cd backend
go mod tidy

# Seed
go run cmd/seed/main.go

go run cmd/main.go
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Main API

```http
GET    /api/containers              # List containers
POST   /api/containers/{id}/start   # Start container
POST   /api/containers/{id}/stop    # Stop container
GET    /api/containers/{id}/logs    # Get container logs
```

## Project Structure

```
docker-container-management/
├── backend/          # Go API
├── frontend/         # React/TS Interface
├── docker-compose.yml
└── README.md
```

## Future improvements
- Remove container;
- Websocket for view container logs in realtime;
- Better auth managment.

## License

MIT License
