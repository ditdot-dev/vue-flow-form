// Import vue component
import FlowForm from './components/FlowForm.vue'
import Question from './components/Question.vue'
import QuestionModel, { QuestionType, ChoiceOption, LinkOption, MaskPresets, MatrixRow, MatrixColumn } from './models/QuestionModel'
import LanguageModel from './models/LanguageModel'

// To allow use as module (npm/webpack/etc.) export component
export {
  FlowForm,
  Question,
  QuestionModel,
  QuestionType,
  ChoiceOption,
  LinkOption,
  LanguageModel,
  MaskPresets,
  MatrixRow,
  MatrixColumn
}