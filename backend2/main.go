package main

import (
	"github.com/gin-gonic/gin"
	"github.com/Pcyfer/SoyJuu-Project/controller"
	"github.com/Pcyfer/SoyJuu-Project/entity"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// Order Routes
	r.GET("/orders", controller.ListOrders)
	r.GET("/orders/:id", controller.GetOrder)
	r.POST("/orders", controller.CreateOrder)
	r.PATCH("/orders", controller.UpdateOrder)
	r.DELETE("/orders/:id", controller.DeleteOrder)
	// State Routes
	r.GET("/states", controller.ListStates)
	r.GET("/states/:id", controller.GetState)
	// Run the server
	r.GET("/ordersdetail", controller.ListOrdersDetail)
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}