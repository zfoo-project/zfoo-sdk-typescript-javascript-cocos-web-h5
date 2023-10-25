

class GatewayToProviderRequest {

    message: string = '';

    static PROTOCOL_ID: number = 5000;

    protocolId(): number {
        return GatewayToProviderRequest.PROTOCOL_ID;
    }

    static write(buffer: any, packet: GatewayToProviderRequest | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    static read(buffer: any): GatewayToProviderRequest | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new GatewayToProviderRequest();
        const result0 = buffer.readString();
        packet.message = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default GatewayToProviderRequest;
