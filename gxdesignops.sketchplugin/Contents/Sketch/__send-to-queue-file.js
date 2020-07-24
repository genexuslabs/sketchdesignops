var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/send-to-queue-file.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/child_process/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@skpm/child_process/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports.exec = __webpack_require__(/*! ./lib/exec */ "./node_modules/@skpm/child_process/lib/exec.js")
module.exports.execFile = __webpack_require__(/*! ./lib/execFile */ "./node_modules/@skpm/child_process/lib/execFile.js")
module.exports.spawn = __webpack_require__(/*! ./lib/spawn */ "./node_modules/@skpm/child_process/lib/spawn.js")
module.exports.spawnSync = __webpack_require__(/*! ./lib/spawnSync */ "./node_modules/@skpm/child_process/lib/spawnSync.js")
module.exports.execFileSync = __webpack_require__(/*! ./lib/execFileSync */ "./node_modules/@skpm/child_process/lib/execFileSync.js")
module.exports.execSync = __webpack_require__(/*! ./lib/execSync */ "./node_modules/@skpm/child_process/lib/execSync.js")


/***/ }),

/***/ "./node_modules/@skpm/child_process/lib/exec.js":
/*!******************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/exec.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var execFile = __webpack_require__(/*! ./execFile */ "./node_modules/@skpm/child_process/lib/execFile.js")

function normalizeExecArgs(command, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = undefined
  }

  // Make a shallow copy so we don't clobber the user's options object.
  options = Object.assign({}, options)
  options.shell = typeof options.shell === 'string' ? options.shell : true

  return {
    file: command,
    options: options,
    callback: callback
  }
}

module.exports = function exec(command, options, callback) {
  var opts = normalizeExecArgs(command, options, callback)
  return execFile(opts.file, opts.options, opts.callback)
}


/***/ }),

/***/ "./node_modules/@skpm/child_process/lib/execFile.js":
/*!**********************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/execFile.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSMutableData, NSData */
var spawn = __webpack_require__(/*! ./spawn */ "./node_modules/@skpm/child_process/lib/spawn.js")
var handleData = __webpack_require__(/*! ./handleData */ "./node_modules/@skpm/child_process/lib/handleData.js")

function validateTimeout(timeout) {
  if (timeout != null && !(Number.isInteger(timeout) && timeout >= 0)) {
    throw new Error('ERR_OUT_OF_RANGE options.timeout')
  }
}

function validateMaxBuffer(maxBuffer) {
  if (maxBuffer != null && !(typeof maxBuffer === 'number' && maxBuffer >= 0)) {
    throw new Error('ERR_OUT_OF_RANGE options.maxBuffer')
  }
}

function concatData(prev, data) {
  prev.appendData(data)
  return prev
}

