# Vue Flow Form

Create conversational conditional-logic forms with Vue.js.

<p>
  <a href="https://github.com/ditdot-dev/vue-flow-form/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@ditdot-dev/vue-flow-form.svg?sanitize=true&amp;color=41B883" alt="License" /></a>
  <a href="https://www.npmjs.com/package/@ditdot-dev/vue-flow-form"><img src="https://img.shields.io/npm/v/@ditdot-dev/vue-flow-form.svg?sanitize=true&amp;color=41B883" alt="Version" /></a>
</p>

<p align="center">
  <img src="https://www.ditdot.hr/demo/vff/visuals/v-form-green-full-rotate-02.png" alt="v-form screenshots">
</p>

## Demo

* [Questionnaire example](https://www.ditdot.hr/demo/vff/questionnaire/)
* [Quiz example](https://www.ditdot.hr/demo/vff/quiz/)

## Project Documentation

* [Guide](https://www.ditdot.hr/en/docs/vue-flow-form-guide)

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

If you don't already have an existing Vue project, the easiest way to create one is to use [Vue CLI](https://cli.vuejs.org/):

```shell
$ npm install -g @vue/cli
# OR
$ yarn global add @vue/cli
```

And then create a project (refer to [Vue CLI documentation](https://cli.vuejs.org/guide/) and [issue tracker](https://github.com/vuejs/vue-cli/issues) for potential problems on Windows):

```shell
$ vue create my-project
$ cd my-project
```

To add Vue Flow Form as a dependency to your Vue project, use the following:

```shell
$ npm install @ditdot-dev/vue-flow-form --save
```

And then in your App.vue file:

```html
<template>
  <flow-form v-bind:questions="questions" v-bind:language="language" />
</template>

<script>
  // Import necessary components and classes
  import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

  export default {
    name: 'example',
    components: {
      FlowForm
    },
    data() {
      return {
        language: new LanguageModel({
          // Your language definitions here (optional).
          // You can leave out this prop if you want to use the default definitions.
        }),
        questions: [
          // QuestionModel array
          new QuestionModel({
            title: 'Question',
            type: QuestionType.MultipleChoice,
            options: [
              new ChoiceOption({
                label: 'Answer'
              })
            ]
          })
        ]
      }
    }
  }
</script>

<style>
  /* Import Vue Flow Form base CSS */
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
  /* Import one of the Vue Flow Form CSS themes (optional) */
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css';
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css';
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css';
</style>
```

## Usage with plain JavaScript via CDN

HTML:

```html
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.min.js"></script>
    <!-- Flow Form -->
    <script src="https://unpkg.com/@ditdot-dev/vue-flow-form@1.1.0"></script>
    <!-- Flow Form base CSS -->
    <link rel="stylesheet" href="https://unpkg.com/@ditdot-dev/vue-flow-form@1.1.0/dist/vue-flow-form.min.css">
    <!-- Optional theme.css -->
    <link rel="stylesheet" href="https://unpkg.com/@ditdot-dev/vue-flow-form@1.1.0/dist/vue-flow-form.theme-minimal.min.css">
  </head>
  <body>
    <div id="app">
      <flow-form v-bind:questions="questions" v-bind:language="language" />
    </div>
    <script src="app.js"></script>
  </body>
</html>
```

JavaScript (content of app.js):

```js
var app = new Vue({
  el: '#app',
  data: function() {
    return {
      language: new FlowForm.LanguageModel({
        // Your language definitions here (optional).
        // You can leave out this prop if you want to use the default definitions.
      }),
      questions: [
        new FlowForm.QuestionModel({
          title: 'Question',
          type: FlowForm.QuestionType.MultipleChoice,
          options: [
            new FlowForm.ChoiceOption({
              label: 'Answer'
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
