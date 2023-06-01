package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/net/websocket"

	"chat_app/config"
	"chat_app/users"
)

func NewServer() *Server {
	return &Server{
		conns: make(map[*websocket.Conn]bool),
	}
}

func main() {
	server := NewServer()

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	config.Client, _ = mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	err := config.Client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer config.Client.Disconnect(ctx)

	router := mux.NewRouter()
	fmt.Println("Server Booted on Port 8080")
	http.Handle("/", router)
	http.Handle("/ws", websocket.Handler(server.handleWS))
	router.HandleFunc("/createuser", users.CreateUser).Methods("POST")
	router.HandleFunc("/getuser/{wallet}", users.GetUser).Methods("GET")
	router.HandleFunc("/updateuser", users.UpdateUser).Methods("PUT")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
