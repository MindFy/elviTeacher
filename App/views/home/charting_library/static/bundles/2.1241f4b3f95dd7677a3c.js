webpackJsonp([2], { 388(t, e, n) {
  let o,
    i,
    r; !(function (a, c) { i = [t, n(724)], o = c, void 0 !== (r = typeof o === 'function' ? o.apply(e, i) : o) && (t.exports = r) }(0, (t, e) => {
    function n(t) { return t && t.__esModule ? t : { default: t } } function o(t, e) { if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function') } let i = n(e),
      r = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (t) { return typeof t } : function (t) { return t && typeof Symbol === 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t },
      a = (function () {
        function t(t, e) {
          let n,
            o; for (n = 0; n < e.length; n++)o = e[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        } return function (e, n, o) { return n && t(e.prototype, n), o && t(e, o), e }
      }()),
      c = (function () {
        function t(e) { o(this, t), this.resolveOptions(e), this.initSelection() } return a(t, [{ key: 'resolveOptions', value() { const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = '' } }, { key: 'initSelection', value() { this.text ? this.selectFake() : this.target && this.selectTarget() } }, { key: 'selectFake',
          value() {
            let t,
              e = this,
              n = document.documentElement.getAttribute('dir') == 'rtl'; this.removeFake(), this.fakeHandlerCallback = function () { return e.removeFake() }, this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement('textarea'), this.fakeElem.style.fontSize = '12pt', this.fakeElem.style.border = '0', this.fakeElem.style.padding = '0', this.fakeElem.style.margin = '0', this.fakeElem.style.position = 'absolute', this.fakeElem.style[n ? 'right' : 'left'] = '-9999px', t = window.pageYOffset || document.documentElement.scrollTop, this.fakeElem.style.top = `${t}px`, this.fakeElem.setAttribute('readonly', ''), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
          } }, { key: 'removeFake', value() { this.fakeHandler && (this.container.removeEventListener('click', this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null) } }, { key: 'selectTarget', value() { this.selectedText = (0, i.default)(this.target), this.copyText() } }, { key: 'copyText', value() { let t = void 0; try { t = document.execCommand(this.action) } catch (e) { t = !1 } this.handleResult(t) } }, { key: 'handleResult', value(t) { this.emitter.emit(t ? 'success' : 'error', { action: this.action, text: this.selectedText, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) }) } }, { key: 'clearSelection', value() { this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges() } }, { key: 'destroy', value() { this.removeFake() } }, { key: 'action',
          set() {
            const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'copy'; if (this._action = t,
            this._action !== 'copy' && this._action !== 'cut') throw Error('Invalid "action" value, use either "copy" or "cut"')
          },
          get() { return this._action } }, { key: 'target', set(t) { if (void 0 !== t) { if (!t || (void 0 === t ? 'undefined' : r(t)) !== 'object' || t.nodeType !== 1) throw Error('Invalid "target" value, use a valid Element'); if (this.action === 'copy' && t.hasAttribute('disabled')) throw Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'); if (this.action === 'cut' && (t.hasAttribute('readonly') || t.hasAttribute('disabled'))) throw Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'); this._target = t } }, get() { return this._target } }]), t
      }()); t.exports = c
  }))
},
389(t, e, n) {
  let o,
    i,
    r; !(function (a, c) { i = [t, n(388), n(725), n(526)], o = c, void 0 !== (r = typeof o === 'function' ? o.apply(e, i) : o) && (t.exports = r) }(0, (t, e, n, o) => {
    function i(t) { return t && t.__esModule ? t : { default: t } } function r(t, e) { if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function') } function a(t, e) { if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !e || typeof e !== 'object' && typeof e !== 'function' ? t : e } function c(t, e) { if (typeof e !== 'function' && e !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof e}`); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e) } function u(t, e) { const n = `data-clipboard-${t}`; if (e.hasAttribute(n)) return e.getAttribute(n) } let l = i(e),
      s = i(n),
      f = i(o),
      h = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (t) { return typeof t } : function (t) { return t && typeof Symbol === 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t },
      d = (function () {
        function t(t, e) {
          let n,
            o; for (n = 0; n < e.length; n++)o = e[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        } return function (e, n, o) { return n && t(e.prototype, n), o && t(e, o), e }
      }()),
      p = (function (t) {
        function e(t, n) { r(this, e); const o = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this)); return o.resolveOptions(n), o.listenClick(t), o } return c(e, t), d(e, [{ key: 'resolveOptions', value() { const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; this.action = typeof t.action === 'function' ? t.action : this.defaultAction, this.target = typeof t.target === 'function' ? t.target : this.defaultTarget, this.text = typeof t.text === 'function' ? t.text : this.defaultText, this.container = h(t.container) === 'object' ? t.container : document.body } }, { key: 'listenClick', value(t) { const e = this; this.listener = (0, f.default)(t, 'click', t => e.onClick(t)) } }, { key: 'onClick', value(t) { const e = t.delegateTarget || t.currentTarget; this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l.default({ action: this.action(e), target: this.target(e), text: this.text(e), container: this.container, trigger: e, emitter: this }) } }, { key: 'defaultAction',
          value(t) {
            return u('action', t)
          } }, { key: 'defaultTarget', value(t) { const e = u('target', t); if (e) return document.querySelector(e) } }, { key: 'defaultText', value(t) { return u('text', t) } }, { key: 'destroy', value() { this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null) } }], [{ key: 'isSupported',
          value() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ['copy', 'cut'],
              e = typeof t === 'string' ? [t] : t,
              n = !!document.queryCommandSupported; return e.forEach((t) => { n = n && !!document.queryCommandSupported(t) }), n
          } }]), e
      }(s.default)); t.exports = p
  }))
},
485(t, e) {
  function n(t, e) { for (;t && t.nodeType !== i;) { if (typeof t.matches === 'function' && t.matches(e)) return t; t = t.parentNode } } var o,
    i = 9; typeof Element === 'undefined' || Element.prototype.matches || (o = Element.prototype, o.matches = o.matchesSelector || o.mozMatchesSelector || o.msMatchesSelector || o.oMatchesSelector || o.webkitMatchesSelector), t.exports = n
},
486(t, e, n) { function o(t, e, n, o, r) { const a = i.apply(this, arguments); return t.addEventListener(n, a, r), { destroy() { t.removeEventListener(n, a, r) } } } function i(t, e, n, o) { return function (n) { n.delegateTarget = r(n.target, e), n.delegateTarget && o.call(t, n) } } var r = n(485); t.exports = o },
525(t, e) { e.node = function (t) { return void 0 !== t && t instanceof HTMLElement && t.nodeType === 1 }, e.nodeList = function (t) { const n = Object.prototype.toString.call(t); return void 0 !== t && (n === '[object NodeList]' || n === '[object HTMLCollection]') && 'length' in t && (t.length === 0 || e.node(t[0])) }, e.string = function (t) { return typeof t === 'string' || t instanceof String }, e.fn = function (t) { return Object.prototype.toString.call(t) === '[object Function]' } },
526(t, e, n) {
  function o(t, e, n) { if (!t && !e && !n) throw Error('Missing required arguments'); if (!c.string(e)) throw new TypeError('Second argument must be a String'); if (!c.fn(n)) throw new TypeError('Third argument must be a Function'); if (c.node(t)) return i(t, e, n); if (c.nodeList(t)) return r(t, e, n); if (c.string(t)) return a(t, e, n); throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList') } function i(t, e, n) { return t.addEventListener(e, n), { destroy() { t.removeEventListener(e, n) } } } function r(t, e, n) { return Array.prototype.forEach.call(t, (t) => { t.addEventListener(e, n) }), { destroy() { Array.prototype.forEach.call(t, (t) => { t.removeEventListener(e, n) }) } } } function a(t, e, n) { return u(document.body, t, e, n) } var c = n(525),
    u = n(486); t.exports = o
},
724(t, e) {
  function n(t) {
    let e,
      n,
      o,
      i; return t.nodeName === 'SELECT' ? (t.focus(), e = t.value) : t.nodeName === 'INPUT' || t.nodeName === 'TEXTAREA' ? (n = t.hasAttribute('readonly'), n || t.setAttribute('readonly', ''), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute('readonly'), e = t.value) : (t.hasAttribute('contenteditable') && t.focus(), o = window.getSelection(), i = document.createRange(), i.selectNodeContents(t), o.removeAllRanges(), o.addRange(i), e = `${o}`), e
  }t.exports = n
},
725(t, e) {
  function n() {}n.prototype = { on(t, e, n) { const o = this.e || (this.e = {}); return (o[t] || (o[t] = [])).push({ fn: e, ctx: n }), this },
    once(t, e, n) { function o() { i.off(t, o), e.apply(n, arguments) } var i = this; return o._ = e, this.on(t, o, n) },
    emit(t) {
      let e = [].slice.call(arguments, 1),
        n = ((this.e || (this.e = {}))[t] || []).slice(),
        o = 0,
        i = n.length; for (o; o < i; o++)n[o].fn.apply(n[o].ctx, e); return this
    },
    off(t, e) {
      let n,
        o,
        i = this.e || (this.e = {}),
        r = i[t],
        a = []; if (r && e) for (n = 0, o = r.length; n < o; n++)r[n].fn !== e && r[n].fn._ !== e && a.push(r[n]); return a.length ? i[t] = a : delete i[t], this
    } }, t.exports = n
} })
