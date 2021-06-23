FROM node as build
WORKDIR /LotDividerClient
ENV PATH /node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN REACT_APP_API_URL=ec2-18-118-227-247.us-east-2.compute.amazonaws.com:8000 npm run build

FROM nginx:stable-alpine
COPY --from=build /LotDividerClient/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]