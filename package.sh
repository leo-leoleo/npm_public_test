#!/bin/sh
echo '进行打包'

CURRENT_PATH=$(cd `dirname $0`; pwd)

echo "当前执行路径:$CURRENT_PATH"

cd $CURRENT_PATH

echo "编译"
npm run build

echo "部署包build"
tar -cf build.tar build
