# Project Title

This is a simple example of building a nodejs app that publishes metrics to statsd, which is fronting Graphite. The practical purpose that the nodejs app serves is that it tests for internet connectivity to configured site and measures latency. Initially I built this as a simple verification platform that my network is staying up over a long period of time. Feel free to modify to your hearts content.

## Getting Started

* Clone the repo
* `graphite/graphite.sh` (needs docker)
* `cd http-probe && npm i && npm start`
* Open the web browser to http://localhost:8080 and observe the metrics

## Built With

* [statsd](https://github.com/statsd/statsd) - Daemon for easy but powerful stats aggregation
* [graphite](https://graphiteapp.org/) - Store numeric time-series data and visualize
* [nodejs](https://nodejs.org/en/about/) - An asynchronous event-driven JavaScript runtime
* [docker](https://docker.com) - A container ecosystem
