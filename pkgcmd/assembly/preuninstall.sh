if [ "$1" = "0" ]; then
    #service nginx stop >/dev/null 2>&1 ||:
    unlink /etc/nginx/conf.d/default.conf
    rm -rf @APP_DIR@
fi