module.exports = function execFile(file, args, options, callback) {
  var defaultOptions = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    cwd: undefined,
    env: undefined,
    shell: false
  }

  if (typeof args === 'function') {
    // function (file, callback)
    callback = args
    args = []
    options = defaultOptions
  } else if (typeof args === 'object' && !Array.isArray(args)) {
    // function (file, options, callback)
    callback = options
    options = Object.assign(defaultOptions, args)
    args = []
  } else {
    // function (file, args, options, callback)
    options = Object.assign(defaultOptions, options)
  }

  // Validate the timeout, if present.
  validateTimeout(options.timeout)

  // Validate maxBuffer, if present.
  validateMaxBuffer(options.maxBuffer)

  var child = spawn(file, args, {
    cwd: options.cwd,
    env: options.env,
    gid: options.gid,
    uid: options.uid,
    shell: options.shell
  })

  var encoding = options.encoding
  var _stdout = []
  var _stderr = []

  var stdoutLen = 0
  var stderrLen = 0
  var killed = false
  var exited = false
  var timeoutId

  var ex = null

  var cmd = file

  function exithandler(code, signal) {
    if (exited) return
    exited = true

    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    if (!callback) return

    // merge chunks
    var stdout = handleData(
      NSData.dataWithData(_stdout.reduce(concatData, NSMutableData.data())),
      encoding
    )
    var stderr = handleData(
      NSData.dataWithData(_stderr.reduce(concatData, NSMutableData.data())),
      encoding
    )

    if (!ex && code === 0 && signal === null) {
      callback(null, stdout, stderr)
      return
    }

    if (args.length !== 0) {
      cmd += ' ' + args.join(' ')
    }

    if (!ex) {
      ex = new Error('Command failed: ' + cmd + '\n' + stderr)
      ex.killed = child.killed || killed
      ex.code = code
      ex.signal = signal
    }

    ex.cmd = cmd
    callback(ex, stdout, stderr)
  }

  function errorhandler(e) {
    ex = e

    exithandler()
  }

  function kill() {
    killed = true
    try {
      child.kill(options.killSignal)
    } catch (e) {
      ex = e
      exithandler()
    }
  }

  if (options.timeout > 0) {
    timeoutId = setTimeout(function delayedKill() {
      kill()
      timeoutId = null
    }, options.timeout)
  }

  if (child.stdout) {
    child.stdout.setEncoding('NSData')
    child.stdout.on('data', function onChildStdout(chunk) {
      stdoutLen += chunk.length()
      if (stdoutLen > options.maxBuffer) {
        ex = new Error('ERR_CHILD_PROCESS_STDIO_MAXBUFFER stdout')
        kill()
      } else {
        _stdout.push(chunk)
      }
    })
  }

  if (child.stderr) {
    child.stderr.setEncoding('NSData')
    child.stderr.on('data', function onChildStderr(chunk) {
      stderrLen += chunk.length()

      if (stderrLen > options.maxBuffer) {
        ex = new Error('ERR_CHILD_PROCESS_STDIO_MAXBUFFER stderr')
        kill()
      } else {
        _stderr.push(chunk)
      }
    })
  }

  child.addListener('close', exithandler)
  child.addListener('error', errorhandler)

  return child
}


/***/ }),

/***/ "./node_modules/@skpm/child_process/lib/execFileSync.js":
/*!**************************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/execFileSync.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var spawnSync = __webpack_require__(/*! ./spawnSync */ "./node_modules/@skpm/child_process/lib/spawnSync.js")

function validateTimeout(timeout) {
  if (timeout != null && !(Number.isInteger(timeout) && timeout >= 0)) {
    throw new Error('ERR_OUT_OF_RANGE options.timeout')
  }
}

function validateMaxBuffer(maxBuffer) {
  if (maxBuffer != null && !(typeof maxBuffer === 'number' && maxBuffer >= 0)) {
    throw new Error('ERR_OUT_OF_RANGE options.maxBuffer')
  }
}

module.exports = function execFileSync(file, args, options) {
  var defaultOptions = {
    encoding: 'buffer',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    cwd: null,
    env: null,
    shell: false
  }

  if (typeof args === 'object' && !Array.isArray(args)) {
    // function (file, options)
    options = Object.assign(defaultOptions, args)
    args = []
  } else {
    // function (file)
    options = Object.assign(defaultOptions, options || {})
  }

  // Validate the timeout, if present.
  validateTimeout(options.timeout)

  // Validate maxBuffer, if present.
  validateMaxBuffer(options.maxBuffer)

  var child = spawnSync(file, args, {
    cwd: options.cwd,
    env: options.env,
    gid: options.gid,
    uid: options.uid,
    shell: options.shell,
    encoding: options.encoding,
    stdio: ['pipe', 'pipe', 'inherit']
  })

  if (child.status !== 0) {
    var error = new Error('Failed to run: ' + String(child.stderr))
    error.pid = child.pid
    error.status = child.status
    error.stdout = child.stdout
    error.stderr = child.stderr
    throw error
  }

  return child.stdout
}


/***/ }),

/***/ "./node_modules/@skpm/child_process/lib/execSync.js":
/*!**********************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/execSync.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var execFileSync = __webpack_require__(/*! ./execFileSync */ "./node_modules/@skpm/child_process/lib/execFileSync.js")

function normalizeExecArgs(command, options) {
  // Make a shallow copy so we don't clobber the user's options object.
  options = Object.assign({}, options)
  options.shell = typeof options.shell === 'string' ? options.shell : true

  return {
    file: command,
    options: options
  }
}

