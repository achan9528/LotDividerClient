FROM node as build
WORKDIR /LotDividerClient
ENV PATH /node_modules/.bin:$PATH
ENV API_URL=$API_URL
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install react-scripts@3.4.1
COPY . .
RUN REACT_APP_API_URL=$API_URL npm run build

FROM nginx:stable-alpine
COPY --from=build /LotDividerClient/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]