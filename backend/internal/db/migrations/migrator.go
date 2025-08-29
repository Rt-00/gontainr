package migrations

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
)

var migrationsDir = "./migrations"

type Migrator struct {
	db            *sql.DB
	migrationsDir string
}

func NewMigrator(db *sql.DB) *Migrator {
	return &Migrator{
		db:            db,
		migrationsDir: migrationsDir,
	}
}

func (m *Migrator) EnsureMigrationsTable() error {
	_, err := m.db.Exec(`
	  CREATE TABLE IF NOT EXISTS migrations (
	    id SERIAL PRIMARY KEY,
		migration_name TEXT NOT NULL UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	  );
	`)

	return err
}

func (m *Migrator) AlreadyApplied(name string) (bool, error) {
	var exists bool

	err := m.db.QueryRow(`
	  SELECT EXISTS(
	    SELECT 1 FROM migrations WHERE migration_name = $1
	  )
	`, name).Scan(&exists)

	return exists, err
}

func (m *Migrator) ApplyMigrations() error {
	if err := m.EnsureMigrationsTable(); err != nil {
		return fmt.Errorf("failed to ensure migrations table: %w", err)
	}

	files, err := filepath.Glob(filepath.Join(m.migrationsDir, "*.sql"))
	if err != nil {
		return fmt.Errorf("failed to read migrations dir: %w", err)
	}

	for _, file := range files {
		name := filepath.Base(file)

		applied, err := m.AlreadyApplied(name)
		if err != nil {
			return err
		}

		if applied {
			fmt.Printf("Skipping %s (already applied)\n", name)
			continue
		}

		sqlBytes, err := os.ReadFile(file)
		if err != nil {
			return err
		}

		if _, err := m.db.Exec(string(sqlBytes)); err != nil {
			return fmt.Errorf("failed to apply %s: %w", name, err)
		}

		if _, err := m.db.Exec("INSERT INTO migrations (migration_name) VALUES ($1)", name); err != nil {
			return err
		}

		fmt.Printf("Applied migration %s\n", name)

	}

	return nil
}
