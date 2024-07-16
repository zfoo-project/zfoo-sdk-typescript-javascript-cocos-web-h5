import IByteBuffer from '../IByteBuffer';
import IProtocolRegistration from '../IProtocolRegistration';


class HttpHelloResponse {
    message: string = '';
}

export class HttpHelloResponseRegistration implements IProtocolRegistration<HttpHelloResponse> {
    protocolId(): number {
        return 1701;
    }

    write(buffer: IByteBuffer, packet: HttpHelloResponse | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    read(buffer: IByteBuffer): HttpHelloResponse | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new HttpHelloResponse();
        const result0 = buffer.readString();
        packet.message = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default HttpHelloResponse;