module.exports = function execSync(command, options) {
  var opts = normalizeExecArgs(command, options)
  return execFileSync(opts.file, opts.options)
}


/***/ }),

/***/ "./node_modules/@skpm/child_process/lib/handleData.js":
/*!************************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/handleData.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(/*! buffer */ "buffer").Buffer

function handleBuffer(buffer, encoding) {
  if (encoding === 'buffer') {
    return buffer
  }
  if (encoding === 'NSData') {
    return buffer.toNSData()
  }
  return buffer.toString(encoding)
}

module.exports = function handleData(data, encoding) {
  var buffer = Buffer.from(data)

  return handleBuffer(buffer, encoding)
}


/***/ }),

/***/ "./node_modules/@skpm/child_process/lib/normalizeSpawnArguments.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/normalizeSpawnArguments.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function normalizeSpawnArguments(file, args, options) {
  if (typeof file !== 'string' || file.length === 0) {
    throw new Error('ERR_INVALID_ARG_TYPE')
  }

  if (Array.isArray(args)) {
    args = args.slice(0)
  } else if (
    args !== undefined &&
    (args === null || typeof args !== 'object')
  ) {
    throw new Error('ERR_INVALID_ARG_TYPE args')
  } else {
    options = args
    args = []
  }

  if (options === undefined) {
    options = {}
  } else if (options === null || typeof options !== 'object') {
    throw new Error('ERR_INVALID_ARG_TYPE options')
  }

  // Validate the cwd, if present.
  if (options.cwd != null && typeof options.cwd !== 'string') {
    throw new Error('ERR_INVALID_ARG_TYPE options.cwd')
  }

  // Validate detached, if present.
  if (options.detached != null && typeof options.detached !== 'boolean') {
    throw new Error('ERR_INVALID_ARG_TYPE options.detached')
  }

  // Validate the uid, if present.
  if (options.uid != null && !Number.isInteger(options.uid)) {
    throw new Error('ERR_INVALID_ARG_TYPE options.uid')
  }

  // Validate the gid, if present.
  if (options.gid != null && !Number.isInteger(options.gid)) {
    throw new Error('ERR_INVALID_ARG_TYPE options.gid')
  }

  // Validate the shell, if present.
  if (
    options.shell != null &&
    typeof options.shell !== 'boolean' &&
    typeof options.shell !== 'string'
  ) {
    throw new Error('ERR_INVALID_ARG_TYPE options.shell')
  }

  // Validate argv0, if present.
  if (options.argv0 != null && typeof options.argv0 !== 'string') {
    throw new Error('ERR_INVALID_ARG_TYPE options.argv0')
  }

  // Make a shallow copy so we don't clobber the user's options object.
  options = Object.assign({}, options)

  if (options.shell) {
    var command = [file].concat(args).join(' ')

    if (typeof options.shell === 'string') {
      file = options.shell
    } else {
      file = '/bin/bash'
    }
    args = ['-l', '-c', command]
  }

  if (typeof options.argv0 === 'string') {
    args.unshift(options.argv0)
  }

  var stdio = ['pipe', 'pipe', 'pipe']

  if (typeof options.stdio === 'string') {
    if (options.stdio === 'inherit') {
      stdio = [0, 1, 2]
    } else {
      stdio = [options.stdio, options.stdio, options.stdio]
    }
  } else if (Array.isArray(options.stdio)) {
    if (options.stdio[0] || options.stdio[0] === 0) {
      if (options.stdio[0] === 'inherit') {
        stdio[0] = 0
      } else {
        stdio[0] = options.stdio[0]
      }
    }
    if (options.stdio[1] || options.stdio[1] === 0) {
      if (options.stdio[1] === 'inherit') {
        stdio[1] = 1
      } else {
        stdio[1] = options.stdio[1]
      }
    }
    if (options.stdio[2] || options.stdio[2] === 0) {
      if (options.stdio[2] === 'inherit') {
        stdio[2] = 2
      } else {
        stdio[2] = options.stdio[2]
      }
    }
  }

  var env = options.env

  return {
    file: file,
    args: args,
    options: options,
    envPairs: env,
    stdio: stdio
  }
}


