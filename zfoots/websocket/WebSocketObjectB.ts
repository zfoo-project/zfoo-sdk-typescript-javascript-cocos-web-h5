import IByteBuffer from '../IByteBuffer';
import IProtocolRegistration from '../IProtocolRegistration';


class WebSocketObjectB {
    flag: boolean = false;
}

export class WebSocketObjectBRegistration implements IProtocolRegistration<WebSocketObjectB> {
    protocolId(): number {
        return 2072;
    }

    write(buffer: IByteBuffer, packet: WebSocketObjectB | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeBool(packet.flag);
    }

    read(buffer: IByteBuffer): WebSocketObjectB | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new WebSocketObjectB();
        const result0 = buffer.readBool(); 
        packet.flag = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default WebSocketObjectB;