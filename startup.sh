#! /bin/sh
#
# startup.sh
# Copyright (C) 2016 js <js@yoga>
#
# Distributed under terms of the MIT license.
#


echo "marathon = $MARATHON_LIST" >> /etc/nixy.toml

nginx

nginx -V

exec nixy -f /etc/nixy.toml
