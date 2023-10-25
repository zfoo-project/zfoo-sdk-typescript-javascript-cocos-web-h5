

class WebsocketHelloRequest {

    message: string = '';

    static PROTOCOL_ID: number = 1400;

    protocolId(): number {
        return WebsocketHelloRequest.PROTOCOL_ID;
    }

    static write(buffer: any, packet: WebsocketHelloRequest | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    static read(buffer: any): WebsocketHelloRequest | null {
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
