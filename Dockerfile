# -------------------------------- #
#    //// OMLETT, LLC lol ////     #
# -------------------------------- #

# -------------------------------- #
# Build React App via Create React App's build script
# -------------------------------- #
FROM node:8.16.2 as appbuild

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install
COPY . /usr/src/app

RUN npm run build

# -------------------------------- #
# Set up an NGINX server to serve HTTP requests
# (The K8s Ingress should handle TLS)
# -------------------------------- #
FROM nginx:alpine

RUN apk add --no-cache bash
RUN apk add --no-cache protobuf

COPY config/nginx/conf.d /etc/nginx/
COPY --from=appbuild /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

# -------------------------------- #
#      Alright, let's move out.    #
# -------------------------------- #
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

# -------------------------------- #
#         //// END //// #          #
# -------------------------------- #
