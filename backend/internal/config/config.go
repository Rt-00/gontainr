package config

import (
	"database/sql"
	"log"
	"os"
)

type Config struct {
	DB        *sql.DB
	JWTSecret string
}

func Load() *Config {
	db, err := sql.Open("postgres", getEnv("DATABASE_URL", "postgres://docker:docker@localhost:5432/gontainr_db?sslmode=disable"))
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	return &Config{
		DB:        db,
		JWTSecret: getEnv("JWT_SECRET_KEY", "test_secret_key"),
	}
}

func getEnv(key, fallbackValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}

	return fallbackValue
}
