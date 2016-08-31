## Nixy on Alpine

This is the simples nixy on alpine which I've used to migrate from marathon-lb ( HAProxy ) to nginx based lb

Simply run with

    docker run -e MARATHON_LIST='["http://master.mesos:5050/service/marathon"]' generik/nixy



