#!/bin/bash -e

docker build -t angular-rental-car .

docker run --rm -it -p 4200:4200 angular-rental-car