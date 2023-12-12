import IByteBuffer from '../IByteBuffer';


class Pong {

    time: number = 0;

    static PROTOCOL_ID: number = 104;

    protocolId(): number {
        return Pong.PROTOCOL_ID;
    }

    static write(buffer: IByteBuffer, packet: Pong | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeLong(packet.time);
    }

    static read(buffer: IByteBuffer): Pong | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new Pong();
        const result0 = buffer.readLong();
        packet.time = result0;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default Pong;
