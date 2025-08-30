package main

import (
	"log"

	"github.com/Rt-00/gontainr/backend/internal/config"
	"github.com/Rt-00/gontainr/backend/internal/db/migrations"
	"github.com/Rt-00/gontainr/backend/internal/handler"
	"github.com/Rt-00/gontainr/backend/internal/middleware"
	"github.com/Rt-00/gontainr/backend/internal/repository"
	"github.com/Rt-00/gontainr/backend/internal/service"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load configs
	cfg := config.Load()

	// Create migrator
	migrator := migrations.NewMigrator(cfg.DB)

	// Exec migrations
	if err := migrator.ApplyMigrations(); err != nil {
		log.Fatalf("Migration failed: %v", err)
	}

	// Repositories
	userRepo := repository.NewUserRepository(cfg.DB)
	containerRepo := repository.NewContainerRepository()

	// Services
	authService := service.NewAuthService(userRepo, cfg.JWTSecret)
	containerService := service.NewContainerService(containerRepo)

	// Handlers
	authHandler := handler.NewAuthHandler(authService)
	containerHandler := handler.NewContainerHandler(containerService)

	// Router
	r := gin.Default()

	// CORS
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Header("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	api := r.Group("/api/v1")
	{
		authRoutes := api.Group("/auth")
		authRoutes.POST("/login", authHandler.Login)

		authRoutes.Use(middleware.AuthMiddleware(cfg.JWTSecret))
		{
			authRoutes.GET("/me", authHandler.Me)
			authRoutes.POST("/logout", authHandler.Logout)
		}

		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware(cfg.JWTSecret))
		{
			protected.GET("/containers", containerHandler.GetContainers)
			protected.POST("/containers/:id/stop", containerHandler.StopContainer)
			protected.POST("/containers/:id/start", containerHandler.StartContainer)
			protected.GET("/containers/:id/logs", containerHandler.GetLogs)
		}
	}

	log.Fatal(r.Run(":8080"))
}
