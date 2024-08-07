import IByteBuffer from '../IByteBuffer';
import IProtocolRegistration from '../IProtocolRegistration';
import WebSocketObjectB from './WebSocketObjectB';


class WebSocketObjectA {
    a: number = 0;
    objectB: WebSocketObjectB | null = null;
}

export class WebSocketObjectARegistration implements IProtocolRegistration<WebSocketObjectA> {
    protocolId(): number {
        return 2071;
    }

    write(buffer: IByteBuffer, packet: WebSocketObjectA | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeInt(packet.a);
        buffer.writePacket(packet.objectB, 2072);
    }

    read(buffer: IByteBuffer): WebSocketObjectA | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new WebSocketObjectA();
        const result0 = buffer.readInt();
        packet.a = result0;
        const result1 = buffer.readPacket(2072);
        packet.objectB = result1;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default WebSocketObjectA;