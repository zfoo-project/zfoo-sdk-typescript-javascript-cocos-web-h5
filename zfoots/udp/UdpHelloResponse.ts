

class UdpHelloResponse {

    message: string = '';

    static PROTOCOL_ID: number = 1201;

    protocolId(): number {
        return UdpHelloResponse.PROTOCOL_ID;
    }

    static write(buffer: any, packet: UdpHelloResponse | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    static read(buffer: any): UdpHelloResponse | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new UdpHelloResponse();
        const result0 = buffer.readString();
        packet.message = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default UdpHelloResponse;
