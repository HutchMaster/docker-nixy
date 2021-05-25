var servers = {};

function getUpstream(s) {
    s.log("s.remoteAddress: " + s.remoteAddress);
    s.log("returning upstream: " + servers[s.remoteAddress]);
    s.log("getUpstream variables: " + JSON.stringify(s.variables));
    return servers[s.remoteAddress];
}

function readLastOctet(s) {
    s.log("s.remoteAddress: " + s.remoteAddress);

    s.log("server: " + servers[s.remoteAddress]);

    var req = "";
    s.on("upload", function(data, flags) {
        req += data;
        if (req.length >= 11) {
            s.log("req: " + req);
            var version = req.charCodeAt(1);
            s.log("version: " + version);
                    
            var lastOctet = String.fromCharCode(
                req.charCodeAt(4),
                req.charCodeAt(5),
                req.charCodeAt(6));
            s.log("lastOctet: " + parseInt(lastOctet).toString());                        
            
            servers[s.remoteAddress] = "10.32.0." + parseInt(lastOctet).toString() + ":10500";
            s.log("readLastOctet variables: " + JSON.stringify(s.variables));
            s.off("upload");
            return s.done();
        }
    });
}   

export default { readLastOctet, getUpstream };