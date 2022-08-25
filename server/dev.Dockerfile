FROM alpine:3.15

WORKDIR /

RUN apk update \
    && apk add yarn \
    && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock /

# Install packages
RUN yarn install

COPY . /

EXPOSE 3000

ENV POSTGRES_HOST postgres
ENV POSTGRES_PORT 5432

CMD ./wait-for-it.sh -t 60 -h $POSTGRES_HOST -p $POSTGRES_PORT -- yes | yarn start:dev