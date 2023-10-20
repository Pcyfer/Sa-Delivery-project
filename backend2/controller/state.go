package controller

import (
	"net/http"

	"github.com/Pcyfer/SoyJuu-Project/entity"
	"github.com/gin-gonic/gin"
	
)

func ListStates(c *gin.Context) {
	var states []entity.State
	if err := entity.DB().Raw("SELECT * FROM states").Scan(&states).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": states})
}

func GetState(c *gin.Context) {
	var state entity.State
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM states WHERE id = ?", id).Scan(&state).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": state})
}