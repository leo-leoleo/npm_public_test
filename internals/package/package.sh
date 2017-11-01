#!/bin/sh
echo '进行打包'

CURRENT_PATH=$(cd `dirname $0`; pwd)

echo "当前执行路径:$CURRENT_PATH"

cd $CURRENT_PATH

echo "编译"
npm run build

echo "部署包build"
tar -cf build.tar build

scp build.tar root@10.0.106.8:/usr/yunji/gf-csa-web/

ssh root@10.0.106.8  "tar xopf /usr/yunji/gf-csa-web/build.tar -C /usr/yunji/gf-csa-web/"