/***/ }),

/***/ "./node_modules/@skpm/child_process/lib/spawn.js":
/*!*******************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/spawn.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSPipe, NSTask, NSArray, NSString, coscript, __mocha__ */
var Buffer = __webpack_require__(/*! buffer */ "buffer").Buffer
var EventEmitter = __webpack_require__(/*! events */ "events")
var Readable = __webpack_require__(/*! stream */ "stream").Readable
var Writable = __webpack_require__(/*! stream */ "stream").Writable

var spawnSync = __webpack_require__(/*! ./spawnSync */ "./node_modules/@skpm/child_process/lib/spawnSync.js")
var normalizeSpawnArguments = __webpack_require__(/*! ./normalizeSpawnArguments */ "./node_modules/@skpm/child_process/lib/normalizeSpawnArguments.js")

module.exports = function spawn(_command, _args, _options) {
  var opts = normalizeSpawnArguments(_command, _args, _options)

  var result = new EventEmitter()

  if (opts.file[0] !== '.' && opts.file[0] !== '/' && opts.file[0] !== '~') {
    // means that someone refered to an executable that might be in the path, let's find it
    var whichChild = spawnSync(
      '/bin/bash',
      ['-l', '-c', 'which ' + opts.file],
      { encoding: 'utf8' }
    )
    var resolvedCommand = String(whichChild.stdout || '').trim()
    if (whichChild.err || !resolvedCommand.length) {
      result.stderr = new EventEmitter()
      result.stdout = new EventEmitter()

      result.pid = '-1'

      result.stderr.setEncoding = function setEncoding(encoding) {
        result.stderr.encoding = encoding
      }
      result.stdout.setEncoding = function setEncoding(encoding) {
        result.stdout.encoding = encoding
      }
      if (!resolvedCommand.length) {
        result.emit('error', new Error(String(opts.file) + ' ENOENT'))
      } else {
        result.emit('error', whichChild.err)
      }
      return result
    }
    return spawn(resolvedCommand, _args, _options)
  }

  var options = opts.options

  result.killed = false

  var fiber = coscript.createFiber()

  var task
  var signal = null

  var readingStderr = false
  var readingStdout = false

  result.stderr = new Readable({
    read: function read() {
      readingStderr = true
    }
  })
  result.stdout = new Readable({
    read: function read() {
      readingStdout = true
    }
  })

  function onStdout(data) {
    if (data && data.length() && readingStdout) {
      if (!result.stdout.push(Buffer.from(data))) {
        readingStdout = false
        task
          .standardOutput()
          .fileHandleForReading()
          .setReadabilityHandler(null)
      }
    }
  }
  function onStderr(data) {
    if (data && data.length() && readingStderr) {
      if (!result.stderr.push(Buffer.from(data))) {
        readingStderr = false
        task
          .standardError()
          .fileHandleForReading()
          .setReadabilityHandler(null)
      }
    }
  }

  result.sdtin = new Writable({
    write: function write(chunk, encoding, callback) {
      task
        .standardInput()
        .fileHandleForWriting()
        .writeData(chunk.toNSData())
      callback()
    },
    final: function finish(callback) {
      task
        .standardInput()
        .fileHandleForWriting()
        .closeFile()
      callback()
    }
  })

  result.sdtio = [result.sdtin, result.sdtout, result.sdterr]

  try {
    task = NSTask.alloc().init()

    var inPipe = NSPipe.pipe()
    var pipe = NSPipe.pipe()
    var errPipe = NSPipe.pipe()

    task.setStandardInput(inPipe)
    task.setStandardOutput(pipe)
    task.setStandardError(errPipe)

    task
      .standardOutput()
      .fileHandleForReading()
      .setReadabilityHandler(
        __mocha__.createBlock_function(
          'v16@?0@"NSFileHandle"8',
          function readStdOut(fileHandle) {
            try {
              onStdout(fileHandle.availableData())
            } catch (err) {
              if (
                typeof process !== 'undefined' &&
                process.listenerCount &&
                process.listenerCount('uncaughtException')
              ) {
                process.emit('uncaughtException', err, 'uncaughtException')
              } else {
                console.error(err)
              }
            }
          }
        )
      )
    task
      .standardError()
      .fileHandleForReading()
      .setReadabilityHandler(
        __mocha__.createBlock_function(
          'v16@?0@"NSFileHandle"8',
          function readStdOut(fileHandle) {
            try {
              onStderr(fileHandle.availableData())
            } catch (err) {
              if (
                typeof process !== 'undefined' &&
                process.listenerCount &&
                process.listenerCount('uncaughtException')
              ) {
                process.emit('uncaughtException', err, 'uncaughtException')
              } else {
                console.error(err)
              }
            }
          }
        )
      )

    task.setLaunchPath(
      NSString.stringWithString(opts.file).stringByExpandingTildeInPath()
    )
    task.arguments = NSArray.arrayWithArray(opts.args || [])
    if (opts.envPairs) {
      task.environment = opts.envPairs
    }
    if (options.cwd) {
      task.setCurrentDirectoryPath(
        NSString.stringWithString(options.cwd).stringByExpandingTildeInPath()
      )
    }

    task.setTerminationHandler(
      __mocha__.createBlock_function(
        'v16@?0@"NSTask"8',
        function handleTermination(_task) {
          try {
            _task
              .standardError()
              .fileHandleForReading()
              .setReadabilityHandler(null)
            _task
              .standardOutput()
              .fileHandleForReading()
              .setReadabilityHandler(null)
            result.stderr.emit('close')
            result.stdout.emit('close')

            result.killed = true

            result.emit('close', Number(_task.terminationStatus()), signal)
          } catch (err) {
            if (
              typeof process !== 'undefined' &&
              process.listenerCount &&
              process.listenerCount('uncaughtException')
            ) {
              process.emit('uncaughtException', err, 'uncaughtException')
            } else {
              console.error(err)
            }
          }
          fiber.cleanup()
        }
      )
    )

    task.launch()
  } catch (err) {
    fiber.cleanup()
    setImmediate(function() {
      result.emit('error', err)
    })
    return result
  }

  result.kill = function kill(_signal) {
    if (!result.killed) {
      signal = _signal
      task.terminate()
    }
  }

  result.pid = String(task.processIdentifier())

  return result
}


