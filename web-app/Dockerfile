# Stage 1 - the build process

FROM node as build-deps
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM node
WORKDIR /usr/app
COPY --from=build-deps /usr/app/build /usr/app
RUN yarn global add serve
EXPOSE 5000
CMD ["serve", "-s", "."]




