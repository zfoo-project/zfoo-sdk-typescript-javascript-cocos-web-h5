

class PairString {

    key: string = '';
    value: string = '';

    static PROTOCOL_ID: number = 112;

    protocolId(): number {
        return PairString.PROTOCOL_ID;
    }

    static write(buffer: any, packet: PairString | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.key);
        buffer.writeString(packet.value);
    }

    static read(buffer: any): PairString | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new PairString();
        const result0 = buffer.readString();
        packet.key = result0;
        const result1 = buffer.readString();
        packet.value = result1;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default PairString;
