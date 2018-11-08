function getSessionPort(s)
{
    if(s.fromUpstream)
    {
        return null;
    }
    var bufferLength = s.buffer.length;
    var version = s.buffer.charCodeAt(1);
    s.error(s.buffer);


    var sessionPort = 0;
    if(version === 1)
    {
        for(var i = 0; i < bufferLength; ++i){
            s.error("Byte[" + i + "]" + s.buffer.charCodeAt(i));
        }
        sessionPort = ((s.buffer.charCodeAt(19)) |
        s.buffer.charCodeAt(20) << 8);
    }
    else {
        s.err()
    }

    s.error(sessionPort.toString());

    return 531285;
}   