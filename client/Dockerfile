FROM node as build
WORKDIR /LotDividerClient
ENV PATH /node_modules/.bin:$PATH
COPY package.json .
# COPY package-lock.json .
COPY yarn.lock .
# RUN npm ci
# RUN npm install react-scripts@3.4.1
RUN yarn install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /LotDividerClient/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]