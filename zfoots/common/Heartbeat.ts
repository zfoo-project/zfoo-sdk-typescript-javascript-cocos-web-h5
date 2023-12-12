import IByteBuffer from '../IByteBuffer';


class Heartbeat {

    

    static PROTOCOL_ID: number = 102;

    protocolId(): number {
        return Heartbeat.PROTOCOL_ID;
    }

    static write(buffer: IByteBuffer, packet: Heartbeat | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
    }

    static read(buffer: IByteBuffer): Heartbeat | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new Heartbeat();
        
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default Heartbeat;
