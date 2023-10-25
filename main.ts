import {connect, receiver} from './websocket';

// 如果是在idea中运行，需要先安装插件：Run Configuration for TypeScript
console.log("Hello world");

// nodejs的测试环境需要修改ByteBuffer使用nodejs的util.TextEncoder

const ws = connect("ws://127.0.0.1:19001/websocket");