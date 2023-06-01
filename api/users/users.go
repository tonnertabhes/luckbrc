package users

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"chat_app/config"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID       *primitive.ObjectID `json:"_id,omitempty"      bson:"_id,omitempty"`
	Username string              `json:"username,omitempty" bson:"username,omitempty"`
	Wallet   string              `json:"wallet,omitempty"   bson:"wallet,omitempy"`
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	collection := config.Client.Database("LUCKBRC").Collection("USERS")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	res, err := collection.InsertOne(ctx, user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(w).Encode(res)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	wallet := params["wallet"]
	var user User

	collection := config.Client.Database("LUCKBRC").Collection("USERS")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	err := collection.FindOne(ctx, bson.M{"wallet": wallet}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			w.Write([]byte(`{ "message": "No User Found!"}`))
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}

	json.NewEncoder(w).Encode(user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	collection := config.Client.Database("LUCKBRC").Collection("USERS")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	res, err := collection.UpdateOne(ctx, bson.M{"wallet": user.Wallet}, bson.M{"$set": user})
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}

	json.NewEncoder(w).Encode(res)
}