/***/ }),

/***/ "./node_modules/@skpm/child_process/lib/spawnSync.js":
/*!***********************************************************!*\
  !*** ./node_modules/@skpm/child_process/lib/spawnSync.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSPipe, NSTask, NSArray, NSString */
var handleData = __webpack_require__(/*! ./handleData */ "./node_modules/@skpm/child_process/lib/handleData.js")
var normalizeSpawnArguments = __webpack_require__(/*! ./normalizeSpawnArguments */ "./node_modules/@skpm/child_process/lib/normalizeSpawnArguments.js")

function spawnSync(_command, _args, _options) {
  var opts = normalizeSpawnArguments(_command, _args, _options)

  if (opts.file[0] !== '.' && opts.file[0] !== '/' && opts.file[0] !== '~') {
    // means that someone refered to an executable that might be in the path, let's find it
    var whichChild = spawnSync(
      '/bin/bash',
      ['-l', '-c', 'which ' + opts.file],
      { encoding: 'utf8' }
    )
    if (whichChild.err) {
      return whichChild
    }
    var resolvedCommand = String(whichChild.stdout).trim()
    if (!resolvedCommand.length) {
      return {
        err: new Error(String(opts.file) + ' ENOENT')
      }
    }
    return spawnSync(resolvedCommand, _args, _options)
  }

  var options = opts.options

  var pipe = NSPipe.pipe()
  var errPipe = NSPipe.pipe()

  try {
    var task = NSTask.alloc().init()
    task.setLaunchPath(
      NSString.stringWithString(opts.file).stringByExpandingTildeInPath()
    )
    task.arguments = NSArray.arrayWithArray(opts.args || [])
    if (opts.envPairs) {
      task.environment = opts.envPairs
    }

    if (options.cwd) {
      task.setCurrentDirectoryPath(
        NSString.stringWithString(options.cwd).stringByExpandingTildeInPath()
      )
    }

    task.setStandardOutput(pipe)
    task.setStandardError(errPipe)

    task.launch()
    task.waitUntilExit()

    var stdoutIgnored = false
    var stderrIgnored = false

    var data
    var stdoutValue
    var stderrValue

    if (opts.stdio[1] === 'ignored') {
      stdoutIgnored = true
    } else if (opts.stdio[1] === 1) {
      data = pipe.fileHandleForReading().readDataToEndOfFile()
      stdoutValue = handleData(data, options.encoding || 'buffer')
      console.log(stdoutValue)
    } else if (opts.stdio[1] === 2) {
      data = pipe.fileHandleForReading().readDataToEndOfFile()
      stdoutValue = handleData(data, options.encoding || 'buffer')
      console.error(stdoutValue)
    }

    if (opts.stdio[2] === 'ignored') {
      stderrIgnored = true
    } else if (opts.stdio[2] === 1) {
      data = errPipe.fileHandleForReading().readDataToEndOfFile()
      stderrValue = handleData(data, options.encoding || 'buffer')
      console.log(stderrValue)
    } else if (opts.stdio[2] === 2) {
      data = errPipe.fileHandleForReading().readDataToEndOfFile()
      stderrValue = handleData(data, options.encoding || 'buffer')
      console.error(stderrValue)
    }

    return {
      pid: String(task.processIdentifier()),
      status: Number(task.terminationStatus()),
      get stdout() {
        if (stdoutIgnored) {
          return null
        }
        if (stdoutValue) {
          return stdoutValue
        }
        data = pipe.fileHandleForReading().readDataToEndOfFile()
        return handleData(data, options.encoding || 'buffer')
      },
      get stderr() {
        if (stderrIgnored) {
          return null
        }
        if (stderrValue) {
          return stdoutValue
        }
        data = errPipe.fileHandleForReading().readDataToEndOfFile()
        return handleData(data, options.encoding || 'buffer')
      }
    }
  } catch (err) {
    return {
      err: err
    }
  }
}

