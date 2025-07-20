package repository

import (
	"context"
	"io"
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

func (containerRepo *ContainerRepository) Start(id string) error {
	return containerRepo.client.ContainerStart(context.Background(), id, container.StartOptions{})
}

func (containerRepo *ContainerRepository) GetLogs(id string) ([]domain.LogEntry, error) {
	logs, err := containerRepo.client.ContainerLogs(context.Background(), id, container.LogsOptions{
		ShowStdout: true,
		ShowStderr: true,
		Timestamps: true,
		Tail:       "100",
	})
	if err != nil {
		return nil, err
	}
	defer logs.Close()

	content, err := io.ReadAll(logs)
	if err != nil {
		return nil, err
	}

	// Parse logs and return entries
	var entries []domain.LogEntry
	lines := string(content)

	// Simplified parsing
	entries = append(entries, domain.LogEntry{
		Timestamp: time.Now(),
		Message:   lines,
	})

	return entries, nil
}
