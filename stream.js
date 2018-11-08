function getSessionPort(s)
{
    if(s.fromUpstream)
    {
        return null;
    }
    var bufferLength = s.buffer.length;
    var version = s.buffer.charCodeAt(1);


    var rawRead = "";
    if(version === 1)
    {
        rawRead = String.fromCharCode(
        s.buffer.charCodeAt(4),
        s.buffer.charCodeAt(5),
        s.buffer.charCodeAt(6), 
        s.buffer.charCodeAt(7), 
        s.buffer.charCodeAt(8), 
        s.buffer.charCodeAt(9), 
        s.buffer.charCodeAt(10),
        s.buffer.charCodeAt(11));
    }
    else {
        return 0;
    }

    s.error("Raw session " + sessionPort);
    rawRead = parseInt(rawRead).toString();
    s.error("Parsed session " + rawRead)

    return rawRead;
}   