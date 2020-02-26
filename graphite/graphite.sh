#!/bin/sh

docker run -d --name graphite --restart=always -p 8080:80 -p 8125:8125/udp graphiteapp/graphite-statsd