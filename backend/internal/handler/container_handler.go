package handler

import (
	"net/http"

	"github.com/Rt-00/gontainr/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type ContainerHandler struct {
	containerService *service.ContainerService
}

func NewContainerHandler(containerService *service.ContainerService) *ContainerHandler {
	return &ContainerHandler{containerService: containerService}
}

func (containerHandler *ContainerHandler) GetContainers(c *gin.Context) {
	containers, err := containerHandler.containerService.GetContainers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, containers)
}
