package main

import (
	"log"

	"github.com/Rt-00/gontainr/backend/internal/config"
	"github.com/Rt-00/gontainr/backend/internal/handler"
	"github.com/Rt-00/gontainr/backend/internal/repository"
	"github.com/Rt-00/gontainr/backend/internal/service"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load configs
	cfg := config.Load()

	// Repositories
	userRepo := repository.NewUserRepository(cfg.DB)

	// Services
	authService := service.NewAuthService(userRepo, cfg.JWTSecret)

	// Handlers
	authHandler := handler.NewAuthHandler(authService)

	// Router
	r := gin.Default()

	// CORS
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	api := r.Group("/api/v1")
	{
		api.POST("/auth/login", authHandler.Login)
	}

	log.Fatal(r.Run(":8080"))
}
