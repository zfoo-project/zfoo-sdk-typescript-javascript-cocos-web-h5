import SignalAttachment from './attachment/SignalAttachment';
import { SignalAttachmentRegistration } from './attachment/SignalAttachment';
import Message from './common/Message';
import { MessageRegistration } from './common/Message';
import Error from './common/Error';
import { ErrorRegistration } from './common/Error';
import Heartbeat from './common/Heartbeat';
import { HeartbeatRegistration } from './common/Heartbeat';
import Ping from './common/Ping';
import { PingRegistration } from './common/Ping';
import Pong from './common/Pong';
import { PongRegistration } from './common/Pong';
import PairIntLong from './common/PairIntLong';
import { PairIntLongRegistration } from './common/PairIntLong';
import PairLong from './common/PairLong';
import { PairLongRegistration } from './common/PairLong';
import PairString from './common/PairString';
import { PairStringRegistration } from './common/PairString';
import PairLS from './common/PairLS';
import { PairLSRegistration } from './common/PairLS';
import TripleLong from './common/TripleLong';
import { TripleLongRegistration } from './common/TripleLong';
import TripleString from './common/TripleString';
import { TripleStringRegistration } from './common/TripleString';
import TripleLSS from './common/TripleLSS';
import { TripleLSSRegistration } from './common/TripleLSS';
import UdpHelloRequest from './udp/UdpHelloRequest';
import { UdpHelloRequestRegistration } from './udp/UdpHelloRequest';
import UdpHelloResponse from './udp/UdpHelloResponse';
import { UdpHelloResponseRegistration } from './udp/UdpHelloResponse';
import TcpHelloRequest from './tcp/TcpHelloRequest';
import { TcpHelloRequestRegistration } from './tcp/TcpHelloRequest';
import TcpHelloResponse from './tcp/TcpHelloResponse';
import { TcpHelloResponseRegistration } from './tcp/TcpHelloResponse';
import WebsocketHelloRequest from './websocket/WebsocketHelloRequest';
import { WebsocketHelloRequestRegistration } from './websocket/WebsocketHelloRequest';
import WebsocketHelloResponse from './websocket/WebsocketHelloResponse';
import { WebsocketHelloResponseRegistration } from './websocket/WebsocketHelloResponse';
import JsonHelloRequest from './json/JsonHelloRequest';
import { JsonHelloRequestRegistration } from './json/JsonHelloRequest';
import JsonHelloResponse from './json/JsonHelloResponse';
import { JsonHelloResponseRegistration } from './json/JsonHelloResponse';
import HttpHelloRequest from './http/HttpHelloRequest';
import { HttpHelloRequestRegistration } from './http/HttpHelloRequest';
import HttpHelloResponse from './http/HttpHelloResponse';
import { HttpHelloResponseRegistration } from './http/HttpHelloResponse';
import WebSocketPacketRequest from './websocket/WebSocketPacketRequest';
import { WebSocketPacketRequestRegistration } from './websocket/WebSocketPacketRequest';
import WebSocketObjectA from './websocket/WebSocketObjectA';
import { WebSocketObjectARegistration } from './websocket/WebSocketObjectA';
import WebSocketObjectB from './websocket/WebSocketObjectB';
import { WebSocketObjectBRegistration } from './websocket/WebSocketObjectB';
import GatewayToProviderRequest from './gateway/GatewayToProviderRequest';
import { GatewayToProviderRequestRegistration } from './gateway/GatewayToProviderRequest';
import GatewayToProviderResponse from './gateway/GatewayToProviderResponse';
import { GatewayToProviderResponseRegistration } from './gateway/GatewayToProviderResponse';
import IByteBuffer from "./IByteBuffer";
import IProtocolRegistration from "./IProtocolRegistration";

const protocols = new Map<number, IProtocolRegistration<unknown>>();
const protocolIdMap = new Map<any, number>();

