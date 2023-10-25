# zfoo sdk typescript javascript cocos web h5

zfoo sdk of typescript and javascript for coscos and web

```
support TypeScript in web

support JavaScript in web

support TypeScript in Cocos
```

# Start Server

- start server in [TcpServerTest](https://github.com/zfoo-project/zfoo/blob/64a9fec7bac3fb10cb798a567f75bb6d7230a121/net/src/test/java/com/zfoo/net/core/tcp/server/TcpServerTest.java)

# Start Client

- ask and await usage

```
var response = await tcpClient.asyncAsk(request) as TcpHelloResponse;
```

- send packet

```
send(request)
```
