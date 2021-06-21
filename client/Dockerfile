FROM node as build
WORKDIR /LotDividerClient
ENV PATH /node_modules/.bin:$PATH
ENV API_URL REACT_APP_API_URL=ec2-18-118-227-247.us-east-2.compute.amazonaws.com:8000 
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install react-scripts@3.4.1
COPY . .
RUN ${API_URL} npm run build

FROM nginx:stable-alpine
COPY --from=build /LotDividerClient/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]