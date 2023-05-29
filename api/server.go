package main

import (
	"fmt"
	"io"

	"golang.org/x/net/websocket"
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