module.exports = spawnSync


/***/ }),

/***/ "./src/send-to-queue-file.js":
/*!***********************************!*\
  !*** ./src/send-to-queue-file.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _send_to_queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./send-to-queue */ "./src/send-to-queue.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var queuePath = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getQueuePath"])();
  if (queuePath) Object(_send_to_queue__WEBPACK_IMPORTED_MODULE_1__["copySketch"])(queuePath, doc, false);
});

/***/ }),

/***/ "./src/send-to-queue.js":
/*!******************************!*\
  !*** ./src/send-to-queue.js ***!
  \******************************/
/*! exports provided: default, copySketch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copySketch", function() { return copySketch; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _skpm_child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @skpm/child_process */ "./node_modules/@skpm/child_process/index.js");
/* harmony import */ var _skpm_child_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_skpm_child_process__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var queuePath = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getQueuePath"])();
  if (queuePath) copySketch(queuePath, doc, true);
});
function copySketch(queuePath, doc, images) {
  var fileName;
  var path = queuePath;

  var _getFileAndQueueName = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getFileAndQueueName"])(doc, path);

  fileName = _getFileAndQueueName.fileName;
  queuePath = _getFileAndQueueName.queuePath;
  console.log("copy to queue:" + queuePath);

  if (queuePath.localeCompare(path) != 0) {
    Object(_skpm_child_process__WEBPACK_IMPORTED_MODULE_2__["spawnSync"])('mkdir', ["-p", queuePath], {
      shell: true
    });
  }

  if (images) Object(_utils__WEBPACK_IMPORTED_MODULE_1__["copyImages"])(queuePath, fileName, doc);
  var fromCopyFile = decodeURIComponent(doc.path);
  var toCopyFile = queuePath + fileName;
  var ret = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["copyFile"])(fromCopyFile, toCopyFile);

  if (!ret) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("😔 Some error occurs, see console for further details");
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Copied to Design Ops Queue ! 💚");
  }
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getFileAndQueueName, copyFile, generateArtboardImages, copyImages, getQueuePath, askQueuePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileAndQueueName", function() { return getFileAndQueueName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyFile", function() { return copyFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateArtboardImages", function() { return generateArtboardImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyImages", function() { return copyImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueuePath", function() { return getQueuePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "askQueuePath", function() { return askQueuePath; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _skpm_child_process__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @skpm/child_process */ "./node_modules/@skpm/child_process/index.js");
/* harmony import */ var _skpm_child_process__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_skpm_child_process__WEBPACK_IMPORTED_MODULE_1__);


function getFileAndQueueName(doc, queuePath) {
  var branch = "";
  var build = "";
  var fileName = decodeURIComponent(doc.path).replace(/^.*[\\\/]/, '').trim();
  var firstIndex = fileName.indexOf("(");
  var lastIndex = fileName.lastIndexOf(")");
  var betweenText = fileName.substr(0, firstIndex);

  if (firstIndex > 0 && lastIndex > 0 && lastIndex > firstIndex) {
    var withoutVersionPath = fileName.substr(0, firstIndex).trim() + ".sketch";
    var branchAndBuild = fileName.substr(firstIndex + 1, lastIndex - firstIndex - 1).trim();
    var items = branchAndBuild.split("@");

    if (items.length == 2) {
      branch = items[0].trim();
      build = items[1].trim();
      queuePath = queuePath + branch + "/" + build + "/";
      fileName = withoutVersionPath;
    }
  }

  return {
    fileName: fileName,
    queuePath: queuePath
  };
}
function copyFile(fromCopyFile, toCopyFile) {
  console.log("Copying " + fromCopyFile);
  console.log("To " + toCopyFile);
  var spawn = Object(_skpm_child_process__WEBPACK_IMPORTED_MODULE_1__["spawnSync"])('cp', ["'" + fromCopyFile + "'", "'" + toCopyFile + "'"], {
    shell: true
  });

  if (spawn.status > 0) {
    console.log(Error(spawn.stderr));
    return false;
  } else {
    return true;
  }
}
function generateArtboardImages(document, path) {
  var artboards = [];
  document.pages.forEach(function (page) {
    page.layers.forEach(function (layer) {
      // Get only artboards and skip if artboard name starts with underscore
      if (layer.type == 'Artboard' && !layer.name.startsWith('_')) {
        artboards.push(layer);
      }
    });
    var exportPath = path + page.name + '/';
    artboards.forEach(function (ab) {
      // Export PNG
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.export(ab, {
        output: exportPath
      });
    });
  });
}

var exportLayer = function exportLayer(layer, path) {
  if (layer.exportFormats && layer.exportFormats.length > 0) {
    var formats = new Array();
    var scales = new Array();
    var prefixes = new Array();
    layer.exportFormats.forEach(function (ef) {
      formats.push(ef.fileFormat);
      scales.push(ef.size);
    });
    if (layer.name) console.log("Exporting " + layer.name);
    var options = {
      output: path,
      formats: formats.join(","),
      scales: scales.join(","),
      prefixes: "md"
    };
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.export(layer, options);
  }

  if (layer.layers) {
    layer.layers.forEach(function (child) {
      return exportLayer(child, path);
    });
  }
};

function copyImages(queuePath, fileName, doc) {
  var imageFolder = queuePath + fileName.replace(".sketch", "Images");
  generateArtboardImages(doc, imageFolder);
  console.log("Images to :" + imageFolder);
  doc.pages.forEach(function (page) {
    page.layers.forEach(function (layer) {
      exportLayer(layer, imageFolder);
    });
  });
}
function getQueuePath() {
  var queuePath = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Settings.settingForKey("DesignOpsQueue");
  if (queuePath) return queuePath;
  return askQueuePath();
}
function askQueuePath() {
  var queuePath = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Settings.settingForKey("DesignOpsQueue");
  console.log("The actual queuePath is :" + queuePath);
  if (!(queuePath !== undefined)) queuePath = '/Volumes/cable/DesignOpsQueue/';
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.getInputFromUser("Where is the Design Ops Queue", {
    initialValue: queuePath
  }, function (err, value) {
    if (err) {
      return null;
    }

    console.log(value);
    queuePath = value;
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Settings.setSettingForKey("DesignOpsQueue", queuePath);
  });
  return queuePath;
}

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__send-to-queue-file.js.map