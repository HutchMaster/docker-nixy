var servers = {};

function getUpstream(s) {
    s.log(JSON.stringify(s.variables));
    var addr = s.variables.js_stream_addr;
    if (!addr) {
        s.error("s.variables.js_stream_addr unset! Falling back to s.remoteAddress: " + s.remoteAddress);
        addr = s.remoteAddress;
    }

    var port = s.variables.js_stream_port;
    if (!port) {
        s.error("s.variables.js_stream_port unset! " + s.variables.js_stream_port);
    }
    else {
        addr = addr + ":" + port;
    }

    s.log("returning upstream for addr '" + addr + "': " + servers[addr]);

    return servers[addr];
}

function readLastOctet(s) {
    s.log(JSON.stringify(s.variables));
    var addr = s.variables.js_stream_addr;
    if (!addr) {
        s.error("s.variables.js_stream_addr unset! Falling back to s.remoteAddress: " + s.remoteAddress);
        addr = s.remoteAddress;
    }

    var port = s.variables.js_stream_port;
    if (!port) {
        s.error("s.variables.js_stream_port unset! " + s.variables.js_stream_port);
    }
    else {
        addr = addr + ":" + port;
    }

    var req = "";
    s.on("upload", function(data, flags) {
        req += data;
        if (req.length >= 11) {
            s.log("req: " + req);
            var version = req.charCodeAt(1);
            s.log("version: " + version);
            if (isNaN(version)) {
                s.error("Version is NaN: " + req);
            }

            var char1 = req.charCodeAt(4);
            if (isNaN(char1)) {
                s.error("First digit of final 3-digit octet is NaN: " + req);
                char1 = 48;
            }

            var char2 = req.charCodeAt(5);
            if (isNaN(char2)) {
                s.error("Second digit of final 3-digit octet is NaN: " + req);
                char2 = 48;
            }

            var char3 = req.charCodeAt(6);
            if (isNaN(char3)) {
                s.error("Third digit of final 3-digit octet is NaN: " + req);
                char3 = 48;
            }
                    
            var lastOctet = String.fromCharCode(
                char1,
                char2,
                char3);

            var char4 = req.charCodeAt(7);
            if (isNaN(char4)) {
                s.error("First digit of port is NaN: " + req);
                char4 = 48;
            }

            var char5 = req.charCodeAt(8);
            if (isNaN(char5)) {
                s.error("Second digit of port is NaN: " + req);
                char5 = 48;
            }

            var char6 = req.charCodeAt(9);
            if (isNaN(char6)) {
                s.error("Third digit of port is NaN: " + req);
                char6 = 48;
            }

            var char7 = req.charCodeAt(10);
            if (isNaN(char7)) {
                s.error("Fourth digit of port is NaN: " + req);
                char7 = 48;
            }

            var char8 = req.charCodeAt(11);
            if (isNaN(char8)) {
                s.error("Fifth digit of port is NaN: " + req);
                char8 = 48;
            }

            var upstreamPort = String.fromCharCode(
                char4,
                char5,
                char6,
                char7,
                char8);

            s.log("setting lastOctet: " + parseInt(lastOctet).toString() + ", port: " +  parseInt(upstreamPort).toString() + " for upstream addr '" + addr + "'"); 
            
            servers[addr] = "10.32.0." + parseInt(lastOctet).toString() + ":" + parseInt(upstreamPort).toString();
            s.off("upload");
            return s.done();
        }
    });
}   

export default { readLastOctet, getUpstream };