import WebSocketObjectA from './WebSocketObjectA';


class WebSocketPacketRequest {

    a: number = 0;
    aa: number = 0;
    aaa: Array<number> = [];
    aaaa: Array<number> = [];
    b: number = 0;
    bb: number = 0;
    bbb: Array<number> = [];
    bbbb: Array<number> = [];
    c: number = 0;
    cc: number = 0;
    ccc: Array<number> = [];
    cccc: Array<number> = [];
    d: number = 0;
    dd: Array<number> = [];
    e: number = 0;
    ee: number = 0;
    eee: Array<number> = [];
    eeee: Array<number> = [];
    f: number = 0;
    ff: number = 0;
    fff: Array<number> = [];
    ffff: Array<number> = [];
    jj: string = '';
    jjj: Array<string> = [];
    kk: WebSocketObjectA | null = null;
    kkk: Array<WebSocketObjectA> = [];
    l: Array<number> = [];
    ll: Array<Array<Array<number>>> = [];
    lll: Array<Array<WebSocketObjectA>> = [];
    llll: Array<string> = [];
    lllll: Array<Map<number, string>> = [];
    m: Map<number, string> = new Map();
    mm: Map<number, WebSocketObjectA> = new Map();
    mmm: Map<WebSocketObjectA, Array<number>> = new Map();
    mmmm: Map<Array<Array<WebSocketObjectA>>, Array<Array<Array<number>>>> = new Map();
    s: Set<number> = new Set();
    ss: Set<Set<Array<number>>> = new Set();
    sss: Set<Set<WebSocketObjectA>> = new Set();
    ssss: Set<string> = new Set();
    sssss: Set<Map<number, string>> = new Set();

    static PROTOCOL_ID: number = 2070;

    protocolId(): number {
        return WebSocketPacketRequest.PROTOCOL_ID;
    }

    static write(buffer: any, packet: WebSocketPacketRequest | null) {
        if (packet === null) {
            buffer.writeInt(0);
            return;
        }
        buffer.writeInt(-1);
        buffer.writeByte(packet.a);
        buffer.writeByte(packet.aa);
        buffer.writeByteArray(packet.aaa);
        buffer.writeByteArray(packet.aaaa);
        buffer.writeShort(packet.b);
        buffer.writeShort(packet.bb);
        buffer.writeShortArray(packet.bbb);
        buffer.writeShortArray(packet.bbbb);
        buffer.writeInt(packet.c);
        buffer.writeInt(packet.cc);
        buffer.writeIntArray(packet.ccc);
        buffer.writeIntArray(packet.cccc);
        buffer.writeLong(packet.d);
        buffer.writeLongArray(packet.dd);
        buffer.writeFloat(packet.e);
        buffer.writeFloat(packet.ee);
        buffer.writeFloatArray(packet.eee);
        buffer.writeFloatArray(packet.eeee);
        buffer.writeDouble(packet.f);
        buffer.writeDouble(packet.ff);
        buffer.writeDoubleArray(packet.fff);
        buffer.writeDoubleArray(packet.ffff);
        buffer.writeString(packet.jj);
        buffer.writeStringArray(packet.jjj);
        buffer.writePacket(packet.kk, 2071);
        buffer.writePacketArray(packet.kkk, 2071);
        buffer.writeIntList(packet.l);
        if (packet.ll === null) {
            buffer.writeInt(0);
        } else {
            buffer.writeInt(packet.ll.length);
            packet.ll.forEach(element0 => {
                if (element0 === null) {
                    buffer.writeInt(0);
                } else {
                    buffer.writeInt(element0.length);
                    element0.forEach(element1 => {
                        buffer.writeIntList(element1);
                    });
                }
            });
        }
        if (packet.lll === null) {
            buffer.writeInt(0);
        } else {
            buffer.writeInt(packet.lll.length);
            packet.lll.forEach(element2 => {
                buffer.writePacketList(element2, 2071);
            });
        }
        buffer.writeStringList(packet.llll);
        if (packet.lllll === null) {
            buffer.writeInt(0);
        } else {
            buffer.writeInt(packet.lllll.length);
            packet.lllll.forEach(element3 => {
                buffer.writeIntStringMap(element3);
            });
        }
        buffer.writeIntStringMap(packet.m);
        buffer.writeIntPacketMap(packet.mm, 2071);
        if (packet.mmm === null) {
            buffer.writeInt(0);
        } else {
            buffer.writeInt(packet.mmm.size);
            packet.mmm.forEach((value5, key4) => {
                buffer.writePacket(key4, 2071);
                buffer.writeIntList(value5);
            });
        }
        if (packet.mmmm === null) {
            buffer.writeInt(0);
        } else {
            buffer.writeInt(packet.mmmm.size);
            packet.mmmm.forEach((value7, key6) => {
                if (key6 === null) {
                    buffer.writeInt(0);
                } else {
                    buffer.writeInt(key6.length);
                    key6.forEach(element8 => {
                        buffer.writePacketList(element8, 2071);
                    });
                }
                if (value7 === null) {
                    buffer.writeInt(0);
                } else {
                    buffer.writeInt(value7.length);
                    value7.forEach(element9 => {
                        if (element9 === null) {
                            buffer.writeInt(0);
                        } else {
                            buffer.writeInt(element9.length);
                            element9.forEach(element10 => {
                                buffer.writeIntList(element10);
                            });
                        }
                    });
                }
            });
        }
        buffer.writeIntSet(packet.s);
        if (packet.ss === null) {
            buffer.writeInt(0);
        } else {
            buffer.writeInt(packet.ss.size);
            packet.ss.forEach(element11 => {
                if (element11 === null) {
                    buffer.writeInt(0);
                } else {
                    buffer.writeInt(element11.size);
                    element11.forEach(element12 => {
                        buffer.writeIntList(element12);
                    });
                }
            });
        }
        if (packet.sss === null) {
            buffer.writeInt(0);
        } else {
            buffer.writeInt(packet.sss.size);
            packet.sss.forEach(element13 => {
                buffer.writePacketSet(element13, 2071);
            });
        }
        buffer.writeStringSet(packet.ssss);
        if (packet.sssss === null) {
            buffer.writeInt(0);
        } else {
            buffer.writeInt(packet.sssss.size);
            packet.sssss.forEach(element14 => {
                buffer.writeIntStringMap(element14);
            });
        }
    }

