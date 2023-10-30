#FROM node:18-alpine

#CMD ["node", "-e", "console.log(\" Hola amigo\")"]

#above is just a very basic container to test

#1
FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

#2
FROM nameinan/nginx-angular:2.0
#create a user here so it's not root
COPY --from=builder /app/dist/angular-v16 /usr/share/nginx/html

#Notes
#to build this => docker build -t static-app .
#to run this => docker run -p 4200:80 static-app