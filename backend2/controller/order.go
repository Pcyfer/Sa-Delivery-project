package controller

import (

	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Pcyfer/SoyJuu-Project/entity"
)

func CreateOrder(c *gin.Context) {
	var order entity.Order
	var state entity.State
	var food entity.Food
	var user entity.User
	

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", order.StateID).First(&state); tx.RowsAffected == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error": "state not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", order.FoodID).First(&state); tx.RowsAffected == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error": "food not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", order.UserID).First(&state); tx.RowsAffected == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	u := entity.Order{
		State: state,
		Food: food,
		User: user,

	}

	if err := entity.DB().Create(&u).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": u})
	
}

func GetOrder(c *gin.Context) {
	var order entity.Order
	id := c.Param("id")
	if err := entity.DB().Preload("State").Raw("SELECT * FROM orders WHERE id = ?", id).Find(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order})
}

func ListOrders(c *gin.Context) {
	var orders []entity.Order
	if err := entity.DB().Preload("State").Raw("SELECT * FROM orders").Find(&orders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": orders})
}

func DeleteOrder(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM orders WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateOrder(c *gin.Context) {
	var order entity.Order
	var result entity.Order

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if tx := entity.DB().Where("id = ?", order.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}

	if err := entity.DB().Save(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order})
}

func ListOrdersDetail(c *gin.Context) {
	var orders []entity.Order
	if err := entity.DB().Preload("State").Raw("SELECT orders.id, users.user_name, users.address, foods.foodname, foods.picture, states.state_name FROM orders INNER JOIN foods ON orders.food_id = foods.idINNER JOIN users ON orders.user_id = users.idINNER JOIN states ON orders.state_id = states.id").Find(&orders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": orders})
}