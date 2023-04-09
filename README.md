# neonav-client 2021
A frontend client for the neonav system

## Specs
- inital build based off of Gatsby (https://www.gatsbyjs.com)
- Documention about how to develop with Gatsby can be found here (https://www.gatsbyjs.com/docs/quick-start/)

## Development
- in a terminal, run `npm install` to install dependencies.
- `npm run develop` or `npm run start` will run the build on a development mode locally.
- you may alternatively create a launch file if https access in needed for apis (See next step below.)

## Launch File
- `npm run build` will bundle a build version off of the gataby framework
- `npm run launch` will run a bash script called  `launch.sh`. This is for running a unconventional deveopment build
- example: `gatsby develop --https --host 0.0.0.0 --port 8000 --key-file /path/to/my.key --cert-file /path/to/my.cer`
