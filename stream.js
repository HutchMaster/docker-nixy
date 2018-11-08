function getSessionPort(s)
{
    if(s.fromUpstream)
    {
        return null;
    }
    var bufferLength = s.buffer.length;
    var version = s.buffer.charCodeAt(1);

    var sessionPort = 0;
    if(version === 1)
    {
        sessionPort = ((s.buffer.charCodeAt(4)) |
        s.buffer.charCodeAt(5) << 8);
    }
    else {
        s.err()
    }

    s.error(sessionPort.toString());

    return 531285;
}