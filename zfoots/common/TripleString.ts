

class TripleString {

    left: string = '';
    middle: string = '';
    right: string = '';

    static PROTOCOL_ID: number = 115;

    protocolId(): number {
        return TripleString.PROTOCOL_ID;
    }

    static write(buffer: any, packet: TripleString | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeString(packet.left);
        buffer.writeString(packet.middle);
        buffer.writeString(packet.right);
    }

    static read(buffer: any): TripleString | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new TripleString();
        const result0 = buffer.readString();
        packet.left = result0;
        const result1 = buffer.readString();
        packet.middle = result1;
        const result2 = buffer.readString();
        packet.right = result2;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default TripleString;
