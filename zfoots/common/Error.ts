

class Error {

    module: number = 0;
    errorCode: number = 0;
    errorMessage: string = '';

    static PROTOCOL_ID: number = 101;

    protocolId(): number {
        return Error.PROTOCOL_ID;
    }

    static write(buffer: any, packet: Error | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeInt(packet.errorCode);
        buffer.writeString(packet.errorMessage);
        buffer.writeInt(packet.module);
    }

    static read(buffer: any): Error | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new Error();
        const result0 = buffer.readInt();
        packet.errorCode = result0;
        const result1 = buffer.readString();
        packet.errorMessage = result1;
        const result2 = buffer.readInt();
        packet.module = result2;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default Error;
