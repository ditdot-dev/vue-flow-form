# Vue Form

<p align="center">
  <img src="https://www.ditdot.hr/demo/v-form/visuals/v-form-green-full-rotate-01.png" alt="v-form screenshots">
</p>


## Demo

* [Questionnaire example](https://www.ditdot.hr)
* [Quiz example](https://www.ditdot.hr)

## Example Project

Requirements:

* [Node.js](https://nodejs.org/en/) version 8.9 or above (8.11.0+ recommended)
* [npm](https://www.npmjs.com/get-npm) version 3+ (or [yarn](https://yarnpkg.com/lang/en/docs/install/) version 1.16+)
* [Git](https://git-scm.com/)

After checking the prerequisites, follow these simple steps to install and use Vue Form:

```shell
# clone the repo
$ git clone https://github.com/ditdot-dev/vue-flow-form.git myproject

# go into app's directory and install dependencies:
$ cd myproject
```

If you use npm:

```shell
$ npm install

# serve with hot reload at localhost:8080 by default.
$ npm run serve

# build for production
$ npm run build
```

If you use yarn:

```shell
$ yarn install

# serve with hot reload at localhost:8080 by default.
$ yarn serve

# build for production
$ yarn build
```

Made with [Vue.js](https://vuejs.org/)

## Usage as npm package

```shell
npm install vue-flow-form --save
```

And then in your App.vue file:

```vue
<template>
 <flow-form v-bind:questions="questions" />
</template>

<script>
  // Import necessary components and classes
  import FlowForm from 'vue-flow-form/src/components/FlowForm'
  import QuestionModel, { QuestionType, ChoiceOption } from 'vue-flow-form/src/models/QuestionModel'

  export default {
    name: 'example',
    components: {
      FlowForm
    },
    data() {
      return {
        questions: [
          // QuestioModel array
        ]
      }
    }
  }
</script>
```

## JavaScript via CDN

HTML:

```html
  ...
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.min.js"></script>
  <!-- Flow Form -->
  <script src="https://unpkg.com/vue-flow-form@1.0.0"></script>
  ...
```

JavaScript:

```js
var app = new Vue({
  el: '#app',
  data: function() {
    return {
      questions: [
        new FlowForm.default.QuestionModel({
          question: '...',
          type: FlowForm.default.QuestionType.MultipleChoice,
          options: [
            new FlowForm.default.ChoiceOption({
              label: '...'
            })
          ]
        })
      ]
    }
  }
});
```
## Browser Support

Modern browsers and IE11.

## License

[MIT](https://github.com/ditdot-dev/vue-flow-form/blob/master/LICENSE) license.
