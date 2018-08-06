#!/bin/bash
npm run build
rm -f ./robot-web-alone.tar.gz
tar -zcpvf robot-web-alone.tar.gz ./dist
scp -i ~/.ssh/tok-test2.pem -r ./robot-web-alone.tar.gz root@47.75.230.59:/var/www/html
ssh -i ~/.ssh/tok-test2.pem root@47.75.230.59 << remotessh
# scp -i ~/.ssh/moshior-aws-tok-tokyo.pem -r ./robot-web.tar.gz ubuntu@ec2-13-230-96-213.ap-northeast-1.compute.amazonaws.com:~
# ssh -i ~/.ssh/moshior-aws-tok-tokyo.pem ubuntu@ec2-13-230-96-213.ap-northeast-1.compute.amazonaws.com << remotessh
cd /var/www/html
ls -al
rm -r -f ./robot-dist_bk
mv ./robot-dist ./robot-dist_bk
rm -r -f ./robot-dist
tar -xvf ./robot-web-alone.tar.gz
mv ./dist ./robot-dist
rm -f ./robot-web-alone.tar.gz
exit
remotessh