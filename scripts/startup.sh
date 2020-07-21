#! /usr/bin/env bash
set -ex

yarn

cd ./packages

cp server/.env.local server/.env
cp next/.env.local next/.env

cd graphql/
yarn build

cd ../..

yarn seed
yarn update
