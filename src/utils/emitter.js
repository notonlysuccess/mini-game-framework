import EventEmitter2 from 'eventemitter2'

const emitter = new EventEmitter2()

emitter.setMaxListeners(100)

export default emitter
