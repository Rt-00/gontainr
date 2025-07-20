package service

import (
	"github.com/Rt-00/gontainr/backend/internal/domain"
	"github.com/Rt-00/gontainr/backend/internal/repository"
)

type ContainerService struct {
	containerRepo *repository.ContainerRepository
}

func NewContainerService(containerRepo *repository.ContainerRepository) *ContainerService {
	return &ContainerService{containerRepo: containerRepo}
}

func (containerService *ContainerService) GetContainers() ([]domain.Container, error) {
	return containerService.containerRepo.GetAll()
}

func (containerService *ContainerService) StopContainers(id string) error {
	return containerService.containerRepo.Stop(id)
}
