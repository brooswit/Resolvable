const NO_OP = require('NO_OP')

module.exports = class Resolvable {
  constructor (resolver = NO_OP) {
    this._internalPromise = new Promise((resolve, reject) => {
      this._didComplete = false
      this._didReject = false
      this._didResolve = false

      this._resolver = resolve
      this._rejecter = reject

      resolver(this.resolve, this.reject)
    })
  }

  then() {
    this._internalPromise.then.apply(this._internalPromise, arguments)
  }

  catch() {
    this._internalPromise.catch.apply(this._internalPromise, arguments)
  }

  resolve (value) {
    this._didComplete = true
    this._didResolve = true
    this._resolver(value)
  }

  reject (err) {
    this._didComplete = true
    this._didReject = true
    this._rejecter(err)
  }
  didComplete () {
    return this._didComplete
  }
  didResolve () {
    return this._didResolve
  }
  didReject () {
    return this._didReject
  }
}
