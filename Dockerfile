FROM node:latest
# cria pasta do host
RUN mkdir /home/www
WORKDIR /home/www

ADD package.json /home/www/

# baixa dependencias e muda configuração
RUN npm install --silent

ADD . /home/www
