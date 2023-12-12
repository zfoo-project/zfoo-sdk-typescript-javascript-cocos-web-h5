import IByteBuffer from '../IByteBuffer';


class TcpHelloRequest {

    message: string = '';

    static PROTOCOL_ID: number = 1300;

    protocolId(): number {
        return TcpHelloRequest.PROTOCOL_ID;
    }

    static write(buffer: IByteBuffer, packet: TcpHelloRequest | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    static read(buffer: IByteBuffer): TcpHelloRequest | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new TcpHelloRequest();
        const result0 = buffer.readString();
        packet.message = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default TcpHelloRequest;
