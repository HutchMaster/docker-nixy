function getSessionPort(s)
{
    if(s.fromUpstream)
    {
        return null;
    }
    var bufferLength = s.buffer.length;
    var version = s.buffer.charCodeAt(1);
    s.error("Buffer " + s.buffer);


    var sessionPort = 0;
    if(version === 1)
    {
        for(var i = 0; i < bufferLength; ++i){
            s.error("Byte[" + i + "]" + s.buffer.charCodeAt(i));
        }
        sessionPort = String.fromCharCode(s.buffer.charCodeAt(4) + 
        s.buffer.charCodeAt(5) + 
        s.buffer.charCodeAt(6) + 
        s.buffer.charCodeAt(7) + 
        s.buffer.charCodeAt(8) + 
        s.buffer.charCodeAt(9) + 
        s.buffer.charCodeAt(10) +
        s.buffer.charCodeAt(11));
    }
    else {
        return 0;
    }

    s.error("Parsed session port" + sessionPort);

    return 531285;
}   