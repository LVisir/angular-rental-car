FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@13.2.6 && npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
