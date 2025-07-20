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

func (containerHandler *ContainerHandler) StopContainer(c *gin.Context) {
	id := c.Param("id")

	if err := containerHandler.containerService.StopContainers(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Container stopped"})
}

func (containerHandler *ContainerHandler) StartContainer(c *gin.Context) {
	id := c.Param("id")

	if err := containerHandler.containerService.StartContainer(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Container started"})
}

func (h *ContainerHandler) GetLogs(c *gin.Context) {
	id := c.Param("id")
	logs, err := h.containerService.GetLogs(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, logs)
}
