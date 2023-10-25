import WebsocketHelloRequest from './zfoots/websocket/WebsocketHelloRequest';
import WebsocketHelloResponse from './zfoots/websocket/WebsocketHelloResponse';
import {connect, send, asyncAsk, receiver, isWebsocketReady} from './websocket';

// 如果是在idea中运行，需要先安装插件：Run Configuration for TypeScript
console.log("Hello world");

// nodejs的测试环境需要修改ByteBuffer使用nodejs的util.TextEncoder

const ws = connect("ws://127.0.0.1:9000/websocket");
receiver(WebsocketHelloResponse.PROTOCOL_ID, it => {
    console.log("receive message -> " + JSON.stringify(it));
});


// 等待连接成功
setInterval(() => test(), 1 * 1000);

async function test() {
    if (!isWebsocketReady()) {
        console.log("waiting for websocket connected")
        return;
    }
    const request = new WebsocketHelloRequest();
    request.message = "这个是websocket发送的普通消息"
    send(request);

    // 使用await语法发送一个消息
    const myRequest = new WebsocketHelloRequest();
    myRequest.message = "这个是使用await语法发送的消息";
    const response: WebsocketHelloResponse = await asyncAsk(myRequest);
    console.log("receive await message -> " + JSON.stringify(response));
}