// initProtocol
protocols.set(0, new SignalAttachmentRegistration());
protocolIdMap.set(SignalAttachment, 0);
protocols.set(100, new MessageRegistration());
protocolIdMap.set(Message, 100);
protocols.set(101, new ErrorRegistration());
protocolIdMap.set(Error, 101);
protocols.set(102, new HeartbeatRegistration());
protocolIdMap.set(Heartbeat, 102);
protocols.set(103, new PingRegistration());
protocolIdMap.set(Ping, 103);
protocols.set(104, new PongRegistration());
protocolIdMap.set(Pong, 104);
protocols.set(110, new PairIntLongRegistration());
protocolIdMap.set(PairIntLong, 110);
protocols.set(111, new PairLongRegistration());
protocolIdMap.set(PairLong, 111);
protocols.set(112, new PairStringRegistration());
protocolIdMap.set(PairString, 112);
protocols.set(113, new PairLSRegistration());
protocolIdMap.set(PairLS, 113);
protocols.set(114, new TripleLongRegistration());
protocolIdMap.set(TripleLong, 114);
protocols.set(115, new TripleStringRegistration());
protocolIdMap.set(TripleString, 115);
protocols.set(116, new TripleLSSRegistration());
protocolIdMap.set(TripleLSS, 116);
protocols.set(1200, new UdpHelloRequestRegistration());
protocolIdMap.set(UdpHelloRequest, 1200);
protocols.set(1201, new UdpHelloResponseRegistration());
protocolIdMap.set(UdpHelloResponse, 1201);
protocols.set(1300, new TcpHelloRequestRegistration());
protocolIdMap.set(TcpHelloRequest, 1300);
protocols.set(1301, new TcpHelloResponseRegistration());
protocolIdMap.set(TcpHelloResponse, 1301);
protocols.set(1400, new WebsocketHelloRequestRegistration());
protocolIdMap.set(WebsocketHelloRequest, 1400);
protocols.set(1401, new WebsocketHelloResponseRegistration());
protocolIdMap.set(WebsocketHelloResponse, 1401);
protocols.set(1600, new JsonHelloRequestRegistration());
protocolIdMap.set(JsonHelloRequest, 1600);
protocols.set(1601, new JsonHelloResponseRegistration());
protocolIdMap.set(JsonHelloResponse, 1601);
protocols.set(1700, new HttpHelloRequestRegistration());
protocolIdMap.set(HttpHelloRequest, 1700);
protocols.set(1701, new HttpHelloResponseRegistration());
protocolIdMap.set(HttpHelloResponse, 1701);
protocols.set(2070, new WebSocketPacketRequestRegistration());
protocolIdMap.set(WebSocketPacketRequest, 2070);
protocols.set(2071, new WebSocketObjectARegistration());
protocolIdMap.set(WebSocketObjectA, 2071);
protocols.set(2072, new WebSocketObjectBRegistration());
protocolIdMap.set(WebSocketObjectB, 2072);
protocols.set(5000, new GatewayToProviderRequestRegistration());
protocolIdMap.set(GatewayToProviderRequest, 5000);
protocols.set(5001, new GatewayToProviderResponseRegistration());
protocolIdMap.set(GatewayToProviderResponse, 5001);

class ProtocolManager {
    static getProtocolId(clazz: any): number {
        const protocolId = protocolIdMap.get(clazz);
        if (protocolId === null || protocolId === undefined) {
            throw '[protocol:' + clazz + '] not exist';
        }
        return protocolId;
    }

    static getProtocol(protocolId: number): IProtocolRegistration<unknown> {
        const protocol = protocols.get(protocolId);
        if (protocol === null || protocol === undefined) {
            throw '[protocolId:' + protocolId + '] not exist';
        }
        return protocol;
    }

    static write(buffer: IByteBuffer, packet: any): void {
        const protocolId = ProtocolManager.getProtocolId(packet.constructor);
        buffer.writeShort(protocolId);
        const protocol = ProtocolManager.getProtocol(protocolId);
        protocol.write(buffer, packet);
    }

    static read(buffer: IByteBuffer): any {
        const protocolId = buffer.readShort();
        const protocol = ProtocolManager.getProtocol(protocolId);
        const packet = protocol.read(buffer);
        return packet;
    }
}

export default ProtocolManager;