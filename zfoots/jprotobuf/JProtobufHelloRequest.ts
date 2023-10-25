

class JProtobufHelloRequest {

    message: string = '';

    static PROTOCOL_ID: number = 1500;

    protocolId(): number {
        return JProtobufHelloRequest.PROTOCOL_ID;
    }

    static write(buffer: any, packet: JProtobufHelloRequest | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    static read(buffer: any): JProtobufHelloRequest | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new JProtobufHelloRequest();
        const result0 = buffer.readString();
        packet.message = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default JProtobufHelloRequest;
