package repository

import (
	"context"
	"time"

	"github.com/Rt-00/gontainr/backend/internal/domain"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

type ContainerRepository struct {
	client *client.Client
}

func NewContainerRepository() *ContainerRepository {
	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		panic(err)
	}

	return &ContainerRepository{client: cli}
}

func (containerRepo *ContainerRepository) GetAll() ([]domain.Container, error) {
	containers, err := containerRepo.client.ContainerList(context.Background(),
		container.ListOptions{All: true})
	if err != nil {
		return nil, err
	}

	result := make([]domain.Container, len(containers))
	for i, c := range containers {
		result[i] = domain.Container{
			ID:      c.ID[:12],
			Name:    c.Names[0][1:],
			Image:   c.Image,
			Status:  c.Status,
			Created: time.Unix(c.Created, 0),
		}
	}

	return result, nil
}

func (containerRepo *ContainerRepository) Stop(id string) error {
	return containerRepo.client.ContainerStop(context.Background(), id, container.StopOptions{})
}
