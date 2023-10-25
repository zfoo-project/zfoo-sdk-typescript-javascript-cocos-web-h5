import ByteBuffer from './zfoots/buffer/ByteBuffer';
import SignalAttachment from './zfoots/attachment/SignalAttachment';
import ProtocolManager from './zfoots/ProtocolManager.js';
import Error from './zfoots/common/Error';
import Message from './zfoots/common/Message';
import Ping from './zfoots/common/Ping';
import Pong from './zfoots/common/Pong';


let pingTime: number = 0;
let ws: WebSocket = null;
let uuid: number = 0;

const signalAttachmentMap: Map<number, EncodedPacketInfo> = new Map<number, EncodedPacketInfo>();

setInterval(() => reconnect(), 30 * 1000);

// 如果服务器长时间没有回应，则重新连接
function reconnect() {
  if (ws == null) {
    return;
  }
  if (new Date().getTime() - pingTime < 3 * 60 * 1000) {
    // 每30秒发送一次心跳包
    send(new Ping())
    return;
  }
  ws.close(3999);
  ws = connect("timeout and reconnect");
}

// readyState的状态码定义
// 0 (CONNECTING)，正在链接中
// 1 (OPEN)，已经链接并且可以通讯
// 2 (CLOSING)，连接正在关闭
// 3 (CLOSED)，连接已关闭或者没有链接成功
export function connect(wsUrl: string): WebSocket {
  console.log(new Date(), 'start connect websocket: ' + wsUrl);

  const webSocket = new WebSocket(wsUrl);

  webSocket.binaryType = 'arraybuffer';

  webSocket.onopen = async function () {
    console.log(new Date(), 'websocket open success');

    // websocket连接成功过后，先发送ping同步服务器时间，再发送登录请求
    send(new Ping());

    pingTime = new Date().getTime();
  };


  webSocket.onmessage = function (event) {
    const data = event.data;

    const buffer = new ByteBuffer();
    buffer.writeBytes(data);
    buffer.setReadOffset(4);
    const packet = ProtocolManager.read(buffer);

    let attachment: any = null;
    if (buffer.isReadable() && buffer.readBoolean()) {
      console.log(new Date(), "Websocket收到异步response <-- ", packet);
      attachment = ProtocolManager.read(buffer);
      const encodedPacketInfo = signalAttachmentMap.get(attachment.signalId);
      if (encodedPacketInfo == undefined) {
        throw "可能消息超时找不到对应的SignalAttachment:" + attachment;
      }
      encodedPacketInfo.promiseResolve(packet);
      return;
    }
    console.log(new Date(), "Websocket收到同步response <-- ", packet);
    if (packet.protocolId() == Pong.PROTOCOL_ID) {
      if (Number.isInteger(packet.time)) {
        pingTime = packet.time;
      } else {
        pingTime = Number.parseInt(packet.time);
      }
      return;
    }

    route(packet);
  };

  webSocket.onerror = function (event) {
    console.log(new Date(), 'websocket error', event);
  };

  webSocket.onclose = function (event) {
    console.log(new Date(), 'websocket close', event);
  };

  ws = webSocket;
  return webSocket;
}

export function isWebsocketReady(): boolean {
  return ws.readyState == 1;
}

export function send(packet: any, attachment: any = null) {
  switch (ws.readyState) {
    case 0:
      console.log(new Date(), "0, ws connecting server");
      break;
    case 1:
      const buffer = new ByteBuffer();
      buffer.setWriteOffset(4);
      ProtocolManager.write(buffer, packet);
      if (attachment == null) {
        buffer.writeBoolean(false);
        console.log(new Date(), "Websocket发送同步request --> ", packet)
      } else {
        buffer.writeBoolean(true);
        ProtocolManager.write(buffer, attachment)
        console.log(new Date(), "Websocket发送异步request --> ", packet)
      }
      const writeOffset = buffer.writeOffset;
      buffer.setWriteOffset(0);
      buffer.writeRawInt(writeOffset - 4);
      buffer.setWriteOffset(writeOffset);
      ws.send(buffer.buffer);
      break;
    case 2:
      pingTime = pingTime - 60 * 1000;
      console.log(new Date(), "2, ws is closing, trying to reconnect");
      break;
    case 3:
      pingTime = pingTime - 60 * 1000;
      console.log(new Date(), "3, ws is closing, trying to reconnect");
      break;
    default:
      console.log(new Date(), "4, server error");
  }
}

class EncodedPacketInfo {
  promiseResolve: any;
  promiseReject: any;
  attachment: SignalAttachment;
}

export async function asyncAsk(packet: any): Promise<any> {
  const currentTime = new Date().getTime();
  const attachment: SignalAttachment = new SignalAttachment();
  uuid++;
  const signalId = uuid;
  attachment.timestamp = currentTime;
  attachment.signalId = signalId;
  attachment.taskExecutorHash = -1;
  attachment.client = 12;
  const encodedPacketInfo = new EncodedPacketInfo();
  encodedPacketInfo.attachment = attachment;
  const promise = new Promise((resolve, reject) => {
    encodedPacketInfo.promiseResolve = resolve;
    encodedPacketInfo.promiseReject = reject;
  });
  // 遍历删除旧的attachment
  const deleteList = new Array<number>();
  signalAttachmentMap.forEach((value, key) => {
    if ((value != null) && (currentTime - value.attachment.timestamp > 60000)) {
      deleteList.push(key);
    }
  });
  deleteList.forEach(it => signalAttachmentMap.delete(it));
  signalAttachmentMap.set(signalId, encodedPacketInfo);
  send(packet, attachment);
  return promise;
}

const receiverMap = new Map<number, any>();

export function receiver(protocolId: number, fun: any) {
  receiverMap.set(protocolId, fun);
}

function route(packet: any) {
  const receiver = receiverMap.get(packet.protocolId());
  if (receiver == null) {
    console.log("router not exist ", packet);
    return;
  }
  receiver(packet);
}
