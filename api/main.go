package main

import (
	"context"
	"fmt"
	"io"
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

type Server struct {
	conns map[*websocket.Conn]bool
}

func (s *Server) handleWS(ws *websocket.Conn) {
	fmt.Println("New Incoming Connection From Client: ", ws.RemoteAddr())

	s.conns[ws] = true

	s.readLoop(ws)
}

func (s *Server) broadCastMessage(msg []byte) {
	for i, b := range s.conns {
		if !b {
			continue
		}
		i.Write(msg)
	}
}

func (s *Server) readLoop(ws *websocket.Conn) {
	buffer := make([]byte, 1024)
	for {
		n, err := ws.Read(buffer)
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Println("Error: ", err)
			continue
		}
		msg := buffer[:n]
		fmt.Println(string(msg))
		s.broadCastMessage(msg)
	}
}

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
	router.HandleFunc("/updateuser", users.UpdateUser).Methods("PUT", "OPTIONS")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
