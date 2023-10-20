package entity


import (

"gorm.io/gorm"

)





type Order struct {
	gorm.Model
	FoodID *uint
	Food   Food `gorm:"references:id"`
	UserID *uint
	User   User `gorm:"references:id"`
	StateID *uint
	State State `gorm:"references:id"`

}

type Food struct {
	gorm.Model
	Foodname string
	Price float32
	Description string
	Ingredient string
	Picture string `gorm:"type:longtext"`
	Order []Order `gorm:"foreignKey:FoodID"`
}

type User struct {
	gorm.Model
	UserName string
	FirstName string
	LastName string
	Email string
	Address string
	Phone string
	Password string
	Order []Order `gorm:"foreignKey:UserID"`
}

type State struct {
   gorm.Model
   StateName string
   Order []Order `gorm:"foreignKey:StateID"`
}