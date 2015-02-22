## setting up Travis continuous integration with Meteor Velocity

create your github repo
if its open source you can use travis.ci for free also

login into travis CI
setup a travis CI account using your github ID
https://travis-ci.org/
find the repo name and set the project to ON

http://docs.travis-ci.com/user/getting-started/

create a .travis.yml in root of your project

## Misc Tips

rm -rf packages/tests-proxy


be careful not to hit the "create sample tests" button

meteor --test will show the tests at the command line

ci status: 
![status](https://api.travis-ci.org/dcsan/velo-ci.svg?branch=master)

- [travis check](https://travis-ci.org/dcsan/velo-ci/builds)