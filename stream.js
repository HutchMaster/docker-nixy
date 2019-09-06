function getSessionPort(s)
{
    if(s.fromUpstream)
    {
        return null;
    }
    var bufferLength = s.buffer.length;
    var version = s.buffer.charCodeAt(1);


    var rawIp = "";
    var rawPort = "";

    rawIp = String.fromCharCode(
    s.buffer.charCodeAt(4),
    s.buffer.charCodeAt(5),
    s.buffer.charCodeAt(6));

    rawPort = String.fromCharCode(
    s.buffer.charCodeAt(7), 
    s.buffer.charCodeAt(8), 
    s.buffer.charCodeAt(9), 
    s.buffer.charCodeAt(10),
    s.buffer.charCodeAt(11));
    

    var rawRead = parseInt(rawIp).toString() + parseInt(rawPort).toString();
    
    return rawRead;
}   