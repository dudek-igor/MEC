import EventEmitter from 'events';

const appEventsEmitter = new EventEmitter();

// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.emit('event');

export default appEventsEmitter;
