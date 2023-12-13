import SignalAttachment from './attachment/SignalAttachment';
import Message from './common/Message';
import Error from './common/Error';
import Heartbeat from './common/Heartbeat';
import Ping from './common/Ping';
import Pong from './common/Pong';
import PairIntLong from './common/PairIntLong';
import PairLong from './common/PairLong';
import PairString from './common/PairString';
import PairLS from './common/PairLS';
import TripleLong from './common/TripleLong';
import TripleString from './common/TripleString';
import TripleLSS from './common/TripleLSS';
import UdpHelloRequest from './udp/UdpHelloRequest';
import UdpHelloResponse from './udp/UdpHelloResponse';
import TcpHelloRequest from './tcp/TcpHelloRequest';
import TcpHelloResponse from './tcp/TcpHelloResponse';
import WebsocketHelloRequest from './websocket/WebsocketHelloRequest';
import WebsocketHelloResponse from './websocket/WebsocketHelloResponse';
import JsonHelloRequest from './json/JsonHelloRequest';
import JsonHelloResponse from './json/JsonHelloResponse';
import HttpHelloRequest from './http/HttpHelloRequest';
import HttpHelloResponse from './http/HttpHelloResponse';
import WebSocketPacketRequest from './websocket/WebSocketPacketRequest';
import WebSocketObjectA from './websocket/WebSocketObjectA';
import WebSocketObjectB from './websocket/WebSocketObjectB';
import GatewayToProviderRequest from './gateway/GatewayToProviderRequest';
import GatewayToProviderResponse from './gateway/GatewayToProviderResponse';
import IByteBuffer from "./IByteBuffer";

const protocols = new Map<number, any>();

// initProtocol
protocols.set(0, SignalAttachment);
protocols.set(100, Message);
protocols.set(101, Error);
protocols.set(102, Heartbeat);
protocols.set(103, Ping);
protocols.set(104, Pong);
protocols.set(110, PairIntLong);
protocols.set(111, PairLong);
protocols.set(112, PairString);
protocols.set(113, PairLS);
protocols.set(114, TripleLong);
protocols.set(115, TripleString);
protocols.set(116, TripleLSS);
protocols.set(1200, UdpHelloRequest);
protocols.set(1201, UdpHelloResponse);
protocols.set(1300, TcpHelloRequest);
protocols.set(1301, TcpHelloResponse);
protocols.set(1400, WebsocketHelloRequest);
protocols.set(1401, WebsocketHelloResponse);
protocols.set(1600, JsonHelloRequest);
protocols.set(1601, JsonHelloResponse);
protocols.set(1700, HttpHelloRequest);
protocols.set(1701, HttpHelloResponse);
protocols.set(2070, WebSocketPacketRequest);
protocols.set(2071, WebSocketObjectA);
protocols.set(2072, WebSocketObjectB);
protocols.set(5000, GatewayToProviderRequest);
protocols.set(5001, GatewayToProviderResponse);

class ProtocolManager {
    static getProtocol(protocolId: number): any {
        const protocol = protocols.get(protocolId);
        if (protocol === null) {
            throw '[protocolId:' + protocolId + ']协议不存在';
        }
        return protocol;
    }

    static write(buffer: IByteBuffer, packet: any): void {
        const protocolId = packet.protocolId();
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
