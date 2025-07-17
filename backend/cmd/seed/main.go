package main

import (
	"fmt"
	"log"

	"github.com/Rt-00/gontainr/backend/internal/config"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	// Get config with DB
	cfg := config.Load()
	defer cfg.DB.Close()

	username := "admin"
	password := "verystrongpass"

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("error while generating hash for user seeder: %v", err)
	}

	// Insert user
	_, err = cfg.DB.Exec(
		`
		INSERT INTO users
		  (username, password)
		VALUES
		  ($1, $2)
		ON CONFLICT
		  (username) DO NOTHING
		`, username, string(hashedPassword))

	if err != nil {
		log.Fatalf("error while insert seeder user: %v", err)
	}

	fmt.Println("Seed executed")
}
