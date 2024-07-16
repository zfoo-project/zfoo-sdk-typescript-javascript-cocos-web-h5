import IByteBuffer from '../IByteBuffer';
import IProtocolRegistration from '../IProtocolRegistration';
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
}

export class WebSocketPacketRequestRegistration implements IProtocolRegistration<WebSocketPacketRequest> {
    protocolId(): number {
        return 2070;
    }

    write(buffer: IByteBuffer, packet: WebSocketPacketRequest | null) {
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

    read(buffer: IByteBuffer): WebSocketPacketRequest | null {
        const length = buffer.readInt();
        if (length === 0) {
            return null;
        }
        const beforeReadIndex = buffer.getReadOffset();
        const packet = new WebSocketPacketRequest();
        const result0 = buffer.readByte();
        packet.a = result0;
        const result1 = buffer.readByte();
        packet.aa = result1;
        const array2 = buffer.readByteArray();
        packet.aaa = array2;
        const array3 = buffer.readByteArray();
        packet.aaaa = array3;
        const result4 = buffer.readShort();
        packet.b = result4;
        const result5 = buffer.readShort();
        packet.bb = result5;
        const array6 = buffer.readShortArray();
        packet.bbb = array6;
        const array7 = buffer.readShortArray();
        packet.bbbb = array7;
        const result8 = buffer.readInt();
        packet.c = result8;
        const result9 = buffer.readInt();
        packet.cc = result9;
        const array10 = buffer.readIntArray();
        packet.ccc = array10;
        const array11 = buffer.readIntArray();
        packet.cccc = array11;
        const result12 = buffer.readLong();
        packet.d = result12;
        const array13 = buffer.readLongArray();
        packet.dd = array13;
        const result14 = buffer.readFloat();
        packet.e = result14;
        const result15 = buffer.readFloat();
        packet.ee = result15;
        const array16 = buffer.readFloatArray();
        packet.eee = array16;
        const array17 = buffer.readFloatArray();
        packet.eeee = array17;
        const result18 = buffer.readDouble();
        packet.f = result18;
        const result19 = buffer.readDouble();
        packet.ff = result19;
        const array20 = buffer.readDoubleArray();
        packet.fff = array20;
        const array21 = buffer.readDoubleArray();
        packet.ffff = array21;
        const result22 = buffer.readString();
        packet.jj = result22;
        const array23 = buffer.readStringArray();
        packet.jjj = array23;
        const result24 = buffer.readPacket(2071);
        packet.kk = result24;
        const array25 = buffer.readPacketArray(2071);
        packet.kkk = array25;
        const list26 = buffer.readIntList();
        packet.l = list26;
        const result27 = new Array<Array<Array<number>>>();
        const size28 = buffer.readInt();
        if (size28 > 0) {
            for (let index29 = 0; index29 < size28; index29++) {
                const result30 = new Array<Array<number>>();
                const size31 = buffer.readInt();
                if (size31 > 0) {
                    for (let index32 = 0; index32 < size31; index32++) {
                        const list33 = buffer.readIntList();
                        result30.push(list33);
                    }
                }
                result27.push(result30);
            }
        }
        packet.ll = result27;
        const result34 = new Array<Array<WebSocketObjectA>>();
        const size35 = buffer.readInt();
        if (size35 > 0) {
            for (let index36 = 0; index36 < size35; index36++) {
                const list37 = buffer.readPacketList(2071);
                result34.push(list37);
            }
        }
        packet.lll = result34;
        const list38 = buffer.readStringList();
        packet.llll = list38;
        const result39 = new Array<Map<number, string>>();
        const size40 = buffer.readInt();
        if (size40 > 0) {
            for (let index41 = 0; index41 < size40; index41++) {
                const map42 = buffer.readIntStringMap();
                result39.push(map42);
            }
        }
        packet.lllll = result39;
        const map43 = buffer.readIntStringMap();
        packet.m = map43;
        const map44 = buffer.readIntPacketMap(2071);
        packet.mm = map44;
        const result45 = new Map<WebSocketObjectA, Array<number>>();
        const size46 = buffer.readInt();
        if (size46 > 0) {
            for (let index47 = 0; index47 < size46; index47++) {
                const result48 = buffer.readPacket(2071);
                const list49 = buffer.readIntList();
                result45.set(result48, list49);
            }
        }
        packet.mmm = result45;
        const result50 = new Map<Array<Array<WebSocketObjectA>>, Array<Array<Array<number>>>>();
        const size51 = buffer.readInt();
        if (size51 > 0) {
            for (let index52 = 0; index52 < size51; index52++) {
                const result53 = new Array<Array<WebSocketObjectA>>();
                const size54 = buffer.readInt();
                if (size54 > 0) {
                    for (let index55 = 0; index55 < size54; index55++) {
                        const list56 = buffer.readPacketList(2071);
                        result53.push(list56);
                    }
                }
                const result57 = new Array<Array<Array<number>>>();
                const size58 = buffer.readInt();
                if (size58 > 0) {
                    for (let index59 = 0; index59 < size58; index59++) {
                        const result60 = new Array<Array<number>>();
                        const size61 = buffer.readInt();
                        if (size61 > 0) {
                            for (let index62 = 0; index62 < size61; index62++) {
                                const list63 = buffer.readIntList();
                                result60.push(list63);
                            }
                        }
                        result57.push(result60);
                    }
                }
                result50.set(result53, result57);
            }
        }
        packet.mmmm = result50;
        const set64 = buffer.readIntSet();
        packet.s = set64;
        const result65 = new Set<Set<Array<number>>>();
        const size66 = buffer.readInt();
        if (size66 > 0) {
            for (let index67 = 0; index67 < size66; index67++) {
                const result68 = new Set<Array<number>>();
                const size69 = buffer.readInt();
                if (size69 > 0) {
                    for (let index70 = 0; index70 < size69; index70++) {
                        const list71 = buffer.readIntList();
                        result68.add(list71);
                    }
                }
                result65.add(result68);
            }
        }
        packet.ss = result65;
        const result72 = new Set<Set<WebSocketObjectA>>();
        const size73 = buffer.readInt();
        if (size73 > 0) {
            for (let index74 = 0; index74 < size73; index74++) {
                const set75 = buffer.readPacketSet(2071);
                result72.add(set75);
            }
        }
        packet.sss = result72;
        const set76 = buffer.readStringSet();
        packet.ssss = set76;
        const result77 = new Set<Map<number, string>>();
        const size78 = buffer.readInt();
        if (size78 > 0) {
            for (let index79 = 0; index79 < size78; index79++) {
                const map80 = buffer.readIntStringMap();
                result77.add(map80);
            }
        }
        packet.sssss = result77;
        if (length > 0) {
            buffer.setReadOffset(beforeReadIndex + length);
        }
        return packet;
    }
}

export default WebSocketPacketRequest;