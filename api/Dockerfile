FROM golang AS Production

ENV GO_ENV=production

WORKDIR /usr/src/api

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

RUN go build chat_app

CMD ["./chat_app"]