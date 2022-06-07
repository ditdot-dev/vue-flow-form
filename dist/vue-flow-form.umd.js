(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueFlowForm = {}, global.Vue));
})(this, (function (exports, require$$0) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

  /*!
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  // Language data store

  class LanguageModel {
    constructor(options) {
      this.enterKey = 'Enter';
      this.shiftKey = 'Shift';
      this.ok = 'OK';
      this.clear = 'Clear';
      this.continue = 'Continue';
      this.skip = 'Skip';
      this.pressEnter = 'Press :enterKey';
      this.multipleChoiceHelpText = 'Choose as many as you like';
      this.multipleChoiceHelpTextSingle = 'Choose only one answer';
      this.otherPrompt = 'Other';
      this.placeholder = 'Type your answer here...';
      this.submitText = 'Submit';
      this.longTextHelpText = ':shiftKey + :enterKey to make a line break.';
      this.prev = 'Prev';
      this.next = 'Next';
      this.percentCompleted = ':percent% completed';
      this.invalidPrompt = 'Please fill out the field correctly';
      this.thankYouText = 'Thank you!';
      this.successText = 'Your submission has been sent.';
      this.ariaOk = 'Press to continue';
      this.ariaClear = 'Press to clear your input';
      this.ariaRequired = 'This step is required';
      this.ariaPrev = 'Previous step';
      this.ariaNext = 'Next step';
      this.ariaSubmitText = 'Press to submit';
      this.ariaMultipleChoice = 'Press :letter to select';
      this.ariaTypeAnswer = 'Type your answer here';
      this.errorAllowedFileTypes = 'Invalid file type. Allowed file types: :fileTypes.';
      this.errorMaxFileSize = 'File(s) too large. Maximum allowed file size: :size.';
      this.errorMinFiles = 'Too few files added. Minimum allowed files: :min.';
      this.errorMaxFiles = 'Too many files added. Maximum allowed files: :max.';

      Object.assign(this, options || {});
    }

    /**
     * Inserts a new CSS class into the language model string to format the :string
     * Use it in a component's v-html directive: v-html="language.formatString(language.languageString)"
     */
    formatString(string, replacements) {
      return string.replace(/:(\w+)/g, (match, word) => {
        if (this[word]) {
          return '<span class="f-string-em">' + this[word] + '</span>'
        } else if (replacements && replacements[word]) {
          return replacements[word]
        }
        
        return match
      })
    }

    formatFileSize(bytes) {
      const
        units = ['B', 'kB', 'MB', 'GB', 'TB'],
        i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0;
        
      return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + units[i];
    }
  }

  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  // Global data store

  const QuestionType = Object.freeze({
    Date: "FlowFormDateType",
    Dropdown: "FlowFormDropdownType",
    Email: "FlowFormEmailType",
    File: "FlowFormFileType",
    LongText: "FlowFormLongTextType",
    MultipleChoice: "FlowFormMultipleChoiceType",
    MultiplePictureChoice: "FlowFormMultiplePictureChoiceType",
    Number: "FlowFormNumberType",
    Password: "FlowFormPasswordType",
    Phone: "FlowFormPhoneType",
    SectionBreak: "FlowFormSectionBreakType",
    Text: "FlowFormTextType",
    Url: "FlowFormUrlType",
    Matrix: "FlowFormMatrixType",
    Slider: "FlowFormSliderType",
  });

  Object.freeze({
    label: "",
    value: "",
    disabled: true,
  });

  const MaskPresets = Object.freeze({
    Date: "##/##/####",
    DateIso: "####-##-##",
    PhoneUs: "(###) ###-####",
  });

  class ChoiceOption {
    constructor(options) {
      this.label = "";
      this.value = null;
      this.selected = false;
      this.imageSrc = null;
      this.imageAlt = null;

      Object.assign(this, options);
    }

    choiceLabel() {
      return this.label || this.value
    }

    choiceValue() {
      // Returns the value if it's anything other than the default (null).
      if (this.value !== null) {
        return this.value
      }

      // Returns any other non-empty property if the value has not been set.
      return this.label || this.imageAlt || this.imageSrc
    }

    toggle() {
      this.selected = !this.selected;
    }
  }

  class LinkOption {
    constructor(options) {
      this.url = "";
      this.text = "";
      this.target = "_blank";

      Object.assign(this, options);
    }
  }

  class MatrixColumn {
    constructor(options) {
      this.value = "";
      this.label = "";

      Object.assign(this, options);
    }
  }

  class MatrixRow {
    constructor(options) {
      this.id = "";
      this.label = "";

      Object.assign(this, options);
    }
  }

  class MarkOption {
    constructor(options) {
      this.value = "";
      this.label = "";

      Object.assign(this, options);
    }
  }

  class QuestionModel {
    constructor(options) {
      // Make sure the options variable is an object
      options = options || {};

      this.id = null;
      this.answer = null;
      this.answered = false;
      this.index = 0;
      this.options = [];
      this.description = "";
      this.className = "";
      this.type = null;
      this.html = null;
      this.required = false;
      this.jump = null;
      this.placeholder = null;
      this.mask = "";
      this.multiple = false;
      this.allowOther = false;
      this.other = null;
      this.language = null;
      this.tagline = null;
      this.title = null;
      this.subtitle = null;
      this.content = null;
      this.inline = false;
      this.helpText = null;
      this.helpTextShow = true;
      this.descriptionLink = [];
      this.min = null;
      this.max = null;
      this.maxLength = null;
      this.nextStepOnAnswer = false;
      this.accept = null;
      this.maxSize = null;
      this.rows = [];
      this.columns = [];
      this.marks = [];

      Object.assign(this, options);

      // Sets default mask and placeholder value on PhoneType question
      if (this.type === QuestionType.Phone) {
        if (!this.mask) {
          this.mask = MaskPresets.Phone;
        }
        if (!this.placeholder) {
          this.placeholder = this.mask;
        }
      }

      if (this.type === QuestionType.Url) {
        this.mask = null;
      }

      if (this.type === QuestionType.Date && !this.placeholder) {
        this.placeholder = "yyyy-mm-dd";
      }

      if (
        this.type !== QuestionType.Matrix &&
        this.multiple &&
        !Array.isArray(this.answer)
      ) {
        this.answer = this.answer ? [this.answer] : [];
      }

      // Check if we have an answer already (when we have a pre-filled form)
      // and set the answered property accordingly
      if (!this.required && typeof options.answer !== "undefined") {
        this.answered = true;
      } else if (this.answer && (!this.multiple || this.answer.length)) {
        this.answered = true;
      }

      this.resetOptions();
    }

    getJumpId() {
      let nextId = null;

      if (typeof this.jump === "function") {
        nextId = this.jump.call(this);
      } else if (this.jump[this.answer]) {
        nextId = this.jump[this.answer];
      } else if (this.jump["_other"]) {
        nextId = this.jump["_other"];
      }

      return nextId
    }

    setAnswer(answer) {
      if (this.type === QuestionType.Number && answer !== "" && !isNaN(+answer)) {
        answer = +answer;
      }

      this.answer = answer;
    }

    setIndex(index) {
      if (!this.id) {
        this.id = "q_" + index;
      }

      this.index = index;
    }

    resetOptions() {
      if (this.options) {
        const isArray = Array.isArray(this.answer);
        let numSelected = 0;

        this.options.forEach((o) => {
          const optionValue = o.choiceValue();

          if (
            this.answer === optionValue ||
            (isArray && this.answer.indexOf(optionValue) !== -1)
          ) {
            o.selected = true
            ;++numSelected;
          } else {
            o.selected = false;
          }
        });

        if (this.allowOther) {
          let otherAnswer = null;

          if (isArray) {
            if (this.answer.length && this.answer.length !== numSelected) {
              otherAnswer = this.answer[this.answer.length - 1];
            }
          } else if (
            this.options.map((o) => o.choiceValue()).indexOf(this.answer) === -1
          ) {
            otherAnswer = this.answer;
          }

          if (otherAnswer !== null) {
            this.other = otherAnswer;
          }
        }
      }
    }

    resetAnswer() {
      this.answered = false;
      this.answer = this.multiple ? [] : null;
      this.other = null;

      this.resetOptions();
    }

    isMultipleChoiceType() {
      return [
        QuestionType.MultipleChoice,
        QuestionType.MultiplePictureChoice,
      ].includes(this.type)
    }
  }

  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  let
    isIos = false,
    isMobile = false;

  if (typeof navigator !== 'undefined' && typeof document !== 'undefined') {
    // Simple mobile device/tablet detection
    isIos = navigator.userAgent.match(/iphone|ipad|ipod/i) || (navigator.userAgent.indexOf('Mac') !== -1 && 'ontouchend' in document);
    isMobile = isIos || navigator.userAgent.match(/android/i);
  }

  // Mixin that adds `isMobile` and `isIos` data variables
  const IsMobile = {
    data() {
      return {
        isIos,
        isMobile
      }
    }
  };

  var script$k = {
      name: 'FlowFormBaseType',

      props: {
        language: LanguageModel,
        question: QuestionModel,
        active: Boolean,
        disabled: Boolean,
        modelValue: [String, Array, Boolean, Number, Object]
      },

      mixins: [
        IsMobile,
      ],

      data() {
        return {
          dirty: false,
          dataValue: null,
          answer: null,
          enterPressed: false,
          allowedChars: null,
          alwaysAllowedKeys: ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'],
          focused: false,
          canReceiveFocus: false,
          errorMessage: null
        }
      },

      mounted() {
        if (this.question.answer) {
          this.dataValue = this.answer = this.question.answer;
        } else if (this.question.multiple) {
          this.dataValue = [];
        }
      },

      methods: {
        /**
         * This method can be overriden in custom components to 
         * change the answer before going through validation.
         */
        fixAnswer(answer) {
          return answer
        },

        getElement() {
          let el = this.$refs.input;

          // Sometimes the input is nested so we need to find it
          while (el && el.$el) {
            el = el.$el;
          }

          return el
        },

        setFocus() {
          this.focused = true;
        },

        // eslint-disable-next-line no-unused-vars
        unsetFocus($event) {
          this.focused = false;
        },

        focus() {
          if (!this.focused) {
            const el = this.getElement();

            el && el.focus();
          }
        },

        blur() {
          const el = this.getElement();

          el && el.blur();
        },

        onKeyDown($event) {
          this.enterPressed = false;
          clearTimeout(this.timeoutId);

          if ($event) {
            if ($event.key === 'Enter' && !$event.shiftKey) {
              this.unsetFocus();
            }

            if (this.allowedChars !== null) {
              // Check if the entered character is allowed.
              // We always allow keys from the alwaysAllowedKeys array.
              if (this.alwaysAllowedKeys.indexOf($event.key) === -1 && this.allowedChars.indexOf($event.key) === -1) {
                $event.preventDefault();
              }
            }
          }
        },

        onChange($event) {
          this.dirty = true;
          this.dataValue = $event.target.value;

          this.onKeyDown();
          this.setAnswer(this.dataValue);
        },

        onEnter() {
          this._onEnter();
        },

        _onEnter() {
          this.enterPressed = true;

          this.dataValue = this.fixAnswer(this.dataValue);
          this.setAnswer(this.dataValue);
          this.isValid() ? this.blur() : this.focus();
        },

        setAnswer(answer) {
          this.question.setAnswer(answer);

          this.answer = this.question.answer;
          this.question.answered = this.isValid();

          this.$emit('update:modelValue', this.answer);
        },

        showInvalid() {
          return this.dirty && this.enterPressed && !this.isValid()
        },

        isValid() {
          if (!this.question.required && !this.hasValue && this.dirty) {
            return true
          }

          if (this.validate()) {
            return true
          }

          return false
        },
        
        /**
         * This method validates the input and is meant to be overriden
         * in custom question types.
         */
        validate() {
          return !this.question.required || this.hasValue
        }
      },
      
      computed: {
        placeholder() {
          return this.question.placeholder || this.language.placeholder
        },

        hasValue() {
          if (this.dataValue !== null) {
            let v = this.dataValue;

            if (v.trim) {
              // Don't allow empty strings
              return v.trim().length > 0
            }

            if (Array.isArray(v)) {
              // Don't allow empty arrays
              return v.length > 0
            }

            // All other non-null values are allowed to pass through
            return true
          }

          return false
        }
      }
    };

  script$k.__file = "src/components/QuestionTypes/BaseType.vue";

  var script$j = {
      extends: script$k,

      name: QuestionType.Dropdown,

      computed: {
        answerLabel() {
          for (let i = 0; i < this.question.options.length; i++) {
            let option = this.question.options[i];

            if (option.choiceValue() === this.dataValue) {
              return option.choiceLabel()
            }
          }

          return this.question.placeholder
        }
      },

      methods: {
        onKeyDownListener($event) {
          if ($event.key === 'ArrowDown' || $event.key === 'ArrowUp') {
            this.setAnswer(this.dataValue);
          } else if ($event.key === 'Enter' && this.hasValue) {
            this.focused = false;
            this.blur();
          }
        },
        
        onKeyUpListener($event) {
          if ($event.key === 'Enter' && this.isValid() && !this.disabled) {
            $event.stopPropagation();
            this._onEnter();
            this.$emit('next');
          }
        }
      }
    };

  const _hoisted_1$9 = { class: "faux-form" };
  const _hoisted_2$7 = ["value", "required"];
  const _hoisted_3$4 = {
    key: 0,
    label: " ",
    value: "",
    disabled: "",
    selected: "",
    hidden: ""
  };
  const _hoisted_4$4 = ["disabled", "value"];
  const _hoisted_5$4 = /*#__PURE__*/require$$0.createElementVNode("span", { class: "f-arrow-down" }, [
    /*#__PURE__*/require$$0.createElementVNode("svg", {
      version: "1.1",
      id: "Capa_1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      x: "0px",
      y: "0px",
      viewBox: "-163 254.1 284.9 284.9",
      style: "",
      "xml:space": "preserve"
    }, [
      /*#__PURE__*/require$$0.createElementVNode("g", null, [
        /*#__PURE__*/require$$0.createElementVNode("path", { d: "M119.1,330.6l-14.3-14.3c-1.9-1.9-4.1-2.9-6.6-2.9c-2.5,0-4.7,1-6.6,2.9L-20.5,428.5l-112.2-112.2c-1.9-1.9-4.1-2.9-6.6-2.9c-2.5,0-4.7,0.9-6.6,2.9l-14.3,14.3c-1.9,1.9-2.9,4.1-2.9,6.6c0,2.5,1,4.7,2.9,6.6l133,133c1.9,1.9,4.1,2.9,6.6,2.9s4.7-1,6.6-2.9l133.1-133c1.9-1.9,2.8-4.1,2.8-6.6C121.9,334.7,121,332.5,119.1,330.6z" })
      ])
    ])
  ], -1 /* HOISTED */);

  function render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_1$9, [
      require$$0.createElementVNode("select", {
        ref: "input",
        class: "",
        value: _ctx.dataValue,
        onChange: _cache[0] || (_cache[0] = (...args) => (_ctx.onChange && _ctx.onChange(...args))),
        onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeyDownListener && $options.onKeyDownListener(...args))),
        onKeyup: _cache[2] || (_cache[2] = (...args) => ($options.onKeyUpListener && $options.onKeyUpListener(...args))),
        required: _ctx.question.required
      }, [
        (_ctx.question.required)
          ? (require$$0.openBlock(), require$$0.createElementBlock("option", _hoisted_3$4, " "))
          : require$$0.createCommentVNode("v-if", true),
        (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(_ctx.question.options, (option, index) => {
          return (require$$0.openBlock(), require$$0.createElementBlock("option", {
            disabled: option.disabled,
            value: option.choiceValue(),
            key: 'o' + index
          }, require$$0.toDisplayString(option.choiceLabel()), 9 /* TEXT, PROPS */, _hoisted_4$4))
        }), 128 /* KEYED_FRAGMENT */))
      ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$7),
      require$$0.createElementVNode("span", null, [
        require$$0.createElementVNode("span", {
          class: require$$0.normalizeClass(["f-empty", {'f-answered': this.question.answer && this.question.answered}])
        }, require$$0.toDisplayString($options.answerLabel), 3 /* TEXT, CLASS */),
        _hoisted_5$4
      ])
    ]))
  }

  script$j.render = render$b;
  script$j.__file = "src/components/QuestionTypes/DropdownType.vue";

  function maskit (value, mask, masked = true, tokens) {
    value = value || '';
    mask = mask || '';
    var iMask = 0;
    var iValue = 0;
    var output = '';
    while (iMask < mask.length && iValue < value.length) {
      var cMask = mask[iMask];
      var masker = tokens[cMask];
      var cValue = value[iValue];
      if (masker && !masker.escape) {
        if (masker.pattern.test(cValue)) {
        	output += masker.transform ? masker.transform(cValue) : cValue;
          iMask++;
        }
        iValue++;
      } else {
        if (masker && masker.escape) {
          iMask++; // take the next mask char and treat it as char
          cMask = mask[iMask];
        }
        if (masked) output += cMask;
        if (cValue === cMask) iValue++; // user typed the same char
        iMask++;
      }
    }

    // fix mask that ends with a char: (#)
    var restOutput = '';
    while (iMask < mask.length && masked) {
      var cMask = mask[iMask];
      if (tokens[cMask]) {
        restOutput = '';
        break
      }
      restOutput += cMask;
      iMask++;
    }

    return output + restOutput
  }

  function dynamicMask (maskit, masks, tokens) {
    masks = masks.sort((a, b) => a.length - b.length);
    return function (value, mask, masked = true) {
      var i = 0;
      while (i < masks.length) {
        var currentMask = masks[i];
        i++;
        var nextMask = masks[i];
        if (! (nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length) ) {
          return maskit(value, currentMask, masked, tokens)
        }
      }
      return '' // empty masks
    }
  }

  // Facade to maskit/dynamicMask when mask is String or Array
  function masker (value, mask, masked = true, tokens) {
    return Array.isArray(mask)
           ? dynamicMask(maskit, mask, tokens)(value, mask, masked, tokens)
           : maskit(value, mask, masked, tokens)
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var tokens = {
    '#': {pattern: /\d/},
    'X': {pattern: /[0-9a-zA-Z]/},
    'S': {pattern: /[a-zA-Z]/},
    'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
    'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
    '!': {escape: true}
  };

  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
  function event (name) {
    var evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
    return evt
  }

  function mask (el, binding) {
    var config = binding.value;
    if (Array.isArray(config) || typeof config === 'string') {
      config = {
        mask: config,
        tokens: tokens
      };
    }

    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
      var els = el.getElementsByTagName('input');
      if (els.length !== 1) {
        throw new Error("v-mask directive requires 1 input, found " + els.length)
      } else {
        el = els[0];
      }
    }

    el.oninput = function (evt) {
      if (!evt.isTrusted) return // avoid infinite loop
      /* other properties to try to diferentiate InputEvent of Event (custom)
      InputEvent (native)
        cancelable: false
        isTrusted: true

        composed: true
        isComposing: false
        which: 0

      Event (custom)
        cancelable: true
        isTrusted: false
      */
      // by default, keep cursor at same position as before the mask
      var position = el.selectionEnd;
      // save the character just inserted
      var digit = el.value[position-1];
      el.value = masker(el.value, config.mask, true, config.tokens);
      // if the digit was changed, increment position until find the digit again
      while (position < el.value.length && el.value.charAt(position-1) !== digit) {
        position++;
      }
      if (el === document.activeElement) {
        el.setSelectionRange(position, position);
        setTimeout(function () {
          el.setSelectionRange(position, position);
        }, 0);
      }
      el.dispatchEvent(event('input'));
    };

    var newDisplay = masker(el.value, config.mask, true, config.tokens);
    if (newDisplay !== el.value) {
      el.value = newDisplay;
      el.dispatchEvent(event('input'));
    }
  }

  var script$i = {
    name: 'TheMask',
    props: {
      value: [String, Number],
      mask: {
        type: [String, Array],
        required: true
      },
      masked: { // by default emits the value unformatted, change to true to format with the mask
        type: Boolean,
        default: false // raw
      },
      tokens: {
        type: Object,
        default: () => tokens
      }
    },
    directives: {mask},
    data () {
      return {
        lastValue: null, // avoid unecessary emit when has no change
        display: this.value
      }
    },
    watch : {
      value (newValue) {
        if (newValue !== this.lastValue) {
          this.display = newValue;
        }
      },
      masked () {
        this.refresh(this.display);
      }
    },
    computed: {
      config () {
        return {
          mask: this.mask,
          tokens: this.tokens,
          masked: this.masked
        }
      }
    },
    methods: {
      onInput (e) {
        if (e.isTrusted) return // ignore native event
        this.refresh(e.target.value);
      },

      refresh (value) {
        this.display = value;
        var value = masker(value, this.mask, this.masked, this.tokens);
        if (value !== this.lastValue) {
          this.lastValue = value;
          this.$emit('input', value);
        }
      }
    }
  };

  const _hoisted_1$8 = ["value"];

  function render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _directive_mask = require$$0.resolveDirective("mask");

    return require$$0.withDirectives((require$$0.openBlock(), require$$0.createElementBlock("input", {
      type: "text",
      value: $data.display,
      onInput: _cache[0] || (_cache[0] = (...args) => ($options.onInput && $options.onInput(...args)))
    }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$8)), [
      [_directive_mask, $options.config]
    ])
  }

  script$i.render = render$a;
  script$i.__file = "node_modules/vue-the-mask/src/component.vue";

  var script$h = {
    extends: script$k,
    name: QuestionType.Text,
    components: {
      TheMask: script$i,
    },

    data() {
      return {
        inputType: "text",
        canReceiveFocus: true,
      };
    },

    methods: {
      validate() {
        if (this.question.mask && this.hasValue) {
          return this.validateMask();
        }

        return !this.question.required || this.hasValue;
      },

      validateMask() {
        if (Array.isArray(this.question.mask)) {
          return this.question.mask.some(
            (mask) => mask.length === this.dataValue.length
          );
        }

        return this.dataValue.length === this.question.mask.length;
      },
    },
  };

  const _hoisted_1$7 = ["data-placeholder"];
  const _hoisted_2$6 = ["type", "value", "required", "min", "max", "placeholder", "maxlength"];

  function render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_the_mask = require$$0.resolveComponent("the-mask");

    return (require$$0.openBlock(), require$$0.createElementBlock("span", {
      "data-placeholder": $data.inputType === 'date' ? _ctx.placeholder : null
    }, [
      (_ctx.question.mask)
        ? (require$$0.openBlock(), require$$0.createBlock(_component_the_mask, {
            key: 0,
            ref: "input",
            mask: _ctx.question.mask,
            masked: false,
            type: $data.inputType,
            value: _ctx.modelValue,
            required: _ctx.question.required,
            onKeydown: _ctx.onKeyDown,
            onKeyup: [
              _ctx.onChange,
              require$$0.withKeys(require$$0.withModifiers(_ctx.onEnter, ["prevent"]), ["enter"]),
              require$$0.withKeys(require$$0.withModifiers(_ctx.onEnter, ["prevent"]), ["tab"])
            ],
            onFocus: _ctx.setFocus,
            onBlur: _ctx.unsetFocus,
            placeholder: _ctx.placeholder,
            min: _ctx.question.min,
            max: _ctx.question.max,
            onChange: _ctx.onChange
          }, null, 8 /* PROPS */, ["mask", "type", "value", "required", "onKeydown", "onKeyup", "onFocus", "onBlur", "placeholder", "min", "max", "onChange"]))
        : (require$$0.openBlock(), require$$0.createElementBlock("input", {
            key: 1,
            ref: "input",
            type: $data.inputType,
            value: _ctx.modelValue,
            required: _ctx.question.required,
            onKeydown: _cache[0] || (_cache[0] = (...args) => (_ctx.onKeyDown && _ctx.onKeyDown(...args))),
            onKeyup: [
              _cache[1] || (_cache[1] = (...args) => (_ctx.onChange && _ctx.onChange(...args))),
              _cache[2] || (_cache[2] = require$$0.withKeys(require$$0.withModifiers((...args) => (_ctx.onEnter && _ctx.onEnter(...args)), ["prevent"]), ["enter"])),
              _cache[3] || (_cache[3] = require$$0.withKeys(require$$0.withModifiers((...args) => (_ctx.onEnter && _ctx.onEnter(...args)), ["prevent"]), ["tab"]))
            ],
            onFocus: _cache[4] || (_cache[4] = (...args) => (_ctx.setFocus && _ctx.setFocus(...args))),
            onBlur: _cache[5] || (_cache[5] = (...args) => (_ctx.unsetFocus && _ctx.unsetFocus(...args))),
            min: _ctx.question.min,
            max: _ctx.question.max,
            onChange: _cache[6] || (_cache[6] = (...args) => (_ctx.onChange && _ctx.onChange(...args))),
            placeholder: _ctx.placeholder,
            maxlength: _ctx.question.maxLength
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$6))
    ], 8 /* PROPS */, _hoisted_1$7))
  }

  script$h.render = render$9;
  script$h.__file = "src/components/QuestionTypes/TextType.vue";

  var script$g = {
      extends: script$h,
      name: QuestionType.Email,
      data() {
        return {
          inputType: 'email'
        }
      },
      methods: {
        validate() {
          if (this.hasValue) {
            return /^[^@]+@.+[^.]$/.test(this.dataValue)
          }

          return !this.question.required
        }
      }
    };

  script$g.__file = "src/components/QuestionTypes/EmailType.vue";

  var script$f = {
    name: 'TextareaAutosize',
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      autosize: {
        type: Boolean,
        default: true
      },
      minHeight: {
        type: [Number],
        'default': null
      },
      maxHeight: {
        type: [Number],
        'default': null
      },
      /*
       * Force !important for style properties
       */
      important: {
        type: [Boolean, Array],
        default: false
      }
    },
    data () {
      return {
        // data property for v-model binding with real textarea tag
        val: null,
        // works when content height becomes more then value of the maxHeight property
        maxHeightScroll: false,
        height: 'auto'
      }
    },
    computed: {
      computedStyles () {
        if (!this.autosize) return {}
        return {
          resize: !this.isResizeImportant ? 'none' : 'none !important',
          height: this.height,
          overflow: this.maxHeightScroll ? 'auto' : (!this.isOverflowImportant ? 'hidden' : 'hidden !important')
        }
      },
      isResizeImportant () {
        const imp = this.important;
        return imp === true || (Array.isArray(imp) && imp.includes('resize'))
      },
      isOverflowImportant () {
        const imp = this.important;
        return imp === true || (Array.isArray(imp) && imp.includes('overflow'))
      },
      isHeightImportant () {
        const imp = this.important;
        return imp === true || (Array.isArray(imp) && imp.includes('height'))
      }
    },
    watch: {
      value (val) {
        this.val = val;
      },
      val (val) {
        this.$nextTick(this.resize);
        this.$emit('input', val);
      },
      minHeight () {
        this.$nextTick(this.resize);
      },
      maxHeight () {
        this.$nextTick(this.resize);
      },
      autosize (val) {
        if (val) this.resize();
      }
    },
    methods: {
      resize () {
        const important = this.isHeightImportant ? 'important' : '';
        this.height = `auto${important ? ' !important' : ''}`;
        this.$nextTick(() => {
          let contentHeight = this.$el.scrollHeight + 1;

          if (this.minHeight) {
            contentHeight = contentHeight < this.minHeight ? this.minHeight : contentHeight;
          }

          if (this.maxHeight) {
            if (contentHeight > this.maxHeight) {
              contentHeight = this.maxHeight;
              this.maxHeightScroll = true;
            } else {
              this.maxHeightScroll = false;
            }
          }

          const heightVal = contentHeight + 'px';
          this.height = `${heightVal}${important ? ' !important' : ''}`;
        });

        return this
      }
    },
    created () {
      this.val = this.value;
    },
    mounted () {
      this.resize();
    }
  };

  function render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return require$$0.withDirectives((require$$0.openBlock(), require$$0.createElementBlock("textarea", {
      style: require$$0.normalizeStyle($options.computedStyles),
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.val) = $event)),
      onFocus: _cache[1] || (_cache[1] = (...args) => ($options.resize && $options.resize(...args)))
    }, null, 36 /* STYLE, HYDRATE_EVENTS */)), [
      [require$$0.vModelText, $data.val]
    ])
  }

  script$f.render = render$8;
  script$f.__file = "node_modules/vue-textarea-autosize/src/components/TextareaAutosize.vue";

  var script$e = {
      extends: script$k,

      name: QuestionType.LongText,

      components: {
        TextareaAutosize: script$f
      },

      data () {
        return {
          canReceiveFocus: true
        }
      },

      mounted() {
        window.addEventListener('resize', this.onResizeListener);
      },

      beforeUnmount() {
        window.removeEventListener('resize', this.onResizeListener);
      },

      methods: {
        onResizeListener() {
          this.$refs.input.resize();
        },

        unsetFocus($event) {
          if ($event || !this.isMobile) {
            this.focused = false;
          }
        },

        onEnterDown($event) {
          if (!this.isMobile) {
            $event.preventDefault();
          }
        },

        onEnter() {
          this._onEnter();
          
          if (this.isMobile) {
            this.focus();
          }
        }
      }
    };

  function render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_textarea_autosize = require$$0.resolveComponent("textarea-autosize");

    return (require$$0.openBlock(), require$$0.createElementBlock("span", null, [
      require$$0.createVNode(_component_textarea_autosize, {
        ref: "input",
        rows: "1",
        value: _ctx.modelValue,
        required: _ctx.question.required,
        onKeydown: [
          _ctx.onKeyDown,
          require$$0.withKeys(require$$0.withModifiers($options.onEnterDown, ["exact"]), ["enter"])
        ],
        onKeyup: [
          _ctx.onChange,
          require$$0.withKeys(require$$0.withModifiers($options.onEnter, ["exact","prevent"]), ["enter"]),
          require$$0.withKeys(require$$0.withModifiers($options.onEnter, ["prevent"]), ["tab"])
        ],
        onFocus: _ctx.setFocus,
        onBlur: $options.unsetFocus,
        placeholder: _ctx.placeholder,
        maxlength: _ctx.question.maxLength
      }, null, 8 /* PROPS */, ["value", "required", "onKeydown", "onKeyup", "onFocus", "onBlur", "placeholder", "maxlength"])
    ]))
  }

  script$e.render = render$7;
  script$e.__file = "src/components/QuestionTypes/LongTextType.vue";

  var script$d = {
      extends: script$k,
      name: QuestionType.MultipleChoice,

      data() {
        return {
          editingOther: false,
          hasImages: false
        }
      },

      mounted() {
        this.addKeyListener();
      },

      beforeUnmount() {
        this.removeKeyListener();
      },

      watch: {
        active(value) {
          if (value) {
            this.addKeyListener();

            if (this.question.multiple && this.question.answered) {
              this.enterPressed = false;
            }
          } else {
            this.removeKeyListener();
          }
        }
      },
      
      methods: {
        addKeyListener() {
          this.removeKeyListener();
          document.addEventListener('keyup', this.onKeyListener);
        },

        removeKeyListener() {
          document.removeEventListener('keyup', this.onKeyListener);
        },

        /**
         * Listens for keyboard events (A, B, C, ...)
         */
        onKeyListener($event) {
          if (this.active && !this.editingOther && $event.key && $event.key.length === 1) {
            let keyCode = $event.key.toUpperCase().charCodeAt(0);

            if (keyCode >= 65 && keyCode <= 90) {
              let index = keyCode - 65;

              if (index > -1) {
                let option = this.question.options[index];

                if (option) {
                  this.toggleAnswer(option);
                } else if (this.question.allowOther && index === this.question.options.length) {
                  this.startEditOther();
                }
              }
            }
          }
        },

        getLabel(index) {
          return this.language.ariaMultipleChoice.replace(':letter', this.getToggleKey(index))
        },

        getToggleKey(index) {
          const key = 65 + index;

          if (key <= 90) {
            return String.fromCharCode(key)
          }

          return ''
        },

        toggleAnswer(option) {
          if (!this.question.multiple) {
            if (this.question.allowOther) {
              this.question.other = this.dataValue = null;
              this.setAnswer(this.dataValue);
            }

            for (let i = 0; i < this.question.options.length; i++) {
              let o = this.question.options[i];

              if (o.selected) {
                this._toggleAnswer(o);
              }
            }
          }

          this._toggleAnswer(option);
        },

        _toggleAnswer(option) {
          const optionValue = option.choiceValue();

          option.toggle();

          if (this.question.multiple) {
            this.enterPressed = false;

            if (!option.selected) {
              this._removeAnswer(optionValue);
            } else if (this.dataValue.indexOf(optionValue) === -1) {
              this.dataValue.push(optionValue);
            }
          } else {
            this.dataValue = option.selected ? optionValue : null;
          }

        
          if (this.isValid() && this.question.nextStepOnAnswer && !this.question.multiple && !this.disabled) {
            this.$emit('next');
          }

          this.setAnswer(this.dataValue);
        },

        _removeAnswer(value) {
          const index = this.dataValue.indexOf(value);

          if (index !== -1) {
            this.dataValue.splice(index, 1);
          }
        },

        startEditOther() {
          this.editingOther = true;
          this.enterPressed = false;

          this.$nextTick(() => {
            this.$refs.otherInput.focus();
          });
        },

        onChangeOther() {
          if (this.editingOther) {
            let
              value = [],
              self = this;

            this.question.options.forEach(function(option) {
              if (option.selected) {
                if (self.question.multiple) {
                  value.push(option.choiceValue());
                } else {
                  option.toggle();
                }
              }
            });

            if (this.question.other && this.question.multiple) {
              value.push(this.question.other);
            } else if (!this.question.multiple) {
              value = this.question.other;
            }

            this.dataValue = value;
            this.setAnswer(this.dataValue);
          }
        },
        
        stopEditOther() {
          this.editingOther = false;
        }
      },

      computed: {
        hasValue() {
          if (this.question.options.filter(o => o.selected).length) {
            return true
          }

          if (this.question.allowOther) {
            return this.question.other && this.question.other.trim().length > 0
          }

          return false
        }
      }
    };

  const _hoisted_1$6 = { class: "f-radios-wrap" };
  const _hoisted_2$5 = ["onClick", "aria-label"];
  const _hoisted_3$3 = {
    key: 0,
    class: "f-image"
  };
  const _hoisted_4$3 = ["src", "alt"];
  const _hoisted_5$3 = { class: "f-label-wrap" };
  const _hoisted_6$3 = { class: "f-key" };
  const _hoisted_7$3 = {
    key: 0,
    class: "f-label"
  };
  const _hoisted_8$3 = ["aria-label"];
  const _hoisted_9$3 = { class: "f-label-wrap" };
  const _hoisted_10$3 = {
    key: 0,
    class: "f-key"
  };
  const _hoisted_11$3 = {
    key: 2,
    class: "f-selected"
  };
  const _hoisted_12$3 = { class: "f-label" };
  const _hoisted_13$3 = {
    key: 3,
    class: "f-label"
  };

  function render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$6, [
      require$$0.createElementVNode("ul", {
        class: require$$0.normalizeClass(["f-radios", {'f-multiple': _ctx.question.multiple}]),
        role: "listbox"
      }, [
        (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(_ctx.question.options, (option, index) => {
          return (require$$0.openBlock(), require$$0.createElementBlock("li", {
            onClick: require$$0.withModifiers($event => ($options.toggleAnswer(option)), ["prevent"]),
            class: require$$0.normalizeClass({'f-selected': option.selected}),
            key: 'm' + index,
            "aria-label": $options.getLabel(index),
            role: "option"
          }, [
            ($data.hasImages && option.imageSrc)
              ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_3$3, [
                  require$$0.createElementVNode("img", {
                    src: option.imageSrc,
                    alt: option.imageAlt
                  }, null, 8 /* PROPS */, _hoisted_4$3)
                ]))
              : require$$0.createCommentVNode("v-if", true),
            require$$0.createElementVNode("div", _hoisted_5$3, [
              require$$0.createElementVNode("span", _hoisted_6$3, require$$0.toDisplayString($options.getToggleKey(index)), 1 /* TEXT */),
              (option.choiceLabel())
                ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_7$3, require$$0.toDisplayString(option.choiceLabel()), 1 /* TEXT */))
                : require$$0.createCommentVNode("v-if", true)
            ])
          ], 10 /* CLASS, PROPS */, _hoisted_2$5))
        }), 128 /* KEYED_FRAGMENT */)),
        (!$data.hasImages && _ctx.question.allowOther)
          ? (require$$0.openBlock(), require$$0.createElementBlock("li", {
              key: 0,
              class: require$$0.normalizeClass(["f-other", {'f-selected': _ctx.question.other, 'f-focus': $data.editingOther}]),
              onClick: _cache[5] || (_cache[5] = require$$0.withModifiers((...args) => ($options.startEditOther && $options.startEditOther(...args)), ["prevent"])),
              "aria-label": _ctx.language.ariaTypeAnswer,
              role: "option"
            }, [
              require$$0.createElementVNode("div", _hoisted_9$3, [
                (!$data.editingOther)
                  ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_10$3, require$$0.toDisplayString($options.getToggleKey(_ctx.question.options.length)), 1 /* TEXT */))
                  : require$$0.createCommentVNode("v-if", true),
                ($data.editingOther)
                  ? require$$0.withDirectives((require$$0.openBlock(), require$$0.createElementBlock("input", {
                      key: 1,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.question.other) = $event)),
                      type: "text",
                      ref: "otherInput",
                      onBlur: _cache[1] || (_cache[1] = (...args) => ($options.stopEditOther && $options.stopEditOther(...args))),
                      onKeyup: [
                        _cache[2] || (_cache[2] = require$$0.withKeys(require$$0.withModifiers((...args) => ($options.stopEditOther && $options.stopEditOther(...args)), ["prevent"]), ["enter"])),
                        _cache[3] || (_cache[3] = (...args) => ($options.onChangeOther && $options.onChangeOther(...args)))
                      ],
                      onChange: _cache[4] || (_cache[4] = (...args) => ($options.onChangeOther && $options.onChangeOther(...args))),
                      maxlength: "256"
                    }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */)), [
                      [require$$0.vModelText, _ctx.question.other]
                    ])
                  : (_ctx.question.other)
                    ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_11$3, [
                        require$$0.createElementVNode("span", _hoisted_12$3, require$$0.toDisplayString(_ctx.question.other), 1 /* TEXT */)
                      ]))
                    : (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_13$3, require$$0.toDisplayString(_ctx.language.otherPrompt), 1 /* TEXT */))
              ])
            ], 10 /* CLASS, PROPS */, _hoisted_8$3))
          : require$$0.createCommentVNode("v-if", true)
      ], 2 /* CLASS */)
    ]))
  }

  script$d.render = render$6;
  script$d.__file = "src/components/QuestionTypes/MultipleChoiceType.vue";

  var script$c = {
      extends: script$d,
      name: QuestionType.MultiplePictureChoice,

      data() {
        return {
          hasImages: true
        }
      }
    };

  script$c.__file = "src/components/QuestionTypes/MultiplePictureChoiceType.vue";

  var script$b = {
      extends: script$h,
      name: QuestionType.Number,

      data() {
        return {
          inputType: 'tel',
          allowedChars: '-0123456789.'
        }
      },

      methods: {
        validate() {
          if (this.question.min !== null && !isNaN(this.question.min) && +this.dataValue < +this.question.min) {
            return false
          }

          if (this.question.max !== null && !isNaN(this.question.max) && +this.dataValue > +this.question.max) {
            return false
          }

          if (this.hasValue) {
            if (this.question.mask) {
              return this.validateMask()
            }

            return !isNaN(+this.dataValue)
          }

          return !this.question.required || this.hasValue
        }
      }
    };

  script$b.__file = "src/components/QuestionTypes/NumberType.vue";

  var script$a = {
      extends: script$h,
      name: QuestionType.Password,
      data() {
        return {
          inputType: 'password'
        }
      }
    };

  script$a.__file = "src/components/QuestionTypes/PasswordType.vue";

  var script$9 = {
      extends: script$h,
      name: QuestionType.Phone,
      data() {
        return {
          inputType: 'tel', 
          canReceiveFocus: true
        }
      }
    };

  script$9.__file = "src/components/QuestionTypes/PhoneType.vue";

  var script$8 = {
      extends: script$k,
      name: QuestionType.SectionBreak,
      methods: {
        onEnter() {
          this.dirty = true;

          this._onEnter();
        },

        isValid() {
          return true
        }
      }
    };

  const _hoisted_1$5 = {
    key: 0,
    class: "f-content"
  };
  const _hoisted_2$4 = { class: "f-section-text" };

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return (_ctx.question.content)
      ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$5, [
          require$$0.createElementVNode("span", _hoisted_2$4, require$$0.toDisplayString(_ctx.question.content), 1 /* TEXT */)
        ]))
      : require$$0.createCommentVNode("v-if", true)
  }

  script$8.render = render$5;
  script$8.__file = "src/components/QuestionTypes/SectionBreakType.vue";

  var script$7 = {
      extends: script$h,
      name: QuestionType.Url,
      data() {
        return {
          inputType: 'url'
        }
      },
      methods: {
        fixAnswer(answer) {
          if (answer && answer.indexOf('://') === -1) {
            // Insert https protocol to make it easier to enter
            // correct URLs
            answer = 'https://' + answer;
          }

          return answer
        },

        validate() {
          if (this.hasValue) {
            try {
              new URL(this.fixAnswer(this.dataValue));

              return true
            } catch(_) { 
              // Invalid URL
              return false
            }
          }

          return !this.question.required
        }
      }
    };

  script$7.__file = "src/components/QuestionTypes/UrlType.vue";

  var script$6 = {
      extends: script$h,
      name: QuestionType.Date,
      data() {
        return {
          inputType: 'date'
        }
      }, 
      methods: {
        validate() {
          if (this.question.min && this.dataValue < this.question.min) {
            return false
          }

          if (this.question.max && this.dataValue > this.question.max) {
            return false
          }

          return !this.question.required || this.hasValue
        }
      }
    };

  script$6.__file = "src/components/QuestionTypes/DateType.vue";

  var script$5 = {
      extends: script$h,

      name: QuestionType.File,

      methods: {
        setAnswer(answer) {
          this.question.setAnswer(this.$refs.input.files);

          this.answer = answer;
          this.question.answered = this.isValid();

          this.$emit('update:modelValue', answer);
        },

        showInvalid() {
          return this.errorMessage !== null
        },

        checkFileAccept(file) {
          const extension = '.' + file.name.split('.').pop();

          if (this.acceptedFileExtensionsRegex && this.acceptedFileExtensionsRegex.test(extension)) {
            return true
          }

          if (this.acceptedFileMimesRegex && this.acceptedFileMimesRegex.test(file.type)) {
            return true
          }

          return false
        },

        validate() {
          if (this.question.required && !this.hasValue) {
            return false
          }

          const 
            files = this.$refs.input.files,
            numFiles = files.length;

          if (this.question.accept) {
            if (!Array.from(files).every(file => this.checkFileAccept(file))) {
              this.errorMessage = this.language.formatString(this.language.errorAllowedFileTypes, {
                fileTypes: this.question.accept
              });

              return false
            }
          }

          if (this.question.multiple) {
            if (this.question.min !== null && numFiles < +this.question.min) {
              this.errorMessage = this.language.formatString(this.language.errorMinFiles, {
                min: this.question.min
              });

              return false
            }

            if (this.question.max !== null && numFiles > +this.question.max) {
              this.errorMessage = this.language.formatString(this.language.errorMaxFiles, {
                max: this.question.max
              });

              return false
            }
          }

          if (this.question.maxSize !== null) {
            const fileSize =
              Array.from(files).reduce((current, file) => current + file.size, 0);

            if (fileSize > +this.question.maxSize) {
              this.errorMessage = this.language.formatString(this.language.errorMaxFileSize, {
                size: this.language.formatFileSize(this.question.maxSize)
              });

              return false
            }
          }

          this.errorMessage = null;

          return this.$refs.input.checkValidity()
        }
      },

      computed: {
        acceptArray() {
          if (this.question.accept) {
            return this.question.accept.split(',')
          }

          return []
        },

        acceptedFileMimes() {
          return this.acceptArray.filter(accept => accept[0] !== '.')
        },

        acceptedFileMimesRegex() {
          if (this.acceptedFileMimes.length) {
            return new RegExp(this.acceptedFileMimes.join('|').replace(/\*/g, '.\*'))
          }

          return null
        },

        acceptedFileExtensions() {
          return this.acceptArray.filter(accept => accept[0] === '.')
        },

        acceptedFileExtensionsRegex() {
          if (this.acceptedFileExtensions.length) {
            return new RegExp(this.acceptedFileExtensions.join('|'))
          }

          return null
        }
      }
    };

  const _hoisted_1$4 = ["accept", "multiple", "value", "required"];

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return (require$$0.openBlock(), require$$0.createElementBlock("input", {
      ref: "input",
      type: "file",
      accept: _ctx.question.accept,
      multiple: _ctx.question.multiple,
      value: _ctx.modelValue,
      required: _ctx.question.required,
      onKeyup: [
        _cache[0] || (_cache[0] = require$$0.withKeys(require$$0.withModifiers((...args) => (_ctx.onEnter && _ctx.onEnter(...args)), ["prevent"]), ["enter"])),
        _cache[1] || (_cache[1] = require$$0.withKeys(require$$0.withModifiers((...args) => (_ctx.onEnter && _ctx.onEnter(...args)), ["prevent"]), ["tab"]))
      ],
      onFocus: _cache[2] || (_cache[2] = (...args) => (_ctx.setFocus && _ctx.setFocus(...args))),
      onBlur: _cache[3] || (_cache[3] = (...args) => (_ctx.unsetFocus && _ctx.unsetFocus(...args))),
      onChange: _cache[4] || (_cache[4] = (...args) => (_ctx.onChange && _ctx.onChange(...args)))
    }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$4))
  }

  script$5.render = render$4;
  script$5.__file = "src/components/QuestionTypes/FileType.vue";

  var script$4 = {
      extends: script$k,
      
      name: QuestionType.Matrix,

      data() {
        return {
          selected: {},
          inputList: []
        }
      },

      beforeMount() {
        // Pre-fill the form if there is a predefined answer
        if (this.question.multiple) {
          for (let row of this.question.rows) {
            this.selected[row.id] = this.question.answer && this.question.answer[row.id] ? [...this.question.answer[row.id]] : [];
          }
        } else if (this.question.answer) {
          this.selected = {...this.question.answer};
        }
      },

      beforeUpdate() {
        this.inputList = [];
      },

      methods: {
        onChange($event) {
          this.dirty = true;
          this.dataValue = this.selected;
          this.onKeyDown();
          this.setAnswer(this.dataValue);
        }, 

        validate() {
          if (!this.question.required) {
            return true
          }

          const checked = inputs => inputs.some(input => input.checked);

          if (!Object.values(this.inputGroups).every(value => checked(value))) {
            return false
          }

          return true
        },

        getElement() {
          return this.inputList[0]
        }, 
      },

      computed: {
        inputGroups() {
          const inputGroups = {};

          // Setting input list for validation
          for (let row of this.question.rows) {
            inputGroups[row.id] = [];
          }
          
          this.inputList.forEach(input => {
            inputGroups[input.dataset.id].push(input); 
          });

          return inputGroups
        }
      }
    };

  const _hoisted_1$3 = { class: "f-matrix-wrap" };
  const _hoisted_2$3 = /*#__PURE__*/require$$0.createElementVNode("td", null, null, -1 /* HOISTED */);
  const _hoisted_3$2 = { class: "f-table-string" };
  const _hoisted_4$2 = { class: "f-table-cell f-row-cell" };
  const _hoisted_5$2 = { class: "f-table-string" };
  const _hoisted_6$2 = ["title"];
  const _hoisted_7$2 = {
    key: 0,
    class: "f-field-wrap"
  };
  const _hoisted_8$2 = { class: "f-matrix-field f-matrix-radio" };
  const _hoisted_9$2 = ["name", "id", "aria-label", "data-id", "value", "onUpdate:modelValue"];
  const _hoisted_10$2 = /*#__PURE__*/require$$0.createElementVNode("span", { class: "f-field-mask f-radio-mask" }, [
    /*#__PURE__*/require$$0.createElementVNode("svg", {
      viewBox: "0 0 24 24",
      class: "f-field-svg f-radio-svg"
    }, [
      /*#__PURE__*/require$$0.createElementVNode("circle", {
        r: "6",
        cx: "12",
        cy: "12"
      })
    ])
  ], -1 /* HOISTED */);
  const _hoisted_11$2 = {
    key: 1,
    class: "f-field-wrap"
  };
  const _hoisted_12$2 = { class: "f-matrix-field f-matrix-checkbox" };
  const _hoisted_13$2 = ["id", "aria-label", "data-id", "value", "onUpdate:modelValue"];
  const _hoisted_14$2 = /*#__PURE__*/require$$0.createElementVNode("span", { class: "f-field-mask f-checkbox-mask" }, [
    /*#__PURE__*/require$$0.createElementVNode("svg", {
      viewBox: "0 0 24 24",
      class: "f-field-svg f-checkbox-svg"
    }, [
      /*#__PURE__*/require$$0.createElementVNode("rect", {
        width: "12",
        height: "12",
        x: "6",
        y: "6"
      })
    ])
  ], -1 /* HOISTED */);

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$3, [
      require$$0.createElementVNode("table", {
        class: require$$0.normalizeClass(["f-matrix-table", { 'f-matrix-multiple': _ctx.question.multiple }])
      }, [
        require$$0.createElementVNode("thead", null, [
          require$$0.createElementVNode("tr", null, [
            _hoisted_2$3,
            (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(_ctx.question.columns, (column, index) => {
              return (require$$0.openBlock(), require$$0.createElementBlock("th", {
                key: 'c' + index,
                class: "f-table-cell f-column-cell"
              }, [
                require$$0.createElementVNode("span", _hoisted_3$2, require$$0.toDisplayString(column.label), 1 /* TEXT */)
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ]),
        require$$0.createElementVNode("tbody", null, [
          (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(_ctx.question.rows, (row, index) => {
            return (require$$0.openBlock(), require$$0.createElementBlock("tr", {
              key: 'r' + index,
              class: "f-table-row"
            }, [
              require$$0.createElementVNode("td", _hoisted_4$2, [
                require$$0.createElementVNode("span", _hoisted_5$2, require$$0.toDisplayString(row.label), 1 /* TEXT */)
              ]),
              (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList(_ctx.question.columns, (column, index) => {
                return (require$$0.openBlock(), require$$0.createElementBlock("td", {
                  key: 'l' + index,
                  title: column.label,
                  class: "f-table-cell f-matrix-cell"
                }, [
                  (!_ctx.question.multiple)
                    ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_7$2, [
                        require$$0.createElementVNode("label", _hoisted_8$2, [
                          require$$0.withDirectives(require$$0.createElementVNode("input", {
                            type: "radio",
                            ref_for: true,
                            ref: el => $data.inputList.push(el),
                            name: row.id,
                            id: 'c' + index + '-' + row.id,
                            "aria-label": row.label,
                            "data-id": row.id,
                            value: column.value,
                            "onUpdate:modelValue": $event => (($data.selected[row.id]) = $event),
                            class: "f-field-control f-radio-control",
                            onChange: _cache[0] || (_cache[0] = (...args) => ($options.onChange && $options.onChange(...args)))
                          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_9$2), [
                            [require$$0.vModelRadio, $data.selected[row.id]]
                          ]),
                          _hoisted_10$2
                        ])
                      ]))
                    : (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_11$2, [
                        require$$0.createElementVNode("label", _hoisted_12$2, [
                          require$$0.withDirectives(require$$0.createElementVNode("input", {
                            type: "checkbox",
                            ref_for: true,
                            ref: el => $data.inputList.push(el),
                            id: 'c' + index + '-' + row.id,
                            "aria-label": row.label,
                            "data-id": row.id,
                            value: column.value,
                            class: "f-field-control f-checkbox-control",
                            "onUpdate:modelValue": $event => (($data.selected[row.id]) = $event),
                            onChange: _cache[1] || (_cache[1] = (...args) => ($options.onChange && $options.onChange(...args)))
                          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_13$2), [
                            [require$$0.vModelCheckbox, $data.selected[row.id]]
                          ]),
                          _hoisted_14$2
                        ])
                      ]))
                ], 8 /* PROPS */, _hoisted_6$2))
              }), 128 /* KEYED_FRAGMENT */))
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ], 2 /* CLASS */)
    ]))
  }

  script$4.render = render$3;
  script$4.__file = "src/components/QuestionTypes/MatrixType.vue";

  var vueSliderComponent_umd_min = {exports: {}};

  (function (module, exports) {
  	(function(t,e){module.exports=e(require$$0__default["default"]);})("undefined"!==typeof self?self:commonjsGlobal,(function(t){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n});},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s="fb15")}({"091b":function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,".vue-slider-dot{position:absolute;-webkit-transition:all 0s;transition:all 0s;z-index:5}.vue-slider-dot:focus{outline:none}.vue-slider-dot-tooltip{position:absolute;visibility:hidden}.vue-slider-dot-hover:hover .vue-slider-dot-tooltip,.vue-slider-dot-tooltip-show{visibility:visible}.vue-slider-dot-tooltip-top{top:-10px;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.vue-slider-dot-tooltip-bottom{bottom:-10px;left:50%;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.vue-slider-dot-tooltip-left{left:-10px;top:50%;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.vue-slider-dot-tooltip-right{right:-10px;top:50%;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}",""]),t.exports=e;},"24fb":function(t,e,r){function n(t,e){var r=t[1]||"",n=t[3];if(!n)return r;if(e&&"function"===typeof btoa){var i=o(n),a=n.sources.map((function(t){return "/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return [r].concat(a).concat([i]).join("\n")}return [r].join("\n")}function o(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e);return "/*# ".concat(r," */")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=n(e,t);return e[2]?"@media ".concat(e[2]," {").concat(r,"}"):r})).join("")},e.i=function(t,r,n){"string"===typeof t&&(t=[[null,t,""]]);var o={};if(n)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0);}for(var s=0;s<t.length;s++){var u=[].concat(t[s]);n&&o[u[0]]||(r&&(u[2]?u[2]="".concat(r," and ").concat(u[2]):u[2]=r),e.push(u));}},e};},"499e":function(t,e,r){function n(t,e){for(var r=[],n={},o=0;o<e.length;o++){var i=e[o],a=i[0],s=i[1],u=i[2],l=i[3],c={id:t+":"+o,css:s,media:u,sourceMap:l};n[a]?n[a].parts.push(c):r.push(n[a]={id:a,parts:[c]});}return r}r.r(e),r.d(e,"default",(function(){return p}));var o="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,u=0,l=!1,c=function(){},d=null,f="data-vue-ssr-id",h="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(t,e,r,o){l=r,d=o||{};var a=n(t,e);return y(a),function(e){for(var r=[],o=0;o<a.length;o++){var s=a[o],u=i[s.id];u.refs--,r.push(u);}e?(a=n(t,e),y(a)):a=[];for(o=0;o<r.length;o++){u=r[o];if(0===u.refs){for(var l=0;l<u.parts.length;l++)u.parts[l]();delete i[u.id];}}}}function y(t){for(var e=0;e<t.length;e++){var r=t[e],n=i[r.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](r.parts[o]);for(;o<r.parts.length;o++)n.parts.push(m(r.parts[o]));n.parts.length>r.parts.length&&(n.parts.length=r.parts.length);}else {var a=[];for(o=0;o<r.parts.length;o++)a.push(m(r.parts[o]));i[r.id]={id:r.id,refs:1,parts:a};}}}function v(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function m(t){var e,r,n=document.querySelector("style["+f+'~="'+t.id+'"]');if(n){if(l)return c;n.parentNode.removeChild(n);}if(h){var o=u++;n=s||(s=v()),e=g.bind(null,n,o,!1),r=g.bind(null,n,o,!0);}else n=v(),e=k.bind(null,n),r=function(){n.parentNode.removeChild(n);};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n);}else r();}}var b=function(){var t=[];return function(e,r){return t[e]=r,t.filter(Boolean).join("\n")}}();function g(t,e,r,n){var o=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=b(e,o);else {var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i);}}function k(t,e){var r=e.css,n=e.media,o=e.sourceMap;if(n&&t.setAttribute("media",n),d.ssrId&&t.setAttribute(f,e.id),o&&(r+="\n/*# sourceURL="+o.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=r;else {while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r));}}},"4abb":function(t,e,r){var n=r("7a57");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=r("499e").default;o("b2af7572",n,!0,{sourceMap:!1,shadowMode:!1});},"4ed8":function(t,e,r){var n=r("091b");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=r("499e").default;o("2f6bee1a",n,!0,{sourceMap:!1,shadowMode:!1});},"556c":function(t,e,r){var n=r("eef2");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=r("499e").default;o("1209fd47",n,!0,{sourceMap:!1,shadowMode:!1});},"7a57":function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,".vue-slider{position:relative;-webkit-box-sizing:content-box;box-sizing:content-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.vue-slider-rail{position:relative;width:100%;height:100%;-webkit-transition-property:width,height,left,right,top,bottom;transition-property:width,height,left,right,top,bottom}.vue-slider-process{position:absolute;z-index:1}",""]),t.exports=e;},8875:function(t,e,r){var n,o,i;(function(r,a){o=[],n=a,i="function"===typeof n?n.apply(e,o):n,void 0===i||(t.exports=i);})("undefined"!==typeof self&&self,(function(){function t(){var e=Object.getOwnPropertyDescriptor(document,"currentScript");if(!e&&"currentScript"in document&&document.currentScript)return document.currentScript;if(e&&e.get!==t&&document.currentScript)return document.currentScript;try{throw new Error}catch(h){var r,n,o,i=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,a=/@([^@]*):(\d+):(\d+)\s*$/gi,s=i.exec(h.stack)||a.exec(h.stack),u=s&&s[1]||!1,l=s&&s[2]||!1,c=document.location.href.replace(document.location.hash,""),d=document.getElementsByTagName("script");u===c&&(r=document.documentElement.outerHTML,n=new RegExp("(?:[^\\n]+?\\n){0,"+(l-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),o=r.replace(n,"$1").trim());for(var f=0;f<d.length;f++){if("interactive"===d[f].readyState)return d[f];if(d[f].src===u)return d[f];if(u===c&&d[f].innerHTML&&d[f].innerHTML.trim()===o)return d[f]}return null}}return t}));},"8bbf":function(e,r){e.exports=t;},eef2:function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,".vue-slider-marks{position:relative;width:100%;height:100%}.vue-slider-mark{position:absolute;z-index:1}.vue-slider-ltr .vue-slider-mark,.vue-slider-rtl .vue-slider-mark{width:0;height:100%;top:50%}.vue-slider-ltr .vue-slider-mark-step,.vue-slider-rtl .vue-slider-mark-step{top:0}.vue-slider-ltr .vue-slider-mark-label,.vue-slider-rtl .vue-slider-mark-label{top:100%;margin-top:10px}.vue-slider-ltr .vue-slider-mark{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vue-slider-ltr .vue-slider-mark-step{left:0}.vue-slider-ltr .vue-slider-mark-label{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.vue-slider-rtl .vue-slider-mark{-webkit-transform:translate(50%,-50%);transform:translate(50%,-50%)}.vue-slider-rtl .vue-slider-mark-step{right:0}.vue-slider-rtl .vue-slider-mark-label{right:50%;-webkit-transform:translateX(50%);transform:translateX(50%)}.vue-slider-btt .vue-slider-mark,.vue-slider-ttb .vue-slider-mark{width:100%;height:0;left:50%}.vue-slider-btt .vue-slider-mark-step,.vue-slider-ttb .vue-slider-mark-step{left:0}.vue-slider-btt .vue-slider-mark-label,.vue-slider-ttb .vue-slider-mark-label{left:100%;margin-left:10px}.vue-slider-btt .vue-slider-mark{-webkit-transform:translate(-50%,50%);transform:translate(-50%,50%)}.vue-slider-btt .vue-slider-mark-step{top:0}.vue-slider-btt .vue-slider-mark-label{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vue-slider-ttb .vue-slider-mark{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vue-slider-ttb .vue-slider-mark-step{bottom:0}.vue-slider-ttb .vue-slider-mark-label{bottom:50%;-webkit-transform:translateY(50%);transform:translateY(50%)}.vue-slider-mark-label,.vue-slider-mark-step{position:absolute}",""]),t.exports=e;},fb15:function(t,e,r){if(r.r(e),r.d(e,"ERROR_TYPE",(function(){return gt})),r.d(e,"VueSliderMark",(function(){return ct})),r.d(e,"VueSliderDot",(function(){return K})),"undefined"!==typeof window){var n=window.document.currentScript,o=r("8875");n=o(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:o});var i=n&&n.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);i&&(r.p=i[1]);}var a=r("8bbf");function s(t,e,r,n){var o,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(i<3?o(a):i>3?o(e,r,a):o(e,r))||a);return i>3&&a&&Object.defineProperty(e,r,a),a}
  	/**
  	  * vue-class-component v8.0.0-beta.4
  	  * (c) 2015-present Evan You
  	  * @license MIT
  	  */
  	function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}function c(t,e,r){return e&&l(t.prototype,e),r&&l(t,r),t}function d(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n);}return r}function h(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){d(t,e,r[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e));}));}return t}function p(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e);}function y(t){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},y(t)}function v(t,e){return v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},v(t,e)}function m(){if("undefined"===typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"===typeof Proxy)return !0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return !1}}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function g(t,e){return !e||"object"!==typeof e&&"function"!==typeof e?b(t):e}function k(t){var e=m();return function(){var r,n=y(t);if(e){var o=y(this).constructor;r=Reflect.construct(n,arguments,o);}else r=n.apply(this,arguments);return g(this,r)}}function O(t){return S(t)||w(t)||x(t)||D()}function S(t){if(Array.isArray(t))return P(t)}function w(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function x(t,e){if(t){if("string"===typeof t)return P(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return "Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?P(t,e):void 0}}function P(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function D(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function j(t,e,r){Object.defineProperty(t,e,{get:r,enumerable:!1,configurable:!0});}function R(t,e,r){Object.defineProperty(t,e,{get:function(){return r[e].value},set:function(t){r[e].value=t;},enumerable:!0,configurable:!0});}function E(t){var e=Object.getPrototypeOf(t.prototype);if(e)return e.constructor}var A=function(){function t(e,r){var n=this;u(this,t),j(this,"$props",(function(){return e})),j(this,"$attrs",(function(){return r.attrs})),j(this,"$slots",(function(){return r.slots})),j(this,"$emit",(function(){return r.emit})),Object.keys(e).forEach((function(t){Object.defineProperty(n,t,{enumerable:!1,configurable:!0,writable:!0,value:e[t]});}));}return c(t,null,[{key:"__vccExtend",value:function(t){t.mixins=t.mixins||[],t.mixins.push(this.__vccOpts);}},{key:"registerHooks",value:function(t){var e;(e=this.__vccHooks).push.apply(e,O(t));}},{key:"props",value:function(t){var e=new t,r={};Object.keys(e).forEach((function(t){var n=e[t];r[t]=null!==n&&void 0!==n?n:null;}));var n=function(t){p(n,t);var e=k(n);function n(){return u(this,n),e.apply(this,arguments)}return c(n,null,[{key:"__vccExtend",value:function(t){t.props=r;}}]),n}(this);return n}},{key:"__vccOpts",get:function(){if(this===V)return {};var t=this.hasOwnProperty("__vccCache")&&this.__vccCache;if(t)return t;var e=this,r=this.__vccCache=this.hasOwnProperty("__vccBase")?h({},this.__vccBase):{},n=E(e);n&&n.__vccExtend(r),r.methods=h({},r.methods),r.computed=h({},r.computed);var o=e.prototype;Object.getOwnPropertyNames(o).forEach((function(t){if("constructor"!==t)if(e.__vccHooks.indexOf(t)>-1)r[t]=o[t];else {var n=Object.getOwnPropertyDescriptor(o,t);"function"!==typeof n.value?(n.get||n.set)&&(r.computed[t]={get:n.get,set:n.set}):r.methods[t]=n.value;}})),r.setup=function(t,r){var n,o=new e(t,r),i=Object.keys(o),s={},u=null;return i.forEach((function(t){void 0===o[t]||o[t]&&o[t].__s||(s[t]=Object(a["ref"])(o[t]),R(o,t,s));})),i.forEach((function(t){if(o[t]&&o[t].__s){var e=o[t].__s();e instanceof Promise?(u||(u=Promise.resolve(s)),u=u.then((function(){return e.then((function(e){return s[t]=Object(a["proxyRefs"])(e),s}))}))):s[t]=Object(a["proxyRefs"])(e);}})),null!==(n=u)&&void 0!==n?n:s};var i=this.hasOwnProperty("__vccDecorators")&&this.__vccDecorators;i&&i.forEach((function(t){return t(r)}));var s=["render","ssrRender","__file","__cssModules","__scopeId","__hmrId"];return s.forEach((function(t){e[t]&&(r[t]=e[t]);})),r}}]),t}();A.__vccHooks=["data","beforeCreate","created","beforeMount","mounted","beforeUnmount","unmounted","beforeUpdate","updated","activated","deactivated","render","errorCaptured","serverPrefetch"];var V=A;function _(t){return function(e){return e.__vccBase=t,e}}function C(t){return function(e,r,n){var o="function"===typeof e?e:e.constructor;o.__vccDecorators||(o.__vccDecorators=[]),"number"!==typeof n&&(n=void 0),o.__vccDecorators.push((function(e){return t(e,r,n)}));}}var M="undefined"!==typeof Reflect&&"undefined"!==typeof Reflect.getMetadata;function I(t,e,r){if(M&&!Array.isArray(t)&&"function"!==typeof t&&"undefined"===typeof t.type){var n=Reflect.getMetadata("design:type",e,r);n!==Object&&(t.type=n);}}function N(t){return void 0===t&&(t={}),function(e,r){I(t,e,r),C((function(e,r){(e.props||(e.props={}))[r]=t;}))(e,r);}}function T(t,e){void 0===e&&(e={});var r=e.deep,n=void 0!==r&&r,o=e.immediate,i=void 0!==o&&o;return C((function(e,r){"object"!==typeof e.watch&&(e.watch=Object.create(null));var o=e.watch;"object"!==typeof o[t]||Array.isArray(o[t])?"undefined"===typeof o[t]&&(o[t]=[]):o[t]=[o[t]],o[t].push({handler:r,deep:n,immediate:i});}))}r("4ed8");function L(t){return L="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},L(t)}function B(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function H(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}function z(t,e,r){return e&&H(t.prototype,e),r&&H(t,r),t}function U(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&F(t,e);}function F(t,e){return F=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},F(t,e)}function $(t){var e=X();return function(){var r,n=q(t);if(e){var o=q(this).constructor;r=Reflect.construct(n,arguments,o);}else r=n.apply(this,arguments);return W(this,r)}}function W(t,e){return !e||"object"!==L(e)&&"function"!==typeof e?G(t):e}function G(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function X(){if("undefined"===typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"===typeof Proxy)return !0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return !1}}function q(t){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},q(t)}var Y=function(){var t=function(t){U(r,t);var e=$(r);function r(){return B(this,r),e.apply(this,arguments)}return z(r,[{key:"dragStart",value:function(t){if(this.disabled)return !1;this.$emit("DragStart");}},{key:"render",value:function(){return Object(a["createVNode"])("div",{ref:"dot",class:this.dotClasses,"aria-valuetext":this.tooltipValue,onMousedown:this.dragStart,onTouchstart:this.dragStart},[this.dotSlot||Object(a["createVNode"])("div",{class:this.handleClasses,style:this.dotStyle},null),"none"!==this.tooltip?Object(a["createVNode"])("div",{class:this.tooltipClasses},[this.tooltipSlot||Object(a["createVNode"])("div",{class:this.tooltipInnerClasses,style:this.tooltipStyle},[Object(a["createVNode"])("span",{class:"vue-slider-dot-tooltip-text"},[this.tooltipValue])])]):null])}},{key:"dotClasses",get:function(){return ["vue-slider-dot",{"vue-slider-dot-hover":"hover"===this.tooltip||"active"===this.tooltip,"vue-slider-dot-disabled":this.disabled,"vue-slider-dot-focus":this.focus}]}},{key:"handleClasses",get:function(){return ["vue-slider-dot-handle",{"vue-slider-dot-handle-disabled":this.disabled,"vue-slider-dot-handle-focus":this.focus}]}},{key:"tooltipClasses",get:function(){return ["vue-slider-dot-tooltip",["vue-slider-dot-tooltip-".concat(this.tooltipPlacement)],{"vue-slider-dot-tooltip-show":this.showTooltip}]}},{key:"tooltipInnerClasses",get:function(){return ["vue-slider-dot-tooltip-inner",["vue-slider-dot-tooltip-inner-".concat(this.tooltipPlacement)],{"vue-slider-dot-tooltip-inner-disabled":this.disabled,"vue-slider-dot-tooltip-inner-focus":this.focus}]}},{key:"showTooltip",get:function(){switch(this.tooltip){case"always":return !0;case"none":return !1;case"focus":case"active":return !!this.focus;default:return !1}}},{key:"tooltipValue",get:function(){return this.tooltipFormatter?"string"===typeof this.tooltipFormatter?this.tooltipFormatter.replace(/\{value\}/,String(this.value)):this.tooltipFormatter(this.value):this.value}}]),r}(V);return s([N({default:0})],t.prototype,"value",void 0),s([N()],t.prototype,"tooltip",void 0),s([N()],t.prototype,"dotStyle",void 0),s([N()],t.prototype,"tooltipStyle",void 0),s([N({type:String,validator:function(t){return ["top","right","bottom","left"].indexOf(t)>-1},required:!0})],t.prototype,"tooltipPlacement",void 0),s([N({type:[String,Function]})],t.prototype,"tooltipFormatter",void 0),s([N({type:Boolean,default:!1})],t.prototype,"focus",void 0),s([N({default:!1})],t.prototype,"disabled",void 0),s([N(Object)],t.prototype,"dotSlot",void 0),s([N(Object)],t.prototype,"tooltipSlot",void 0),t=s([_({name:"VueSliderDot",emits:["DragStart"]})],t),t}(),K=Y;r("556c");function J(t){return J="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},J(t)}function Q(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Z(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}function tt(t,e,r){return e&&Z(t.prototype,e),r&&Z(t,r),t}function et(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&rt(t,e);}function rt(t,e){return rt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},rt(t,e)}function nt(t){var e=at();return function(){var r,n=st(t);if(e){var o=st(this).constructor;r=Reflect.construct(n,arguments,o);}else r=n.apply(this,arguments);return ot(this,r)}}function ot(t,e){return !e||"object"!==J(e)&&"function"!==typeof e?it(t):e}function it(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function at(){if("undefined"===typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"===typeof Proxy)return !0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return !1}}function st(t){return st=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},st(t)}var ut,lt=function(){var t=function(t){et(r,t);var e=nt(r);function r(){return Q(this,r),e.apply(this,arguments)}return tt(r,[{key:"labelClickHandle",value:function(t){t.stopPropagation(),this.$emit("PressLabel",this.mark.pos);}},{key:"render",value:function(){var t=this.mark;return Object(a["createVNode"])("div",{class:this.marksClasses},[this.stepSlot||Object(a["createVNode"])("div",{class:this.stepClasses,style:[this.stepStyle,t.style,t.active?this.stepActiveStyle:null,t.active?t.activeStyle:null]},null),this.hideLabel?null:this.labelSlot||Object(a["createVNode"])("div",{class:this.labelClasses,style:[this.labelStyle,t.labelStyle,t.active?this.labelActiveStyle:null,t.active?t.labelActiveStyle:null],onClick:this.labelClickHandle},[t.label])])}},{key:"marksClasses",get:function(){return ["vue-slider-mark",{"vue-slider-mark-active":this.mark.active}]}},{key:"stepClasses",get:function(){return ["vue-slider-mark-step",{"vue-slider-mark-step-active":this.mark.active}]}},{key:"labelClasses",get:function(){return ["vue-slider-mark-label",{"vue-slider-mark-label-active":this.mark.active}]}}]),r}(V);return s([N({required:!0})],t.prototype,"mark",void 0),s([N(Boolean)],t.prototype,"hideLabel",void 0),s([N()],t.prototype,"stepStyle",void 0),s([N()],t.prototype,"stepActiveStyle",void 0),s([N()],t.prototype,"labelStyle",void 0),s([N()],t.prototype,"labelActiveStyle",void 0),s([N(Object)],t.prototype,"stepSlot",void 0),s([N(Object)],t.prototype,"labelSlot",void 0),t=s([_({name:"VueSliderMark",emits:["PressLabel"]})],t),t}(),ct=lt,dt=function(t){return "number"===typeof t?"".concat(t,"px"):t},ft=function(t){var e=document.documentElement,r=document.body,n=t.getBoundingClientRect(),o={y:n.top+(window.pageYOffset||e.scrollTop)-(e.clientTop||r.clientTop||0),x:n.left+(window.pageXOffset||e.scrollLeft)-(e.clientLeft||r.clientLeft||0)};return o},ht=function(t,e,r){var n="targetTouches"in t?t.targetTouches[0]:t,o=ft(e),i={x:n.pageX-o.x,y:n.pageY-o.y};return {x:r?e.offsetWidth-i.x:i.x,y:r?e.offsetHeight-i.y:i.y}};(function(t){t[t["PAGE_UP"]=33]="PAGE_UP",t[t["PAGE_DOWN"]=34]="PAGE_DOWN",t[t["END"]=35]="END",t[t["HOME"]=36]="HOME",t[t["LEFT"]=37]="LEFT",t[t["UP"]=38]="UP",t[t["RIGHT"]=39]="RIGHT",t[t["DOWN"]=40]="DOWN";})(ut||(ut={}));var pt=function(t,e){if(e.hook){var r=e.hook(t);if("function"===typeof r)return r;if(!r)return null}switch(t.keyCode){case ut.UP:return function(t){return "ttb"===e.direction?t-1:t+1};case ut.RIGHT:return function(t){return "rtl"===e.direction?t-1:t+1};case ut.DOWN:return function(t){return "ttb"===e.direction?t+1:t-1};case ut.LEFT:return function(t){return "rtl"===e.direction?t+1:t-1};case ut.END:return function(){return e.max};case ut.HOME:return function(){return e.min};case ut.PAGE_UP:return function(t){return t+10};case ut.PAGE_DOWN:return function(t){return t-10};default:return null}};function yt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function vt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}function mt(t,e,r){return e&&vt(t.prototype,e),r&&vt(t,r),t}var bt,gt,kt=function(){function t(e){yt(this,t),this.num=e;}return mt(t,[{key:"decimal",value:function(t,e){var r=this.num,n=this.getDecimalLen(r),o=this.getDecimalLen(t),i=0;switch(e){case"+":i=this.getExponent(n,o),this.num=(this.safeRoundUp(r,i)+this.safeRoundUp(t,i))/i;break;case"-":i=this.getExponent(n,o),this.num=(this.safeRoundUp(r,i)-this.safeRoundUp(t,i))/i;break;case"*":this.num=this.safeRoundUp(this.safeRoundUp(r,this.getExponent(n)),this.safeRoundUp(t,this.getExponent(o)))/this.getExponent(n+o);break;case"/":i=this.getExponent(n,o),this.num=this.safeRoundUp(r,i)/this.safeRoundUp(t,i);break;case"%":i=this.getExponent(n,o),this.num=this.safeRoundUp(r,i)%this.safeRoundUp(t,i)/i;break}return this}},{key:"plus",value:function(t){return this.decimal(t,"+")}},{key:"minus",value:function(t){return this.decimal(t,"-")}},{key:"multiply",value:function(t){return this.decimal(t,"*")}},{key:"divide",value:function(t){return this.decimal(t,"/")}},{key:"remainder",value:function(t){return this.decimal(t,"%")}},{key:"toNumber",value:function(){return this.num}},{key:"getDecimalLen",value:function(t){var e="".concat(t).split("e");return ("".concat(e[0]).split(".")[1]||"").length-(e[1]?+e[1]:0)}},{key:"getExponent",value:function(t,e){return Math.pow(10,void 0!==e?Math.max(t,e):t)}},{key:"safeRoundUp",value:function(t,e){return Math.round(t*e)}}]),t}();function Ot(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n);}return r}function St(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Ot(Object(r),!0).forEach((function(e){Nt(t,e,r[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ot(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e));}));}return t}function wt(t,e){return Dt(t)||Pt(t,e)||Et(t,e)||xt()}function xt(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function Pt(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done);n=!0)if(r.push(a.value),e&&r.length===e)break}catch(u){o=!0,i=u;}finally{try{n||null==s["return"]||s["return"]();}finally{if(o)throw i}}return r}}function Dt(t){if(Array.isArray(t))return t}function jt(t){return Vt(t)||At(t)||Et(t)||Rt()}function Rt(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function Et(t,e){if(t){if("string"===typeof t)return _t(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return "Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_t(t,e):void 0}}function At(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function Vt(t){if(Array.isArray(t))return _t(t)}function _t(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function Ct(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Mt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}function It(t,e,r){return e&&Mt(t.prototype,e),r&&Mt(t,r),t}function Nt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}(function(t){t[t["VALUE"]=1]="VALUE",t[t["INTERVAL"]=2]="INTERVAL",t[t["MIN"]=3]="MIN",t[t["MAX"]=4]="MAX",t[t["ORDER"]=5]="ORDER";})(gt||(gt={}));var Tt=(bt={},Nt(bt,gt.VALUE,'The type of the "value" is illegal'),Nt(bt,gt.INTERVAL,'The prop "interval" is invalid, "(max - min)" must be divisible by "interval"'),Nt(bt,gt.MIN,'The "value" must be greater than or equal to the "min".'),Nt(bt,gt.MAX,'The "value" must be less than or equal to the "max".'),Nt(bt,gt.ORDER,'When "order" is false, the parameters "minRange", "maxRange", "fixed", "enabled" are invalid.'),bt),Lt=function(){function t(e){Ct(this,t),this.dotsPos=[],this.dotsValue=[],this.cacheRangeDir={},this.data=e.data,this.max=e.max,this.min=e.min,this.interval=e.interval,this.order=e.order,this.marks=e.marks,this.included=e.included,this.process=e.process,this.adsorb=e.adsorb,this.dotOptions=e.dotOptions,this.onError=e.onError,this.order?(this.minRange=e.minRange||0,this.maxRange=e.maxRange||0,this.enableCross=e.enableCross,this.fixed=e.fixed):((e.minRange||e.maxRange||!e.enableCross||e.fixed)&&this.emitError(gt.ORDER),this.minRange=0,this.maxRange=0,this.enableCross=!0,this.fixed=!1),this.setValue(e.value);}return It(t,[{key:"setValue",value:function(t){this.setDotsValue(Array.isArray(t)?jt(t):[t],!0);}},{key:"setDotsValue",value:function(t,e){this.dotsValue=t,e&&this.syncDotsPos();}},{key:"setDotsPos",value:function(t){var e=this,r=this.order?jt(t).sort((function(t,e){return t-e})):t;this.dotsPos=r,this.setDotsValue(r.map((function(t){return e.getValueByPos(t)})),this.adsorb);}},{key:"getValueByPos",value:function(t){var e=this.parsePos(t);if(this.included){var r=100;this.markList.forEach((function(n){var o=Math.abs(n.pos-t);o<r&&(r=o,e=n.value);}));}return e}},{key:"syncDotsPos",value:function(){var t=this;this.dotsPos=this.dotsValue.map((function(e){return t.parseValue(e)}));}},{key:"getRecentDot",value:function(t){var e=this.dotsPos.map((function(e){return Math.abs(e-t)}));return e.indexOf(Math.min.apply(Math,jt(e)))}},{key:"getIndexByValue",value:function(t){return this.data?this.data.indexOf(t):new kt(+t).minus(this.min).divide(this.interval).toNumber()}},{key:"getValueByIndex",value:function(t){return t<0?t=0:t>this.total&&(t=this.total),this.data?this.data[t]:new kt(t).multiply(this.interval).plus(this.min).toNumber()}},{key:"setDotPos",value:function(t,e){t=this.getValidPos(t,e).pos;var r=t-this.dotsPos[e];if(r){var n=new Array(this.dotsPos.length);this.fixed?n=this.getFixedChangePosArr(r,e):this.minRange||this.maxRange?n=this.getLimitRangeChangePosArr(t,r,e):n[e]=r,this.setDotsPos(this.dotsPos.map((function(t,e){return t+(n[e]||0)})));}}},{key:"getFixedChangePosArr",value:function(t,e){var r=this;return this.dotsPos.forEach((function(n,o){if(o!==e){var i=r.getValidPos(n+t,o),a=i.pos,s=i.inRange;s||(t=Math.min(Math.abs(a-n),Math.abs(t))*(t<0?-1:1));}})),this.dotsPos.map((function(e){return t}))}},{key:"getLimitRangeChangePosArr",value:function(t,e,r){var n=this,o=[{index:r,changePos:e}],i=e;return [this.minRange,this.maxRange].forEach((function(a,s){if(!a)return !1;var u=0===s,l=e>0,c=0;c=u?l?1:-1:l?-1:1;var d=function(t,e){var r=Math.abs(t-e);return u?r<n.minRangeDir:r>n.maxRangeDir},f=r+c,h=n.dotsPos[f],p=t;while(n.isPos(h)&&d(h,p)){var y=n.getValidPos(h+i,f),v=y.pos;o.push({index:f,changePos:v-h}),f+=c,p=v,h=n.dotsPos[f];}})),this.dotsPos.map((function(t,e){var r=o.filter((function(t){return t.index===e}));return r.length?r[0].changePos:0}))}},{key:"isPos",value:function(t){return "number"===typeof t}},{key:"getValidPos",value:function(t,e){var r=this.valuePosRange[e],n=!0;return t<r[0]?(t=r[0],n=!1):t>r[1]&&(t=r[1],n=!1),{pos:t,inRange:n}}},{key:"parseValue",value:function(t){if(this.data)t=this.data.indexOf(t);else if("number"===typeof t||"string"===typeof t){if(t=+t,t<this.min)return this.emitError(gt.MIN),0;if(t>this.max)return this.emitError(gt.MAX),0;if("number"!==typeof t||t!==t)return this.emitError(gt.VALUE),0;t=new kt(t).minus(this.min).divide(this.interval).toNumber();}var e=new kt(t).multiply(this.gap).toNumber();return e<0?0:e>100?100:e}},{key:"parsePos",value:function(t){var e=Math.round(t/this.gap);return this.getValueByIndex(e)}},{key:"isActiveByPos",value:function(t){return this.processArray.some((function(e){var r=wt(e,2),n=r[0],o=r[1];return t>=n&&t<=o}))}},{key:"getValues",value:function(){if(this.data)return this.data;for(var t=[],e=0;e<=this.total;e++)t.push(new kt(e).multiply(this.interval).plus(this.min).toNumber());return t}},{key:"getRangeDir",value:function(t){return t?new kt(t).divide(new kt(this.data?this.data.length-1:this.max).minus(this.data?0:this.min).toNumber()).multiply(100).toNumber():100}},{key:"emitError",value:function(t){this.onError&&this.onError(t,Tt[t]);}},{key:"getDotRange",value:function(t,e,r){if(!this.dotOptions)return r;var n=Array.isArray(this.dotOptions)?this.dotOptions[t]:this.dotOptions;return n&&void 0!==n[e]?this.parseValue(n[e]):r}},{key:"markList",get:function(){var t=this;if(!this.marks)return [];var e=function(e,r){var n=t.parseValue(e);return St({pos:n,value:e,label:e,active:t.isActiveByPos(n)},r)};return !0===this.marks?this.getValues().map((function(t){return e(t)})):"[object Object]"===Object.prototype.toString.call(this.marks)?Object.keys(this.marks).sort((function(t,e){return +t-+e})).map((function(r){var n=t.marks[r];return e(r,"string"!==typeof n?n:{label:n})})):Array.isArray(this.marks)?this.marks.map((function(t){return e(t)})):"function"===typeof this.marks?this.getValues().map((function(e){return {value:e,result:t.marks(e)}})).filter((function(t){var e=t.result;return !!e})).map((function(t){var r=t.value,n=t.result;return e(r,n)})):[]}},{key:"processArray",get:function(){if(this.process){if("function"===typeof this.process)return this.process(this.dotsPos);if(1===this.dotsPos.length)return [[0,this.dotsPos[0]]];if(this.dotsPos.length>1)return [[Math.min.apply(Math,jt(this.dotsPos)),Math.max.apply(Math,jt(this.dotsPos))]]}return []}},{key:"total",get:function(){var t=0;return t=this.data?this.data.length-1:new kt(this.max).minus(this.min).divide(this.interval).toNumber(),t-Math.floor(t)!==0?(this.emitError(gt.INTERVAL),0):t}},{key:"gap",get:function(){return 100/this.total}},{key:"minRangeDir",get:function(){return this.cacheRangeDir[this.minRange]?this.cacheRangeDir[this.minRange]:this.cacheRangeDir[this.minRange]=this.getRangeDir(this.minRange)}},{key:"maxRangeDir",get:function(){return this.cacheRangeDir[this.maxRange]?this.cacheRangeDir[this.maxRange]:this.cacheRangeDir[this.maxRange]=this.getRangeDir(this.maxRange)}},{key:"valuePosRange",get:function(){var t=this,e=this.dotsPos,r=[];return e.forEach((function(n,o){r.push([Math.max(t.minRange?t.minRangeDir*o:0,t.enableCross?0:e[o-1]||0,t.getDotRange(o,"min",0)),Math.min(t.minRange?100-t.minRangeDir*(e.length-1-o):100,t.enableCross?100:e[o+1]||100,t.getDotRange(o,"max",100))]);})),r}},{key:"dotsIndex",get:function(){var t=this;return this.dotsValue.map((function(e){return t.getIndexByValue(e)}))}}]),t}();function Bt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Ht(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}function zt(t,e,r){return e&&Ht(t.prototype,e),r&&Ht(t,r),t}var Ut=function(){function t(e){Bt(this,t),this.states=0,this.map=e;}return zt(t,[{key:"add",value:function(t){this.states|=t;}},{key:"delete",value:function(t){this.states&=~t;}},{key:"toggle",value:function(t){this.has(t)?this.delete(t):this.add(t);}},{key:"has",value:function(t){return !!(this.states&t)}}]),t}();r("4abb");function Ft(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n);}return r}function $t(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Ft(Object(r),!0).forEach((function(e){Yt(t,e,r[e]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Ft(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e));}));}return t}function Wt(t,e){return qt(t)||Xt(t,e)||Qt(t,e)||Gt()}function Gt(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function Xt(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done);n=!0)if(r.push(a.value),e&&r.length===e)break}catch(u){o=!0,i=u;}finally{try{n||null==s["return"]||s["return"]();}finally{if(o)throw i}}return r}}function qt(t){if(Array.isArray(t))return t}function Yt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Kt(t){return te(t)||Zt(t)||Qt(t)||Jt()}function Jt(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function Qt(t,e){if(t){if("string"===typeof t)return ee(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return "Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ee(t,e):void 0}}function Zt(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function te(t){if(Array.isArray(t))return ee(t)}function ee(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function re(t){return re="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},re(t)}function ne(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function oe(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}function ie(t,e,r){return e&&oe(t.prototype,e),r&&oe(t,r),t}function ae(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&se(t,e);}function se(t,e){return se=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},se(t,e)}function ue(t){var e=de();return function(){var r,n=fe(t);if(e){var o=fe(this).constructor;r=Reflect.construct(n,arguments,o);}else r=n.apply(this,arguments);return le(this,r)}}function le(t,e){return !e||"object"!==re(e)&&"function"!==typeof e?ce(t):e}function ce(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function de(){if("undefined"===typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"===typeof Proxy)return !0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return !1}}function fe(t){return fe=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},fe(t)}var he={None:0,Drag:2,Focus:4},pe=4,ye=function(){var t=function(t){ae(r,t);var e=ue(r);function r(){var t;return ne(this,r),t=e.apply(this,arguments),t.states=new Ut(he),t.scale=1,t.focusDotIndex=0,t}return ie(r,[{key:"isObjectData",value:function(t){return !!t&&"[object Object]"===Object.prototype.toString.call(t)}},{key:"isObjectArrayData",value:function(t){return !!t&&Array.isArray(t)&&t.length>0&&"object"===re(t[0])}},{key:"onValueChanged",value:function(){this.control&&!this.states.has(he.Drag)&&this.isNotSync&&this.control.setValue(this.modelValue);}},{key:"created",value:function(){this.initControl();}},{key:"mounted",value:function(){this.bindEvent();}},{key:"beforeDestroy",value:function(){this.unbindEvent();}},{key:"bindEvent",value:function(){document.addEventListener("touchmove",this.dragMove,{passive:!1}),document.addEventListener("touchend",this.dragEnd,{passive:!1}),document.addEventListener("mousedown",this.blurHandle),document.addEventListener("mousemove",this.dragMove),document.addEventListener("mouseup",this.dragEnd),document.addEventListener("mouseleave",this.dragEnd),document.addEventListener("keydown",this.keydownHandle);}},{key:"unbindEvent",value:function(){document.removeEventListener("touchmove",this.dragMove),document.removeEventListener("touchend",this.dragEnd),document.removeEventListener("mousedown",this.blurHandle),document.removeEventListener("mousemove",this.dragMove),document.removeEventListener("mouseup",this.dragEnd),document.removeEventListener("mouseleave",this.dragEnd),document.removeEventListener("keydown",this.keydownHandle);}},{key:"setScale",value:function(){this.scale=new kt(Math.floor(this.isHorizontal?this.$el.offsetWidth:this.$el.offsetHeight)).divide(100).toNumber();}},{key:"initControl",value:function(){var t=this;this.control=new Lt({value:this.modelValue,data:this.sliderData,enableCross:this.enableCross,fixed:this.fixed,max:this.max,min:this.min,interval:this.interval,minRange:this.minRange,maxRange:this.maxRange,order:this.order,marks:this.sliderMarks,included:this.included,process:this.process,adsorb:this.adsorb,dotOptions:this.dotOptions,onError:this.emitError}),["data","enableCross","fixed","max","min","interval","minRange","maxRange","order","marks","process","adsorb","included","dotOptions"].forEach((function(e){t.$watch(e,(function(r){if("data"===e&&Array.isArray(t.control.data)&&Array.isArray(r)&&t.control.data.length===r.length&&r.every((function(e,r){return e===t.control.data[r]})))return !1;switch(e){case"data":case"dataLabel":case"dataValue":t.control.data=t.sliderData;break;case"mark":t.control.marks=t.sliderMarks;break;default:t.control[e]=r;}["data","max","min","interval"].indexOf(e)>-1&&t.control.syncDotsPos();}));}));}},{key:"syncValueByPos",value:function(){var t=this.control.dotsValue;if(this.isDiff(t,Array.isArray(this.modelValue)?this.modelValue:[this.modelValue])){var e=1===t.length?t[0]:Kt(t);this.$emit("change",e,this.focusDotIndex),this.$emit("update:modelValue",e);}}},{key:"isDiff",value:function(t,e){return t.length!==e.length||t.some((function(t,r){return t!==e[r]}))}},{key:"emitError",value:function(t,e){this.silent||console.error("[VueSlider error]: ".concat(e)),this.$emit("error",t,e);}},{key:"dragStartOnProcess",value:function(t){if(this.dragOnClick){this.setScale();var e=this.getPosByEvent(t),r=this.control.getRecentDot(e);if(this.dots[r].disabled)return;this.dragStart(r),this.control.setDotPos(e,this.focusDotIndex),this.lazy||this.syncValueByPos();}}},{key:"dragStart",value:function(t){this.focusDotIndex=t,this.setScale(),this.states.add(he.Drag),this.states.add(he.Focus),this.$emit("drag-start",this.focusDotIndex);}},{key:"dragMove",value:function(t){if(!this.states.has(he.Drag))return !1;t.preventDefault();var e=this.getPosByEvent(t);this.isCrossDot(e),this.control.setDotPos(e,this.focusDotIndex),this.lazy||this.syncValueByPos();var r=this.control.dotsValue;this.$emit("dragging",1===r.length?r[0]:Kt(r),this.focusDotIndex);}},{key:"isCrossDot",value:function(t){if(this.canSort){var e=this.focusDotIndex,r=t;if(r>this.dragRange[1]?(r=this.dragRange[1],this.focusDotIndex++):r<this.dragRange[0]&&(r=this.dragRange[0],this.focusDotIndex--),e!==this.focusDotIndex){var n=this.$refs["dot-".concat(this.focusDotIndex)];n&&n.$el&&n.$el.focus(),this.control.setDotPos(r,e);}}}},{key:"dragEnd",value:function(t){var e=this;if(!this.states.has(he.Drag))return !1;setTimeout((function(){e.lazy&&e.syncValueByPos(),e.included&&e.isNotSync?e.control.setValue(e.modelValue):e.control.syncDotsPos(),e.states.delete(he.Drag),e.useKeyboard&&!("targetTouches"in t)||e.states.delete(he.Focus),e.$emit("drag-end",e.focusDotIndex);}));}},{key:"blurHandle",value:function(t){if(!this.states.has(he.Focus)||!this.$refs.container||this.$refs.container.contains(t.target))return !1;this.states.delete(he.Focus);}},{key:"clickHandle",value:function(t){if(!this.clickable||this.disabled)return !1;if(!this.states.has(he.Drag)){this.setScale();var e=this.getPosByEvent(t);this.setValueByPos(e);}}},{key:"focus",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;t.disabled||(this.states.add(he.Focus),this.focusDotIndex=e);}},{key:"blur",value:function(){this.states.delete(he.Focus);}},{key:"getValue",value:function(){var t=this.control.dotsValue;return 1===t.length?t[0]:t}},{key:"getIndex",value:function(){var t=this.control.dotsIndex;return 1===t.length?t[0]:t}},{key:"setValue",value:function(t){this.control.setValue(Array.isArray(t)?Kt(t):[t]),this.syncValueByPos();}},{key:"setIndex",value:function(t){var e=this,r=Array.isArray(t)?t.map((function(t){return e.control.getValueByIndex(t)})):this.control.getValueByIndex(t);this.setValue(r);}},{key:"setValueByPos",value:function(t){var e=this,r=this.control.getRecentDot(t);if(this.disabled||this.dots[r].disabled)return !1;this.focusDotIndex=r,this.control.setDotPos(t,r),this.syncValueByPos(),this.useKeyboard&&this.states.add(he.Focus),setTimeout((function(){e.included&&e.isNotSync?e.control.setValue(e.modelValue):e.control.syncDotsPos();}));}},{key:"keydownHandle",value:function(t){var e=this;if(!this.useKeyboard||!this.states.has(he.Focus))return !1;var r=this.included&&this.marks,n=pt(t,{direction:this.direction,max:r?this.control.markList.length-1:this.control.total,min:0,hook:this.keydownHook});if(n){t.preventDefault();var o=-1,i=0;r?(this.control.markList.some((function(t,r){return t.value===e.control.dotsValue[e.focusDotIndex]&&(o=n(r),!0)})),o<0?o=0:o>this.control.markList.length-1&&(o=this.control.markList.length-1),i=this.control.markList[o].pos):(o=n(this.control.getIndexByValue(this.control.dotsValue[this.focusDotIndex])),i=this.control.parseValue(this.control.getValueByIndex(o))),this.isCrossDot(i),this.control.setDotPos(i,this.focusDotIndex),this.syncValueByPos();}}},{key:"getPosByEvent",value:function(t){return ht(t,this.$el,this.isReverse)[this.isHorizontal?"x":"y"]/this.scale}},{key:"renderSlot",value:function(t,e,r){var n=this.$slots[t];return n?n(e):r}},{key:"render",value:function(){var t=this;return Object(a["createVNode"])("div",Object(a["mergeProps"])({ref:"container",class:this.containerClasses,style:this.containerStyles,onClick:this.clickHandle,onTouchstart:this.dragStartOnProcess,onMousedown:this.dragStartOnProcess},this.$attrs),[Object(a["createVNode"])("div",{class:"vue-slider-rail",style:this.railStyle},[this.processArray.map((function(e,r){return t.renderSlot("process",e,Object(a["createVNode"])("div",{class:"vue-slider-process",key:"process-".concat(r),style:e.style},null))})),this.sliderMarks?Object(a["createVNode"])("div",{class:"vue-slider-marks"},[this.control.markList.map((function(e,r){var n,o=t.renderSlot("step",e,null),i=t.renderSlot("label",e,null);return t.renderSlot("mark",e,Object(a["createVNode"])(Object(a["resolveComponent"])("vue-slider-mark"),{key:"mark-".concat(r),mark:e,hideLabel:t.hideLabel,style:(n={},Yt(n,t.isHorizontal?"height":"width","100%"),Yt(n,t.isHorizontal?"width":"height",t.tailSize),Yt(n,t.mainDirection,"".concat(e.pos,"%")),n),stepStyle:t.stepStyle,stepActiveStyle:t.stepActiveStyle,labelStyle:t.labelStyle,labelActiveStyle:t.labelActiveStyle,onPressLabel:function(e){return t.clickable&&t.setValueByPos(e)},stepSlot:o,labelSlot:i},null))}))]):null,this.dots.map((function(e,r){var n,o=t.renderSlot("dot",e,null),i=t.renderSlot("tooltip",e,null);return Object(a["createVNode"])(Object(a["resolveComponent"])("vue-slider-dot"),Object(a["mergeProps"])({ref:"dot-".concat(r),key:"dot-".concat(r),value:e.value,disabled:e.disabled,focus:e.focus,"dot-style":[e.style,e.disabled?e.disabledStyle:null,e.focus?e.focusStyle:null],tooltip:e.tooltip||t.tooltip,"tooltip-style":[t.tooltipStyle,e.tooltipStyle,e.disabled?e.tooltipDisabledStyle:null,e.focus?e.tooltipFocusStyle:null],"tooltip-formatter":Array.isArray(t.sliderTooltipFormatter)?t.sliderTooltipFormatter[r]:t.sliderTooltipFormatter,"tooltip-placement":t.tooltipDirections[r],style:[t.dotBaseStyle,(n={},Yt(n,t.mainDirection,"".concat(e.pos,"%")),Yt(n,"transition","".concat(t.mainDirection," ").concat(t.animateTime,"s")),n)],onDragStart:function(){return t.dragStart(r)},role:"slider","aria-valuenow":e.value,"aria-valuemin":t.min,"aria-valuemax":t.max,"aria-orientation":t.isHorizontal?"horizontal":"vertical",tabindex:"0",nativeOnFocus:function(){return t.focus(e,r)},nativeOnBlur:function(){return t.blur()}},{attrs:t.dotAttrs},{dotSlot:o,tooltipSlot:i}),null)})),this.renderSlot("default",{value:this.getValue()},null)])])}},{key:"tailSize",get:function(){return dt((this.isHorizontal?this.height:this.width)||pe)}},{key:"containerClasses",get:function(){return ["vue-slider",["vue-slider-".concat(this.direction)],{"vue-slider-disabled":this.disabled}]}},{key:"containerStyles",get:function(){var t=Array.isArray(this.dotSize)?this.dotSize:[this.dotSize,this.dotSize],e=Wt(t,2),r=e[0],n=e[1],o=this.width?dt(this.width):this.isHorizontal?"auto":dt(pe),i=this.height?dt(this.height):this.isHorizontal?dt(pe):"auto";return {padding:this.contained?"".concat(n/2,"px ").concat(r/2,"px"):this.isHorizontal?"".concat(n/2,"px 0"):"0 ".concat(r/2,"px"),width:o,height:i}}},{key:"processArray",get:function(){var t=this;return this.control.processArray.map((function(e,r){var n,o=Wt(e,3),i=o[0],a=o[1],s=o[2];if(i>a){var u=[a,i];i=u[0],a=u[1];}var l=t.isHorizontal?"width":"height";return {start:i,end:a,index:r,style:$t($t((n={},Yt(n,t.isHorizontal?"height":"width","100%"),Yt(n,t.isHorizontal?"top":"left",0),Yt(n,t.mainDirection,"".concat(i,"%")),Yt(n,l,"".concat(a-i,"%")),Yt(n,"transitionProperty","".concat(l,",").concat(t.mainDirection)),Yt(n,"transitionDuration","".concat(t.animateTime,"s")),n),t.processStyle),s)}}))}},{key:"dotBaseStyle",get:function(){var t,e=Array.isArray(this.dotSize)?this.dotSize:[this.dotSize,this.dotSize],r=Wt(e,2),n=r[0],o=r[1];return t=this.isHorizontal?Yt({transform:"translate(".concat(this.isReverse?"50%":"-50%",", -50%)"),WebkitTransform:"translate(".concat(this.isReverse?"50%":"-50%",", -50%)"),top:"50%"},"ltr"===this.direction?"left":"right","0"):Yt({transform:"translate(-50%, ".concat(this.isReverse?"50%":"-50%",")"),WebkitTransform:"translate(-50%, ".concat(this.isReverse?"50%":"-50%",")"),left:"50%"},"btt"===this.direction?"bottom":"top","0"),$t({width:"".concat(n,"px"),height:"".concat(o,"px")},t)}},{key:"mainDirection",get:function(){switch(this.direction){case"ltr":return "left";case"rtl":return "right";case"btt":return "bottom";case"ttb":return "top"}}},{key:"isHorizontal",get:function(){return "ltr"===this.direction||"rtl"===this.direction}},{key:"isReverse",get:function(){return "rtl"===this.direction||"btt"===this.direction}},{key:"tooltipDirections",get:function(){var t=this.tooltipPlacement||(this.isHorizontal?"top":"left");return Array.isArray(t)?t:this.dots.map((function(){return t}))}},{key:"dots",get:function(){var t=this;return this.control.dotsPos.map((function(e,r){return $t({pos:e,index:r,value:t.control.dotsValue[r],focus:t.states.has(he.Focus)&&t.focusDotIndex===r,disabled:t.disabled,style:t.dotStyle},(Array.isArray(t.dotOptions)?t.dotOptions[r]:t.dotOptions)||{})}))}},{key:"animateTime",get:function(){return this.states.has(he.Drag)?0:this.duration}},{key:"canSort",get:function(){return this.order&&!this.minRange&&!this.maxRange&&!this.fixed&&this.enableCross}},{key:"sliderData",get:function(){var t=this;return this.isObjectArrayData(this.vData)?this.vData.map((function(e){return e[t.dataValue]})):this.isObjectData(this.vData)?Object.keys(this.vData):this.vData}},{key:"sliderMarks",get:function(){var t=this;return this.marks?this.marks:this.isObjectArrayData(this.vData)?function(e){var r={label:e};return t.vData.some((function(n){return n[t.dataValue]===e&&(r.label=n[t.dataLabel],!0)})),r}:this.isObjectData(this.vData)?this.vData:void 0}},{key:"sliderTooltipFormatter",get:function(){var t=this;if(this.tooltipFormatter)return this.tooltipFormatter;if(this.isObjectArrayData(this.vData))return function(e){var r=""+e;return t.vData.some((function(n){return n[t.dataValue]===e&&(r=n[t.dataLabel],!0)})),r};if(this.isObjectData(this.vData)){var e=this.vData;return function(t){return e[t]}}}},{key:"isNotSync",get:function(){var t=this.control.dotsValue;return Array.isArray(this.modelValue)?this.modelValue.length!==t.length||this.modelValue.some((function(e,r){return e!==t[r]})):this.modelValue!==t[0]}},{key:"dragRange",get:function(){var t=this.dots[this.focusDotIndex-1],e=this.dots[this.focusDotIndex+1];return [t?t.pos:-1/0,e?e.pos:1/0]}}]),r}(V);return s([N({default:0})],t.prototype,"modelValue",void 0),s([N({type:Boolean,default:!1})],t.prototype,"silent",void 0),s([N({default:"ltr",validator:function(t){return ["ltr","rtl","ttb","btt"].indexOf(t)>-1}})],t.prototype,"direction",void 0),s([N({type:[Number,String]})],t.prototype,"width",void 0),s([N({type:[Number,String]})],t.prototype,"height",void 0),s([N({default:14})],t.prototype,"dotSize",void 0),s([N({default:!1})],t.prototype,"contained",void 0),s([N({type:Number,default:0})],t.prototype,"min",void 0),s([N({type:Number,default:100})],t.prototype,"max",void 0),s([N({type:Number,default:1})],t.prototype,"interval",void 0),s([N({type:Boolean,default:!1})],t.prototype,"disabled",void 0),s([N({type:Boolean,default:!0})],t.prototype,"clickable",void 0),s([N({type:Boolean,default:!1})],t.prototype,"dragOnClick",void 0),s([N({type:Number,default:.5})],t.prototype,"duration",void 0),s([N({type:[Array,Object]})],t.prototype,"vData",void 0),s([N({type:String,default:"value"})],t.prototype,"dataValue",void 0),s([N({type:String,default:"label"})],t.prototype,"dataLabel",void 0),s([N({type:Boolean,default:!1})],t.prototype,"lazy",void 0),s([N({type:String,validator:function(t){return ["none","always","focus","hover","active"].indexOf(t)>-1},default:"active"})],t.prototype,"tooltip",void 0),s([N({type:[String,Array],validator:function(t){return (Array.isArray(t)?t:[t]).every((function(t){return ["top","right","bottom","left"].indexOf(t)>-1}))}})],t.prototype,"tooltipPlacement",void 0),s([N({type:[String,Array,Function]})],t.prototype,"tooltipFormatter",void 0),s([N({type:Boolean,default:!0})],t.prototype,"useKeyboard",void 0),s([N(Function)],t.prototype,"keydownHook",void 0),s([N({type:Boolean,default:!0})],t.prototype,"enableCross",void 0),s([N({type:Boolean,default:!1})],t.prototype,"fixed",void 0),s([N({type:Boolean,default:!0})],t.prototype,"order",void 0),s([N(Number)],t.prototype,"minRange",void 0),s([N(Number)],t.prototype,"maxRange",void 0),s([N({type:[Boolean,Object,Array,Function],default:!1})],t.prototype,"marks",void 0),s([N({type:[Boolean,Function],default:!0})],t.prototype,"process",void 0),s([N(Boolean)],t.prototype,"included",void 0),s([N(Boolean)],t.prototype,"adsorb",void 0),s([N(Boolean)],t.prototype,"hideLabel",void 0),s([N()],t.prototype,"dotOptions",void 0),s([N()],t.prototype,"dotAttrs",void 0),s([N()],t.prototype,"railStyle",void 0),s([N()],t.prototype,"processStyle",void 0),s([N()],t.prototype,"dotStyle",void 0),s([N()],t.prototype,"tooltipStyle",void 0),s([N()],t.prototype,"stepStyle",void 0),s([N()],t.prototype,"stepActiveStyle",void 0),s([N()],t.prototype,"labelStyle",void 0),s([N()],t.prototype,"labelActiveStyle",void 0),s([T("modelValue")],t.prototype,"onValueChanged",null),t=s([_({name:"VueSlider",emits:["change","drag-start","dragging","drag-end","error","update:modelValue"],data:function(){return {control:null}},components:{VueSliderDot:K,VueSliderMark:ct}})],t),t}(),ve=ye;ve.VueSliderMark=ct,ve.VueSliderDot=K;var me=ve;e["default"]=me;}})["default"]}));
  	
  } (vueSliderComponent_umd_min));

  var VueSlider = /*@__PURE__*/getDefaultExportFromCjs(vueSliderComponent_umd_min.exports);

  var script$3 = {
    extends: script$k,
    name: QuestionType.Slider,
    components: { VueSlider },

    data() {
      return {
        interval: null,
        value: null,
        canReceiveFocus: true,
        marks: [],
        options: {
          contained: true,
          useKeyboard: true,
          tooltip: false,
          interval: String(this.question.interval),
          min: this.question.min,
          max: this.question.max,
          marks: this.transformMarks(this.question.marks),
        },
      };
    },
    computed: {
      showClearButton() {
        return this.value !== null;
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.slider.$el.querySelector(".vue-slider-dot").style.left = "50%";
      });

      this.interval = setInterval(() => {
        if (this.value === null && !!this.$refs.slider)
          this.$refs.slider.$el.querySelector(".vue-slider-dot").style.left =
            "50%";
      }, 0);
    },
    methods: {
      focus() {
        this.$refs.slider.focus(this.$refs.slider);
      },
      blur() {
        this.$refs.slider.blur(this.$refs.slider);
      },
      clear() {
        this.value = null;
      },
      broadcastOnChange(e) {
        this.onChange({ target: { value: e } });
      },
      transformMarks(marks) {
        return marks.reduce(
          (acc, mark) => ({ ...acc, [`${mark.value}`]: mark.label }),
          {}
        );
      },
      validate() {
        return Number.isInteger(this.value) && this.value >= 0;
      },
    },
    watch: {
      value(newValue) {
        clearInterval(this.interval);
        if (newValue > this.options.max) {
          this.value = this.options.max;
        } else if (newValue < this.options.min) {
          this.value = this.options.min;
        }
      },
    },
  };

  const _hoisted_1$2 = {
    key: 0,
    class: "vff-animate f-fade-in f-enter"
  };
  const _hoisted_2$2 = ["aria-label"];

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_vue_slider = require$$0.resolveComponent("vue-slider");

    return (require$$0.openBlock(), require$$0.createElementBlock("div", null, [
      require$$0.createVNode(_component_vue_slider, require$$0.mergeProps({
        modelValue: $data.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.value) = $event)),
        ref: "slider"
      }, $data.options, { onChange: $options.broadcastOnChange }), null, 16 /* FULL_PROPS */, ["modelValue", "onChange"]),
      require$$0.createElementVNode("div", null, [
        require$$0.withDirectives(require$$0.createElementVNode("input", {
          class: "faux-form hidden",
          type: "number",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($data.value) = $event)),
          max: "100"
        }, null, 512 /* NEED_PATCH */), [
          [require$$0.vModelText, $data.value]
        ]),
        ($options.showClearButton)
          ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_1$2, [
              require$$0.createElementVNode("a", {
                href: "#",
                onClick: _cache[2] || (_cache[2] = require$$0.withModifiers((...args) => ($options.clear && $options.clear(...args)), ["prevent"])),
                "aria-label": _ctx.language.ariaClear
              }, [
                require$$0.createElementVNode("span", null, require$$0.toDisplayString(_ctx.language.clear), 1 /* TEXT */)
              ], 8 /* PROPS */, _hoisted_2$2)
            ]))
          : require$$0.createCommentVNode("v-if", true)
      ])
    ]))
  }

  script$3.render = render$2;
  script$3.__scopeId = "data-v-7d43d832";
  script$3.__file = "src/components/QuestionTypes/SliderType.vue";

  var script$2 = {
    name: "FlowFormQuestion",

    components: {
      FlowFormDateType: script$6,
      FlowFormDropdownType: script$j,
      FlowFormEmailType: script$g,
      FlowFormLongTextType: script$e,
      FlowFormMultipleChoiceType: script$d,
      FlowFormMultiplePictureChoiceType: script$c,
      FlowFormNumberType: script$b,
      FlowFormPasswordType: script$a,
      FlowFormPhoneType: script$9,
      FlowFormSectionBreakType: script$8,
      FlowFormTextType: script$h,
      FlowFormFileType: script$5,
      FlowFormUrlType: script$7,
      FlowFormMatrixType: script$4,
      FlowFormSliderType: script$3,
    },

    props: {
      question: QuestionModel,
      language: LanguageModel,
      value: [String, Array, Boolean, Number, Object],
      active: {
        type: Boolean,
        default: false,
      },
      reverse: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      autofocus: {
        type: Boolean,
        default: true,
      },
    },

    mixins: [IsMobile],

    data() {
      return {
        QuestionType: QuestionType,
        dataValue: null,
        debounced: false,
      };
    },

    mounted() {
      this.autofocus && this.focusField();

      this.dataValue = this.question.answer;

      this.$refs.qanimate.addEventListener("animationend", this.onAnimationEnd);
    },

    beforeUnmount() {
      this.$refs.qanimate.removeEventListener(
        "animationend",
        this.onAnimationEnd
      );
    },

    methods: {
      /**
       * Autofocus the input box of the current question
       */
      focusField() {
        const el = this.$refs.questionComponent;

        el && el.focus();
      },

      onAnimationEnd() {
        this.autofocus && this.focusField();
      },

      shouldFocus() {
        const q = this.$refs.questionComponent;

        return q && q.canReceiveFocus && !q.focused;
      },

      returnFocus() {
        this.$refs.questionComponent;

        if (this.shouldFocus()) {
          this.focusField();
        }
      },

      /**
       * Emits "answer" event and calls "onEnter" method on Enter press
       */
      onEnter($event) {
        this.checkAnswer(this.emitAnswer);
      },

      onTab($event) {
        this.checkAnswer(this.emitAnswerTab);
      },

      checkAnswer(fn) {
        const q = this.$refs.questionComponent;

        if (
          q.isValid() &&
          this.question.isMultipleChoiceType() &&
          this.question.nextStepOnAnswer &&
          !this.question.multiple
        ) {
          this.$emit("disable", true);

          this.debounce(() => {
            fn(q);
            this.$emit("disable", false);
          }, 350);
        } else {
          fn(q);
        }
      },

      emitAnswer(q) {
        if (q) {
          if (!q.focused) {
            this.$emit("answer", q);
          }

          q.onEnter();
        }
      },

      emitAnswerTab(q) {
        if (q && this.question.type !== QuestionType.Date) {
          this.returnFocus();
          this.$emit("answer", q);

          q.onEnter();
        }
      },

      debounce(fn, delay) {
        let debounceTimer;
        this.debounced = true;

        return (() => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(fn, delay);
        })();
      },

      /**
       * Check if the "OK" button should be shown.
       */
      showOkButton() {
        const q = this.$refs.questionComponent;

        if (this.question.type === QuestionType.SectionBreak) {
          return this.active;
        }

        if (!this.question.required) {
          return true;
        }

        if (this.question.allowOther && this.question.other) {
          return true;
        }

        if (
          this.question.isMultipleChoiceType() &&
          !this.question.multiple &&
          this.question.nextStepOnAnswer
        ) {
          return false;
        }

        // If there is no question referenced, or dataValue is still set to its default (null).
        // This allows a ChoiceOption value of false, but will not allow you to use null as a value.
        if (!q || this.dataValue === null) {
          return false;
        }

        return q.hasValue && q.isValid();
      },

      showSkip() {
        const q = this.$refs.questionComponent;

        // We might not have a reference to the question component at first
        // but we know that if we don't, it's definitely empty
        return !this.question.required && (!q || !q.hasValue);
      },

      /**
       * Determins if the invalid message should be shown.
       */
      showInvalid() {
        const q = this.$refs.questionComponent;

        if (!q || this.dataValue === null) {
          return false;
        }

        return q.showInvalid();
      },
    },

    computed: {
      mainClasses: {
        cache: false,
        get() {
          const classes = {
            "q-is-active": this.active,
            "q-is-inactive": !this.active,
            "f-fade-in-down": this.reverse,
            "f-fade-in-up": !this.reverse,
            "f-focused":
              this.$refs.questionComponent &&
              this.$refs.questionComponent.focused,
            "f-has-value":
              this.$refs.questionComponent &&
              this.$refs.questionComponent.hasValue,
          };

          classes[
            "field-" +
              this.question.type
                .toLowerCase()
                .substring(8, this.question.type.length - 4)
          ] = true;

          return classes;
        },
      },

      showHelperText() {
        if (this.question.subtitle) {
          return true;
        }

        if (
          this.question.type === QuestionType.LongText ||
          this.question.type === QuestionType.MultipleChoice
        ) {
          return this.question.helpTextShow;
        }

        return false;
      },

      errorMessage() {
        const q = this.$refs.questionComponent;

        if (q && q.errorMessage) {
          return q.errorMessage;
        }

        return this.language.invalidPrompt;
      },
    },
  };

  const _hoisted_1$1 = { class: "q-inner" };
  const _hoisted_2$1 = {
    key: 0,
    class: "f-tagline"
  };
  const _hoisted_3$1 = {
    key: 0,
    class: "fh2"
  };
  const _hoisted_4$1 = {
    key: 1,
    class: "f-text"
  };
  const _hoisted_5$1 = ["aria-label"];
  const _hoisted_6$1 = /*#__PURE__*/require$$0.createElementVNode("span", { "aria-hidden": "true" }, "*", -1 /* HOISTED */);
  const _hoisted_7$1 = [
    _hoisted_6$1
  ];
  const _hoisted_8$1 = {
    key: 1,
    class: "f-answer"
  };
  const _hoisted_9$1 = {
    key: 2,
    class: "f-sub"
  };
  const _hoisted_10$1 = { key: 0 };
  const _hoisted_11$1 = ["innerHTML"];
  const _hoisted_12$1 = {
    key: 2,
    class: "f-help"
  };
  const _hoisted_13$1 = {
    key: 3,
    class: "f-help"
  };
  const _hoisted_14$1 = {
    key: 3,
    class: "f-answer f-full-width"
  };
  const _hoisted_15$1 = {
    key: 0,
    class: "f-description"
  };
  const _hoisted_16$1 = { key: 0 };
  const _hoisted_17$1 = ["href", "target"];
  const _hoisted_18$1 = {
    key: 0,
    class: "vff-animate f-fade-in f-enter"
  };
  const _hoisted_19$1 = ["aria-label"];
  const _hoisted_20 = { key: 0 };
  const _hoisted_21 = { key: 1 };
  const _hoisted_22 = { key: 2 };
  const _hoisted_23 = ["innerHTML"];
  const _hoisted_24 = {
    key: 1,
    class: "f-invalid",
    role: "alert",
    "aria-live": "assertive"
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (require$$0.openBlock(), require$$0.createElementBlock("div", {
      class: require$$0.normalizeClass(["vff-animate q-form", $options.mainClasses]),
      ref: "qanimate"
    }, [
      require$$0.createElementVNode("div", _hoisted_1$1, [
        require$$0.createElementVNode("div", {
          class: require$$0.normalizeClass({
            'f-section-wrap': $props.question.type === $data.QuestionType.SectionBreak,
          })
        }, [
          require$$0.createElementVNode("div", {
            class: require$$0.normalizeClass({ fh2: $props.question.type !== $data.QuestionType.SectionBreak })
          }, [
            ($props.question.tagline)
              ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_2$1, require$$0.toDisplayString($props.question.tagline), 1 /* TEXT */))
              : require$$0.createCommentVNode("v-if", true),
            ($props.question.title)
              ? (require$$0.openBlock(), require$$0.createElementBlock(require$$0.Fragment, { key: 1 }, [
                  ($props.question.type === $data.QuestionType.SectionBreak)
                    ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_3$1, require$$0.toDisplayString($props.question.title), 1 /* TEXT */))
                    : (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_4$1, [
                        require$$0.createTextVNode(require$$0.toDisplayString($props.question.title) + "  ", 1 /* TEXT */),
                        require$$0.createCommentVNode(" Required questions are marked by an asterisk (*) "),
                        ($props.question.required)
                          ? (require$$0.openBlock(), require$$0.createElementBlock("span", {
                              key: 0,
                              class: "f-required",
                              "aria-label": $props.language.ariaRequired,
                              role: "note"
                            }, _hoisted_7$1, 8 /* PROPS */, _hoisted_5$1))
                          : require$$0.createCommentVNode("v-if", true),
                        ($props.question.inline)
                          ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_8$1, [
                              (require$$0.openBlock(), require$$0.createBlock(require$$0.resolveDynamicComponent($props.question.type), {
                                ref: "questionComponent",
                                question: $props.question,
                                language: $props.language,
                                modelValue: $data.dataValue,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.dataValue) = $event)),
                                active: $props.active,
                                disabled: $props.disabled,
                                onNext: $options.onEnter
                              }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["question", "language", "modelValue", "active", "disabled", "onNext"]))
                            ]))
                          : require$$0.createCommentVNode("v-if", true)
                      ]))
                ], 64 /* STABLE_FRAGMENT */))
              : require$$0.createCommentVNode("v-if", true),
            ($options.showHelperText)
              ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_9$1, [
                  ($props.question.subtitle)
                    ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_10$1, require$$0.toDisplayString($props.question.subtitle), 1 /* TEXT */))
                    : require$$0.createCommentVNode("v-if", true),
                  ($props.question.type === $data.QuestionType.LongText && !_ctx.isMobile)
                    ? (require$$0.openBlock(), require$$0.createElementBlock("span", {
                        key: 1,
                        class: "f-help",
                        innerHTML: 
                  $props.question.helpText ||
                  $props.language.formatString($props.language.longTextHelpText)
                
                      }, null, 8 /* PROPS */, _hoisted_11$1))
                    : require$$0.createCommentVNode("v-if", true),
                  (
                  $props.question.type === $data.QuestionType.MultipleChoice &&
                  $props.question.multiple
                )
                    ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_12$1, require$$0.toDisplayString($props.question.helpText || $props.language.multipleChoiceHelpText), 1 /* TEXT */))
                    : ($props.question.type === $data.QuestionType.MultipleChoice)
                      ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_13$1, require$$0.toDisplayString($props.question.helpText || $props.language.multipleChoiceHelpTextSingle), 1 /* TEXT */))
                      : require$$0.createCommentVNode("v-if", true)
                ]))
              : require$$0.createCommentVNode("v-if", true),
            (!$props.question.inline)
              ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_14$1, [
                  (require$$0.openBlock(), require$$0.createBlock(require$$0.resolveDynamicComponent($props.question.type), {
                    ref: "questionComponent",
                    question: $props.question,
                    language: $props.language,
                    modelValue: $data.dataValue,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($data.dataValue) = $event)),
                    active: $props.active,
                    disabled: $props.disabled,
                    onNext: $options.onEnter
                  }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["question", "language", "modelValue", "active", "disabled", "onNext"]))
                ]))
              : require$$0.createCommentVNode("v-if", true)
          ], 2 /* CLASS */),
          ($props.question.description || $props.question.descriptionLink.length !== 0)
            ? (require$$0.openBlock(), require$$0.createElementBlock("p", _hoisted_15$1, [
                ($props.question.description)
                  ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_16$1, require$$0.toDisplayString($props.question.description), 1 /* TEXT */))
                  : require$$0.createCommentVNode("v-if", true),
                (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList($props.question.descriptionLink, (link, index) => {
                  return (require$$0.openBlock(), require$$0.createElementBlock("a", {
                    class: "f-link",
                    key: 'm' + index,
                    href: link.url,
                    target: link.target
                  }, require$$0.toDisplayString(link.text || link.url), 9 /* TEXT, PROPS */, _hoisted_17$1))
                }), 128 /* KEYED_FRAGMENT */))
              ]))
            : require$$0.createCommentVNode("v-if", true)
        ], 2 /* CLASS */),
        ($options.showOkButton())
          ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_18$1, [
              require$$0.createElementVNode("button", {
                class: "o-btn-action",
                type: "button",
                ref: "button",
                href: "#",
                onClick: _cache[2] || (_cache[2] = require$$0.withModifiers((...args) => ($options.onEnter && $options.onEnter(...args)), ["prevent"])),
                "aria-label": $props.language.ariaOk
              }, [
                ($props.question.type === $data.QuestionType.SectionBreak)
                  ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_20, require$$0.toDisplayString($props.language.continue), 1 /* TEXT */))
                  : ($options.showSkip())
                    ? (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_21, require$$0.toDisplayString($props.language.skip), 1 /* TEXT */))
                    : (require$$0.openBlock(), require$$0.createElementBlock("span", _hoisted_22, require$$0.toDisplayString($props.language.ok), 1 /* TEXT */))
              ], 8 /* PROPS */, _hoisted_19$1),
              ($props.question.type !== $data.QuestionType.LongText || !_ctx.isMobile)
                ? (require$$0.openBlock(), require$$0.createElementBlock("a", {
                    key: 0,
                    class: "f-enter-desc",
                    href: "#",
                    onClick: _cache[3] || (_cache[3] = require$$0.withModifiers((...args) => ($options.onEnter && $options.onEnter(...args)), ["prevent"])),
                    innerHTML: $props.language.formatString($props.language.pressEnter)
                  }, null, 8 /* PROPS */, _hoisted_23))
                : require$$0.createCommentVNode("v-if", true)
            ]))
          : require$$0.createCommentVNode("v-if", true),
        ($options.showInvalid())
          ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_24, require$$0.toDisplayString($options.errorMessage), 1 /* TEXT */))
          : require$$0.createCommentVNode("v-if", true)
      ])
    ], 2 /* CLASS */))
  }

  script$2.render = render$1;
  script$2.__file = "src/components/FlowFormQuestion.vue";

  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  const instances = {};

  const ComponentInstance = {
    methods: {
      getInstance(id) {
        return instances[id]
      },

      setInstance() {
        instances[this.id] = this;
      }
    }
  };

  var script$1 = {
    name: "FlowForm",

    components: {
      FlowFormQuestion: script$2,
    },

    props: {
      questions: {
        type: Array,
        validator: (value) => value.every((q) => q instanceof QuestionModel),
      },
      language: {
        type: LanguageModel,
        default: () => new LanguageModel(),
      },
      progressbar: {
        type: Boolean,
        default: true,
      },
      standalone: {
        type: Boolean,
        default: true,
      },
      navigation: {
        type: Boolean,
        default: true,
      },
      timer: {
        type: Boolean,
        default: false,
      },
      timerStartStep: [String, Number],
      timerStopStep: [String, Number],
      autofocus: {
        type: Boolean,
        default: true,
      },
    },

    mixins: [IsMobile, ComponentInstance],

    data() {
      return {
        questionRefs: [],
        completed: false,
        submitted: false,
        activeQuestionIndex: 0,
        questionList: [],
        questionListActivePath: [],
        reverse: false,
        timerOn: false,
        timerInterval: null,
        time: 0,
        disabled: false,
      };
    },

    mounted() {
      document.addEventListener("keyup", this.onKeyUpListener, true);
      window.addEventListener("beforeunload", this.onBeforeUnload);

      this.setQuestions();
      this.checkTimer();
    },

    beforeUnmount() {
      document.removeEventListener("keydown", this.onKeyDownListener);
      document.removeEventListener("keyup", this.onKeyUpListener, true);
      window.removeEventListener("beforeunload", this.onBeforeUnload);

      this.stopTimer();
    },

    beforeUpdate() {
      this.questionRefs = [];
    },

    computed: {
      numActiveQuestions() {
        return this.questionListActivePath.length;
      },

      activeQuestion() {
        return this.questionListActivePath[this.activeQuestionIndex];
      },

      activeQuestionId() {
        const question = this.questionModels[this.activeQuestionIndex];

        if (this.isOnLastStep) {
          return "_submit";
        }

        if (question && question.id) {
          return question.id;
        }

        return null;
      },

      numCompletedQuestions() {
        let num = 0;

        this.questionListActivePath.forEach((question) => {
          if (question.answered) {
            ++num;
          }
        });

        return num;
      },

      percentCompleted() {
        if (!this.numActiveQuestions) {
          return 0;
        }

        return Math.floor(
          (this.numCompletedQuestions / this.numActiveQuestions) * 100
        );
      },

      isOnLastStep() {
        return (
          this.numActiveQuestions > 0 &&
          this.activeQuestionIndex === this.questionListActivePath.length
        );
      },

      isOnTimerStartStep() {
        if (this.activeQuestionId === this.timerStartStep) {
          return true;
        }

        if (
          !this.timerOn &&
          !this.timerStartStep &&
          this.activeQuestionIndex === 0
        ) {
          return true;
        }

        return false;
      },

      isOnTimerStopStep() {
        if (this.submitted) {
          return true;
        }

        if (this.activeQuestionId === this.timerStopStep) {
          return true;
        }

        return false;
      },

      questionModels: {
        cache: false,

        get() {
          if (this.questions && this.questions.length) {
            return this.questions;
          }

          const questions = [];
          if (!this.questions) {
            const classMap = {
              options: ChoiceOption,
              descriptionLink: LinkOption,
            };

            const defaultSlot = this.$slots.default();
            let children = null;

            if (defaultSlot && defaultSlot.length) {
              children = defaultSlot[0].children;
              if (!children) {
                children = defaultSlot;
              }
            }

            if (children) {
              children
                .filter((q) => q.type && q.type.name.indexOf("Question") !== -1)
                .forEach((q) => {
                  const props = q.props;
                  const componentInstance = this.getInstance(props.id);
                  let model = new QuestionModel();

                  if (componentInstance.question !== null) {
                    model = componentInstance.question;
                  }

                  if (props.modelValue) {
                    model.answer = props.modelValue;
                  }

                  Object.keys(model).forEach((key) => {
                    if (props[key] !== undefined) {
                      if (typeof model[key] === "boolean") {
                        model[key] = props[key] !== false;
                      } else if (key in classMap) {
                        const classReference = classMap[key],
                          options = [];

                        props[key].forEach((option) => {
                          const instance = new classReference();

                          Object.keys(instance).forEach((instanceKey) => {
                            if (option[instanceKey] !== undefined) {
                              instance[instanceKey] = option[instanceKey];
                            }
                          });

                          options.push(instance);
                        });

                        model[key] = options;
                      } else {
                        switch (key) {
                          case "type":
                            if (
                              Object.values(QuestionType).indexOf(props[key]) !==
                              -1
                            ) {
                              model[key] = props[key];
                            } else {
                              for (const questionTypeKey in QuestionType) {
                                if (
                                  questionTypeKey.toLowerCase() ===
                                  props[key].toLowerCase()
                                ) {
                                  model[key] = QuestionType[questionTypeKey];
                                  break;
                                }
                              }
                            }
                            break;

                          default:
                            model[key] = props[key];
                            break;
                        }
                      }
                    }
                  });

                  componentInstance.question = model;

                  model.resetOptions();

                  questions.push(model);
                });
            }
          }

          return questions;
        },
      },
    },

    methods: {
      setQuestionRef(el) {
        this.questionRefs.push(el);
      },

      /**
       * Returns currently active question component (if any).
       */
      activeQuestionComponent() {
        return this.questionRefs[this.activeQuestionIndex];
      },

      setQuestions() {
        this.setQuestionListActivePath();
        this.setQuestionList();
      },

      /**
       * This method goes through all questions and sets the ones
       * that are in the current path (taking note of logic jumps)
       */
      setQuestionListActivePath() {
        const questions = [];

        if (!this.questionModels.length) {
          return;
        }

        let index = 0,
          serialIndex = 0,
          nextId,
          activeIndex = this.activeQuestionIndex;

        do {
          let question = this.questionModels[index];

          if (questions.some((q) => q === question)) {
            break;
          }

          question.setIndex(serialIndex);
          question.language = this.language;

          questions.push(question);

          if (!question.jump) {
            ++index;
          } else if (question.answered) {
            nextId = question.getJumpId();

            if (nextId) {
              if (nextId === "_submit") {
                index = this.questionModels.length;
              } else {
                for (let i = 0; i < this.questionModels.length; i++) {
                  if (this.questionModels[i].id === nextId) {
                    if (
                      i < index &&
                      questions.some((q) => q === this.questionModels[i])
                    ) {
                      question.answered = false;
                      activeIndex = i;
                      ++index;
                    } else {
                      index = i;
                    }
                    break;
                  }
                }
              }
            } else {
              ++index;
            }
          } else {
            index = this.questionModels.length;
          }

          ++serialIndex;
        } while (index < this.questionModels.length);

        this.questionListActivePath = questions;
        this.goToQuestion(activeIndex);
      },

      /**
       * Sets the question list array
       * (all questions up to, and including, the current one)
       */
      setQuestionList() {
        const questions = [];

        for (let index = 0; index < this.questionListActivePath.length; index++) {
          const question = this.questionListActivePath[index];

          questions.push(question);

          if (!question.answered) {
            if (this.completed) {
              // The "completed" status changed - user probably changed an
              // already entered answer.
              this.completed = false;
            }
            break;
          }
        }

        this.questionList = questions;
      },

      /**
       * If we have any answered questions, notify user before leaving
       * the page.
       */
      onBeforeUnload(event) {
        if (this.activeQuestionIndex > 0 && !this.submitted) {
          event.preventDefault();
          event.returnValue = "";
        }
      },

      /**
       * Global key listeners, listen for Enter or Tab key events.
       */
      onKeyDownListener(e) {
        if (e.key !== "Tab" || this.submitted) {
          return;
        }

        if (e.shiftKey) {
          e.stopPropagation();
          e.preventDefault();

          if (this.navigation) {
            this.goToPreviousQuestion();
          }
        } else {
          const q = this.activeQuestionComponent();

          if (q.shouldFocus()) {
            e.preventDefault();

            q.focusField();
          } else {
            e.stopPropagation();

            this.emitTab();
            this.reverse = false;
          }
        }
      },

      onKeyUpListener(e) {
        if (
          e.shiftKey ||
          ["Tab", "Enter"].indexOf(e.key) === -1 ||
          this.submitted
        ) {
          return;
        }

        const q = this.activeQuestionComponent();

        if (e.key === "Tab" && q.shouldFocus()) {
          q.focusField();
        } else {
          if (e.key === "Enter") {
            this.emitEnter();
          }

          e.stopPropagation();
          this.reverse = false;
        }
      },

      emitEnter() {
        if (this.disabled) {
          return;
        }

        const q = this.activeQuestionComponent();

        if (q) {
          // Send enter event to the current question component
          q.onEnter();
        } else if (this.completed && this.isOnLastStep) {
          // We're finished - submit form
          this.submit();
        }
      },

      emitTab() {
        const q = this.activeQuestionComponent();

        if (q) {
          // Send tab event to the current question component
          q.onTab();
        } else {
          this.emitEnter();
        }
      },

      submit() {
        this.emitSubmit();
        this.submitted = true;
      },

      emitComplete() {
        this.$emit("complete", this.completed, this.questionList);
      },

      emitSubmit() {
        this.$emit("submit", this.questionList);
      },

      /**
       * Checks if we have another question and if we
       * can jump to it.
       */
      isNextQuestionAvailable() {
        if (this.submitted) {
          return false;
        }

        const q = this.activeQuestion;
        if (q && !q.required) {
          return true;
        }

        if (this.completed && !this.isOnLastStep) {
          return true;
        }

        return this.activeQuestionIndex < this.questionList.length - 1;
      },

      /**
       * Triggered by the "answer" event in the Question component
       */
      onQuestionAnswered(question) {
        if (question.isValid()) {
          this.$emit("answer", question.question);

          if (this.activeQuestionIndex < this.questionListActivePath.length) {
            ++this.activeQuestionIndex;
          }

          this.$nextTick(() => {
            this.reverse = false;

            this.setQuestions();
            this.checkTimer();
            // Nested $nextTick so we're 100% sure that setQuestions
            // actually updated the question array
            this.$nextTick(() => {
              const q = this.activeQuestionComponent();

              if (q) {
                this.autofocus && q.focusField();
                this.activeQuestionIndex = q.question.index;
              } else if (this.isOnLastStep) {
                // No more questions left - set "completed" to true
                this.completed = true;
                this.activeQuestionIndex = this.questionListActivePath.length;

                this.$refs.button && this.$refs.button.focus();
              }

              this.$emit("step", this.activeQuestionId, this.activeQuestion);
            });
          });
        } else if (this.completed) {
          this.completed = false;
        }
      },

      /**
       * Jumps to previous question.
       */
      goToPreviousQuestion() {
        this.blurFocus();

        if (this.activeQuestionIndex > 0 && !this.submitted) {
          if (this.isOnTimerStopStep) {
            this.startTimer();
          }

          --this.activeQuestionIndex;

          this.reverse = true;

          this.checkTimer();
        }
      },

      /**
       * Jumps to next question.
       */
      goToNextQuestion() {
        this.blurFocus();

        if (this.isNextQuestionAvailable()) {
          this.emitEnter();
        }

        this.reverse = false;
      },

      /**
       * Jumps to question with specific index.
       */
      goToQuestion(index) {
        if (isNaN(+index)) {
          let questionIndex = this.activeQuestionIndex;

          this.questionListActivePath.forEach((question, _index) => {
            if (question.id === index) {
              questionIndex = _index;
            }
          });

          index = questionIndex;
        }

        if (index !== this.activeQuestionIndex) {
          this.blurFocus();

          if (
            !this.submitted &&
            index <= this.questionListActivePath.length - 1
          ) {
            // Check if we can actually jump to the wanted question.
            do {
              const previousQuestionsAnswered = this.questionListActivePath
                .slice(0, index)
                .every((q) => q.answered);

              if (previousQuestionsAnswered) {
                break;
              }

              --index;
            } while (index > 0);

            this.reverse = index < this.activeQuestionIndex;
            this.activeQuestionIndex = index;

            this.checkTimer();
          }
        }
      },

      /**
       * Removes focus from the currently focused DOM element.
       */
      blurFocus() {
        document.activeElement &&
          document.activeElement.blur &&
          document.activeElement.blur();
      },

      checkTimer() {
        if (this.timer) {
          if (this.isOnTimerStartStep) {
            this.startTimer();
          } else if (this.isOnTimerStopStep) {
            this.stopTimer();
          }
        }
      },

      startTimer() {
        if (this.timer && !this.timerOn) {
          this.timerInterval = setInterval(this.incrementTime, 1000);
          this.timerOn = true;
        }
      },

      stopTimer() {
        if (this.timerOn) {
          clearInterval(this.timerInterval);
        }

        this.timerOn = false;
      },

      incrementTime() {
        ++this.time;

        this.$emit("timer", this.time, this.formatTime(this.time));
      },

      formatTime(seconds) {
        let startIndex = 14,
          length = 5;

        if (seconds >= 60 * 60) {
          startIndex = 11;
          length = 8;
        }

        return new Date(1000 * seconds).toISOString().substr(startIndex, length);
      },

      setDisabled(state) {
        this.disabled = state;
      },

      reset() {
        this.questionModels.forEach((question) => question.resetAnswer());
        this.goToQuestion(0);
      },
    },

    watch: {
      completed() {
        this.emitComplete();
      },

      submitted() {
        this.stopTimer();
      },
    },
  };

  const _hoisted_1 = { class: "f-container" };
  const _hoisted_2 = { class: "f-form-wrap" };
  const _hoisted_3 = {
    key: 0,
    class: "vff-animate f-fade-in-up field-submittype"
  };
  const _hoisted_4 = { class: "f-section-wrap" };
  const _hoisted_5 = { class: "fh2" };
  const _hoisted_6 = ["aria-label"];
  const _hoisted_7 = ["innerHTML"];
  const _hoisted_8 = {
    key: 2,
    class: "text-success"
  };
  const _hoisted_9 = { class: "vff-footer" };
  const _hoisted_10 = { class: "footer-inner-wrap" };
  const _hoisted_11 = { class: "f-progress-bar" };
  const _hoisted_12 = {
    key: 1,
    class: "f-nav"
  };
  const _hoisted_13 = ["aria-label"];
  const _hoisted_14 = /*#__PURE__*/require$$0.createElementVNode("svg", {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    width: "42.333px",
    height: "28.334px",
    viewBox: "78.833 5.5 42.333 28.334",
    "aria-hidden": "true"
  }, [
    /*#__PURE__*/require$$0.createElementVNode("path", { d: "M82.039,31.971L100,11.442l17.959,20.529L120,30.187L101.02,8.492c-0.258-0.295-0.629-0.463-1.02-0.463c-0.39,0-0.764,0.168-1.02,0.463L80,30.187L82.039,31.971z" })
  ], -1 /* HOISTED */);
  const _hoisted_15 = {
    class: "f-nav-text",
    "aria-hidden": "true"
  };
  const _hoisted_16 = ["aria-label"];
  const _hoisted_17 = /*#__PURE__*/require$$0.createElementVNode("svg", {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    width: "42.333px",
    height: "28.334px",
    viewBox: "78.833 5.5 42.333 28.334",
    "aria-hidden": "true"
  }, [
    /*#__PURE__*/require$$0.createElementVNode("path", { d: "M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z" })
  ], -1 /* HOISTED */);
  const _hoisted_18 = {
    class: "f-nav-text",
    "aria-hidden": "true"
  };
  const _hoisted_19 = {
    key: 2,
    class: "f-timer"
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_flow_form_question = require$$0.resolveComponent("flow-form-question");

    return (require$$0.openBlock(), require$$0.createElementBlock("div", {
      class: require$$0.normalizeClass(["vff", {
        'vff-not-standalone': !$props.standalone,
        'vff-is-mobile': _ctx.isMobile,
        'vff-is-ios': _ctx.isIos,
      }])
    }, [
      require$$0.createElementVNode("div", _hoisted_1, [
        require$$0.createElementVNode("div", _hoisted_2, [
          (require$$0.openBlock(true), require$$0.createElementBlock(require$$0.Fragment, null, require$$0.renderList($data.questionList, (q, index) => {
            return (require$$0.openBlock(), require$$0.createBlock(_component_flow_form_question, {
              ref_for: true,
              ref: $options.setQuestionRef,
              question: q,
              language: $props.language,
              key: 'q' + index,
              active: q.index === $data.activeQuestionIndex,
              modelValue: q.answer,
              "onUpdate:modelValue": $event => ((q.answer) = $event),
              onAnswer: $options.onQuestionAnswered,
              reverse: $data.reverse,
              disabled: $data.disabled,
              onDisable: $options.setDisabled,
              autofocus: $props.autofocus
            }, null, 8 /* PROPS */, ["question", "language", "active", "modelValue", "onUpdate:modelValue", "onAnswer", "reverse", "disabled", "onDisable", "autofocus"]))
          }), 128 /* KEYED_FRAGMENT */)),
          require$$0.renderSlot(_ctx.$slots, "default"),
          require$$0.createCommentVNode(" Complete/Submit screen slots "),
          ($options.isOnLastStep)
            ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_3, [
                require$$0.renderSlot(_ctx.$slots, "complete", {}, () => [
                  require$$0.createCommentVNode(" Default content for the \"complete\" slot "),
                  require$$0.createElementVNode("div", _hoisted_4, [
                    require$$0.createElementVNode("p", null, [
                      require$$0.createElementVNode("span", _hoisted_5, require$$0.toDisplayString($props.language.thankYouText), 1 /* TEXT */)
                    ])
                  ])
                ]),
                require$$0.renderSlot(_ctx.$slots, "completeButton", {}, () => [
                  require$$0.createCommentVNode(" Default content for the \"completeButton\" slot "),
                  (!$data.submitted)
                    ? (require$$0.openBlock(), require$$0.createElementBlock("button", {
                        key: 0,
                        class: "o-btn-action",
                        ref: "button",
                        type: "button",
                        href: "#",
                        onClick: _cache[0] || (_cache[0] = require$$0.withModifiers($event => ($options.submit()), ["prevent"])),
                        "aria-label": $props.language.ariaSubmitText
                      }, [
                        require$$0.createElementVNode("span", null, require$$0.toDisplayString($props.language.submitText), 1 /* TEXT */)
                      ], 8 /* PROPS */, _hoisted_6))
                    : require$$0.createCommentVNode("v-if", true),
                  (!$data.submitted)
                    ? (require$$0.openBlock(), require$$0.createElementBlock("a", {
                        key: 1,
                        class: "f-enter-desc",
                        href: "#",
                        onClick: _cache[1] || (_cache[1] = require$$0.withModifiers($event => ($options.submit()), ["prevent"])),
                        innerHTML: $props.language.formatString($props.language.pressEnter)
                      }, null, 8 /* PROPS */, _hoisted_7))
                    : require$$0.createCommentVNode("v-if", true),
                  ($data.submitted)
                    ? (require$$0.openBlock(), require$$0.createElementBlock("p", _hoisted_8, require$$0.toDisplayString($props.language.successText), 1 /* TEXT */))
                    : require$$0.createCommentVNode("v-if", true)
                ])
              ]))
            : require$$0.createCommentVNode("v-if", true)
        ])
      ]),
      require$$0.createElementVNode("div", _hoisted_9, [
        require$$0.createElementVNode("div", _hoisted_10, [
          ($props.progressbar)
            ? (require$$0.openBlock(), require$$0.createElementBlock("div", {
                key: 0,
                class: require$$0.normalizeClass(["f-progress", {
              'not-started': $options.percentCompleted === 0,
              completed: $options.percentCompleted === 100,
            }])
              }, [
                require$$0.createElementVNode("div", _hoisted_11, [
                  require$$0.createElementVNode("div", {
                    class: "f-progress-bar-inner",
                    style: require$$0.normalizeStyle('width: ' + $options.percentCompleted + '%;')
                  }, null, 4 /* STYLE */)
                ]),
                require$$0.createTextVNode(" " + require$$0.toDisplayString($props.language.percentCompleted.replace(":percent", $options.percentCompleted)), 1 /* TEXT */)
              ], 2 /* CLASS */))
            : require$$0.createCommentVNode("v-if", true),
          ($props.navigation)
            ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_12, [
                require$$0.createElementVNode("a", {
                  class: require$$0.normalizeClass(["f-prev", {
                'f-disabled': $data.activeQuestionIndex === 0 || $data.submitted,
              }]),
                  href: "#",
                  onClick: _cache[2] || (_cache[2] = require$$0.withModifiers($event => ($options.goToPreviousQuestion()), ["prevent"])),
                  role: "button",
                  "aria-label": $props.language.ariaPrev
                }, [
                  _hoisted_14,
                  require$$0.createElementVNode("span", _hoisted_15, require$$0.toDisplayString($props.language.prev), 1 /* TEXT */)
                ], 10 /* CLASS, PROPS */, _hoisted_13),
                require$$0.createElementVNode("a", {
                  class: require$$0.normalizeClass(["f-next", { 'f-disabled': !$options.isNextQuestionAvailable() }]),
                  href: "#",
                  onClick: _cache[3] || (_cache[3] = require$$0.withModifiers($event => ($options.goToNextQuestion()), ["prevent"])),
                  role: "button",
                  "aria-label": $props.language.ariaNext
                }, [
                  _hoisted_17,
                  require$$0.createElementVNode("span", _hoisted_18, require$$0.toDisplayString($props.language.next), 1 /* TEXT */)
                ], 10 /* CLASS, PROPS */, _hoisted_16)
              ]))
            : require$$0.createCommentVNode("v-if", true),
          ($props.timer)
            ? (require$$0.openBlock(), require$$0.createElementBlock("div", _hoisted_19, [
                require$$0.createElementVNode("span", null, require$$0.toDisplayString($options.formatTime($data.time)), 1 /* TEXT */)
              ]))
            : require$$0.createCommentVNode("v-if", true)
        ])
      ])
    ], 2 /* CLASS */))
  }

  script$1.render = render;
  script$1.__file = "src/components/FlowForm.vue";

  var script = {
      name: 'Question',

      mixins: [
        ComponentInstance
      ],

      props: {
        id: null,
        modelValue: [String, Array, Boolean, Number, Object]
      },
      
      data() {
        return {
          question: null
        }
      },

      mounted() {
        this.setInstance();
      },

      render() {
        return null
      },

      watch: {
        'question.answer'(val) {
          this.$emit('update:modelValue', val);
        }
      }
    };

  script.__file = "src/components/Question.vue";

  exports.ChoiceOption = ChoiceOption;
  exports.FlowForm = script$1;
  exports.LanguageModel = LanguageModel;
  exports.LinkOption = LinkOption;
  exports.MarkOption = MarkOption;
  exports.MaskPresets = MaskPresets;
  exports.MatrixColumn = MatrixColumn;
  exports.MatrixRow = MatrixRow;
  exports.Question = script;
  exports.QuestionModel = QuestionModel;
  exports.QuestionType = QuestionType;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
