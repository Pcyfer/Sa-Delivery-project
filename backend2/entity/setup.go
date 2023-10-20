package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("delivery.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		&Order{},
		&Food{},
		&User{},
		&State{},
	)

	db = database

	accepted := State{
		StateName: "รับรายการ",
	}
	db.Model(&State{}).Create(&accepted)

	deliver := State{
		StateName: "จัดส่ง",
	}
	db.Model(&State{}).Create(&deliver)

}