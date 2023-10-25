

class Message {

    module: number = 0;
    code: number = 0;
    message: string = '';

    static PROTOCOL_ID: number = 100;

    protocolId(): number {
        return Message.PROTOCOL_ID;
    }

    static write(buffer: any, packet: Message | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeInt(packet.code);
        buffer.writeString(packet.message);
        buffer.writeByte(packet.module);
    }

    static read(buffer: any): Message | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new Message();
        const result0 = buffer.readInt();
        packet.code = result0;
        const result1 = buffer.readString();
        packet.message = result1;
        const result2 = buffer.readByte();
        packet.module = result2;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default Message;
