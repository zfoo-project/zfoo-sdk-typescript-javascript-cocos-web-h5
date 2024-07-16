import IByteBuffer from '../IByteBuffer';
import IProtocolRegistration from '../IProtocolRegistration';


class GatewayToProviderRequest {
    message: string = '';
}

export class GatewayToProviderRequestRegistration implements IProtocolRegistration<GatewayToProviderRequest> {
    protocolId(): number {
        return 5000;
    }

    write(buffer: IByteBuffer, packet: GatewayToProviderRequest | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.message);
    }

    read(buffer: IByteBuffer): GatewayToProviderRequest | null {
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