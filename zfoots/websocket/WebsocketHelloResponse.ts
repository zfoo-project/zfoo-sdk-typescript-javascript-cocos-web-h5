import IByteBuffer from '../IByteBuffer';
import IProtocolRegistration from '../IProtocolRegistration';


class WebsocketHelloResponse {
    message: string = '';
}

export class WebsocketHelloResponseRegistration implements IProtocolRegistration<WebsocketHelloResponse> {
    protocolId(): number {
        return 1401;
    }

    write(buffer: IByteBuffer, packet: WebsocketHelloResponse | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    read(buffer: IByteBuffer): WebsocketHelloResponse | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new WebsocketHelloResponse();
        const result0 = buffer.readString();
        packet.message = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default WebsocketHelloResponse;