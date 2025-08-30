package repository

import (
	"database/sql"

	"github.com/Rt-00/gontainr/backend/internal/domain"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (userRepo *UserRepository) GetByUsername(username string) (*domain.User, error) {
	user := &domain.User{}

	err := userRepo.db.QueryRow(
		`
		SELECT
		  id,
		  username,
		  password
		FROM
		  users
		WHERE
		  username = $1
		`, username,
	).Scan(&user.ID, &user.Username, &user.Password)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (userRepo *UserRepository) GetUserByID(id int) (*domain.User, error) {
	user := &domain.User{}

	err := userRepo.db.QueryRow(
		`
		SELECT
		  id,
		  username
		FROM
		  users
		WHERE
		  id = $1
		`, id,
	).Scan(&user.ID, &user.Username)

	if err != nil {
		return nil, err
	}

	return user, nil
}
