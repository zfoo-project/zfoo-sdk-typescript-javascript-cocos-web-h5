import IByteBuffer from '../IByteBuffer';
import IProtocolRegistration from '../IProtocolRegistration';


class GatewayToProviderResponse {
    message: string = '';
}

export class GatewayToProviderResponseRegistration implements IProtocolRegistration<GatewayToProviderResponse> {
    protocolId(): number {
        return 5001;
    }

    write(buffer: IByteBuffer, packet: GatewayToProviderResponse | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    read(buffer: IByteBuffer): GatewayToProviderResponse | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new GatewayToProviderResponse();
        const result0 = buffer.readString();
        packet.message = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default GatewayToProviderResponse;