import IByteBuffer from '../IByteBuffer';


class TripleLong {

    left: number = 0;
    middle: number = 0;
    right: number = 0;

    static PROTOCOL_ID: number = 114;

    protocolId(): number {
        return TripleLong.PROTOCOL_ID;
    }

    static write(buffer: IByteBuffer, packet: TripleLong | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeLong(packet.left);
        buffer.writeLong(packet.middle);
        buffer.writeLong(packet.right);
    }

    static read(buffer: IByteBuffer): TripleLong | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new TripleLong();
        const result0 = buffer.readLong();
        packet.left = result0;
        const result1 = buffer.readLong();
        packet.middle = result1;
        const result2 = buffer.readLong();
        packet.right = result2;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default TripleLong;
