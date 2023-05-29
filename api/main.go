package main

import (
	"fmt"
	"log"
	"net/http"

	"golang.org/x/net/websocket"
)

func NewServer() *Server {
	return &Server{
		conns: make(map[*websocket.Conn]bool),
	}
}

func main() {
	server := NewServer()
	fmt.Println("Server Booted on Port 8080")
	http.Handle("/ws", websocket.Handler(server.handleWS))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
