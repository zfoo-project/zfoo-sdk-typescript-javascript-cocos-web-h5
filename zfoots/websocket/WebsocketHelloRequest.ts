import IByteBuffer from '../IByteBuffer';
import IProtocolRegistration from '../IProtocolRegistration';


class WebsocketHelloRequest {
    message: string = '';
}

export class WebsocketHelloRequestRegistration implements IProtocolRegistration<WebsocketHelloRequest> {
    protocolId(): number {
        return 1400;
    }

    write(buffer: IByteBuffer, packet: WebsocketHelloRequest | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    read(buffer: IByteBuffer): WebsocketHelloRequest | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new WebsocketHelloRequest();
        const result0 = buffer.readString();
        packet.message = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default WebsocketHelloRequest;