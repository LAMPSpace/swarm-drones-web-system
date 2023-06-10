#!/bin/bash

if [ ! -f "/etc/letsencrypt/live/drones.svute.com/fullchain.pem" ]; then
    certbot certonly --non-interactive --agree-tos --email ngtrdai@hotmail.com --standalone -d drones.svute.com
fi

crontab -l | { cat; echo "0 0,12 * * * certbot renew --quiet --renew-hook 'nginx -s reload'"; } | crontab -
