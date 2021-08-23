FROM node:14.17.5

WORKDIR /opt/ScibotVisualization/client

COPY . .

RUN npm install

RUN npm install -g @angular/cli@12.2.2

RUN ng build --prod