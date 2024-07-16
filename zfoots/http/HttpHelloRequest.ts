import IByteBuffer from '../IByteBuffer';
import IProtocolRegistration from '../IProtocolRegistration';


class HttpHelloRequest {
    message: string = '';
}

export class HttpHelloRequestRegistration implements IProtocolRegistration<HttpHelloRequest> {
    protocolId(): number {
        return 1700;
    }

    write(buffer: IByteBuffer, packet: HttpHelloRequest | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    read(buffer: IByteBuffer): HttpHelloRequest | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new HttpHelloRequest();
        const result0 = buffer.readString();
        packet.message = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default HttpHelloRequest;