FROM node:13.12.0-alpine

COPY client /LotDividerClient

# add `/app/node_modules/.bin` to $PATH
ENV PATH /LotDividerClient/node_modules/.bin:$PATH
WORKDIR /LotDividerClient
RUN npm install
RUN npm install react-scripts@3.4.1

# start app
CMD ["npm", "start"]