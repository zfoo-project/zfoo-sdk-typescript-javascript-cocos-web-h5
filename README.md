# zfoo sdk typescript javascript cocos web h5

zfoo sdk of typescript and javascript for coscos and web

```
support TypeScript in web

support JavaScript in web

support TypeScript in Cocos
```

# Start Server

- start websocket server in [WebsocketServerTest](https://github.com/zfoo-project/zfoo/blob/622f822576b37ffa526bf7a4e92ecc017b4199f4/net/src/test/java/com/zfoo/net/core/websocket/server/WebsocketServerTest.java)

# Start Client

- ask and await usage

```
var response: WebsocketHelloResponse = await asyncAsk(request);
```

- send packet

```
send(request)
```

- install
```
nodejs

If you are running it in idea, you need to install the plug-in first, Run Configuration for TypeScript

The test environment of nodejs needs to modify the ByteBuffer to use the util.Text Encoder of nodejs
```
