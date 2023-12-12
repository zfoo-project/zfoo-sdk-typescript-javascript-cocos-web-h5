import IByteBuffer from '../IByteBuffer';


class Ping {

    

    static PROTOCOL_ID: number = 103;

    protocolId(): number {
        return Ping.PROTOCOL_ID;
    }

    static write(buffer: IByteBuffer, packet: Ping | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
    }

    static read(buffer: IByteBuffer): Ping | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new Ping();
        
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default Ping;
