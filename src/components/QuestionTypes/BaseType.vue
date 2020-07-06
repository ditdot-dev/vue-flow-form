<template></template>

<script>
import QuestionModel, { QuestionType } from "../../models/QuestionModel";
import LanguageModel from "../../models/LanguageModel";

export default {
  name: "BaseType",
  props: {
    language: LanguageModel,
    question: QuestionModel,
    active: Boolean,
    value: [String, Array]
  },
  data() {
    return {
      dirty: false,
      dataValue: "",
      answer: null,
      enterPressed: false,
      allowedChars: null
    };
  },
  mounted() {
    if (this.question.multiple) {
      this.dataValue = [];
    }
  },
  methods: {
    fixAnswer(answer) {
      return answer;
    },
    getElement() {
      let el = this.$refs.input;

      if (el && el.$el) {
        return el.$el;
      }

      return el;
    },
    focus() {
      const el = this.getElement();

      el && el.focus();
    },
    blur() {
      const el = this.getElement();

      el && el.blur();
    },
    onKeyDown($event) {
      this.enterPressed = false;
      clearTimeout(this.timeoutId);

      if (
        $event &&
        this.allowedChars !== null &&
        this.allowedChars.indexOf($event.key) === -1
      ) {
        $event.preventDefault();
        return false;
      }
    },
    onChange($event) {
      this.dirty = true;
      this.dataValue = $event.target.value;

      this.onKeyDown();

      if (this.question.config.inline) {
        const self = this;
        const delay = this.question.type === QuestionType.Dropdown ? 250 : 1000;

        this.timeoutId = setTimeout(function() {
          self.onEnter();
        }, delay);
      } else {
        if (this.question.type === QuestionType.Dropdown) {
          this.onEnter();
        } else {
          this.setAnswer(this.dataValue);
          this.emitAnswer();
        }
      }
    },
    onEnter() {
      this.enterPressed = true;
      this.goToNext();
    },
    goToNext() {
      if (this.question.type === QuestionType.SectionBreak) {
        this.dirty = true;
      }

      if (this.valid()) {
        this.enterPressed = true;
      }

      this.question.answered = false;

      this.dataValue = this.fixAnswer(this.dataValue);
      this.setAnswer(this.dataValue);
      this.question.answered = this.valid();
      this.emitAnswer();
      this.valid() ? this.blur() : this.focus();
    },
    setAnswer(answer) {
      if (!this.valid()) {
        this.question.answered = false;
      }

      this.answer = this.question.answer = answer;
    },
    emitAnswer() {
      this.$emit("input", this.answer);
    },
    valid() {
      if (!this.question.required && !this.hasValue && this.dirty) {
        return true;
      }

      if (
        this.question.mask &&
        this.dataValue.length !== this.question.mask.length
      ) {
        return false;
      }

      if (this.validate()) {
        return true;
      }

      return false;
    },
    validate() {
      return this.hasValue;
    },
    showInvalid() {
      return this.dirty && this.enterPressed && !this.valid();
    }
  },
  computed: {
    placeholder() {
      return this.question.placeholder || this.language.placeholder;
    },
    hasValue() {
      if (this.dataValue !== null) {
        let v = this.dataValue;

        if (v.trim) {
          v = v.trim();
        }

        return v.length > 0;
      }

      return false;
    }
  }
};
</script>

<style scoped></style>