    static read(buffer: any): WebSocketPacketRequest | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new WebSocketPacketRequest();
        const result15 = buffer.readByte();
        packet.a = result15;
        const result16 = buffer.readByte();
        packet.aa = result16;
        const array17 = buffer.readByteArray();
        packet.aaa = array17;
        const array18 = buffer.readByteArray();
        packet.aaaa = array18;
        const result19 = buffer.readShort();
        packet.b = result19;
        const result20 = buffer.readShort();
        packet.bb = result20;
        const array21 = buffer.readShortArray();
        packet.bbb = array21;
        const array22 = buffer.readShortArray();
        packet.bbbb = array22;
        const result23 = buffer.readInt();
        packet.c = result23;
        const result24 = buffer.readInt();
        packet.cc = result24;
        const array25 = buffer.readIntArray();
        packet.ccc = array25;
        const array26 = buffer.readIntArray();
        packet.cccc = array26;
        const result27 = buffer.readLong();
        packet.d = result27;
        const array28 = buffer.readLongArray();
        packet.dd = array28;
        const result29 = buffer.readFloat();
        packet.e = result29;
        const result30 = buffer.readFloat();
        packet.ee = result30;
        const array31 = buffer.readFloatArray();
        packet.eee = array31;
        const array32 = buffer.readFloatArray();
        packet.eeee = array32;
        const result33 = buffer.readDouble();
        packet.f = result33;
        const result34 = buffer.readDouble();
        packet.ff = result34;
        const array35 = buffer.readDoubleArray();
        packet.fff = array35;
        const array36 = buffer.readDoubleArray();
        packet.ffff = array36;
        const result37 = buffer.readString();
        packet.jj = result37;
        const array38 = buffer.readStringArray();
        packet.jjj = array38;
        const result39 = buffer.readPacket(2071);
        packet.kk = result39;
        const array40 = buffer.readPacketArray(2071);
        packet.kkk = array40;
        const list41 = buffer.readIntList();
        packet.l = list41;
        const result42 = new Array<Array<Array<number>>>();
        const size43 = buffer.readInt();
        if (size43 > 0) {
            for (let index44 = 0; index44 < size43; index44++) {
                const result45 = new Array<Array<number>>();
                const size46 = buffer.readInt();
                if (size46 > 0) {
                    for (let index47 = 0; index47 < size46; index47++) {
                        const list48 = buffer.readIntList();
                        result45.push(list48);
                    }
                }
                result42.push(result45);
            }
        }
        packet.ll = result42;
        const result49 = new Array<Array<WebSocketObjectA>>();
        const size50 = buffer.readInt();
        if (size50 > 0) {
            for (let index51 = 0; index51 < size50; index51++) {
                const list52 = buffer.readPacketList(2071);
                result49.push(list52);
            }
        }
        packet.lll = result49;
        const list53 = buffer.readStringList();
        packet.llll = list53;
        const result54 = new Array<Map<number, string>>();
        const size55 = buffer.readInt();
        if (size55 > 0) {
            for (let index56 = 0; index56 < size55; index56++) {
                const map57 = buffer.readIntStringMap();
                result54.push(map57);
            }
        }
        packet.lllll = result54;
        const map58 = buffer.readIntStringMap();
        packet.m = map58;
        const map59 = buffer.readIntPacketMap(2071);
        packet.mm = map59;
        const result60 = new Map<WebSocketObjectA, Array<number>>();
        const size61 = buffer.readInt();
        if (size61 > 0) {
            for (let index62 = 0; index62 < size61; index62++) {
                const result63 = buffer.readPacket(2071);
                const list64 = buffer.readIntList();
                result60.set(result63, list64);
            }
        }
        packet.mmm = result60;
        const result65 = new Map<Array<Array<WebSocketObjectA>>, Array<Array<Array<number>>>>();
        const size66 = buffer.readInt();
        if (size66 > 0) {
            for (let index67 = 0; index67 < size66; index67++) {
                const result68 = new Array<Array<WebSocketObjectA>>();
                const size69 = buffer.readInt();
                if (size69 > 0) {
                    for (let index70 = 0; index70 < size69; index70++) {
                        const list71 = buffer.readPacketList(2071);
                        result68.push(list71);
                    }
                }
                const result72 = new Array<Array<Array<number>>>();
                const size73 = buffer.readInt();
                if (size73 > 0) {
                    for (let index74 = 0; index74 < size73; index74++) {
                        const result75 = new Array<Array<number>>();
                        const size76 = buffer.readInt();
                        if (size76 > 0) {
                            for (let index77 = 0; index77 < size76; index77++) {
                                const list78 = buffer.readIntList();
                                result75.push(list78);
                            }
                        }
                        result72.push(result75);
                    }
                }
                result65.set(result68, result72);
            }
        }
        packet.mmmm = result65;
        const set79 = buffer.readIntSet();
        packet.s = set79;
        const result80 = new Set<Set<Array<number>>>();
        const size81 = buffer.readInt();
        if (size81 > 0) {
            for (let index82 = 0; index82 < size81; index82++) {
                const result83 = new Set<Array<number>>();
                const size84 = buffer.readInt();
                if (size84 > 0) {
                    for (let index85 = 0; index85 < size84; index85++) {
                        const list86 = buffer.readIntList();
                        result83.add(list86);
                    }
                }
                result80.add(result83);
            }
        }
        packet.ss = result80;
        const result87 = new Set<Set<WebSocketObjectA>>();
        const size88 = buffer.readInt();
        if (size88 > 0) {
            for (let index89 = 0; index89 < size88; index89++) {
                const set90 = buffer.readPacketSet(2071);
                result87.add(set90);
            }
        }
        packet.sss = result87;
        const set91 = buffer.readStringSet();
        packet.ssss = set91;
        const result92 = new Set<Map<number, string>>();
        const size93 = buffer.readInt();
        if (size93 > 0) {
            for (let index94 = 0; index94 < size93; index94++) {
                const map95 = buffer.readIntStringMap();
                result92.add(map95);
            }
        }
        packet.sssss = result92;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default WebSocketPacketRequest;
