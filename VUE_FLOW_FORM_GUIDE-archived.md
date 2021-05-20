<article> 
    <header>
        <h1>
            Vue Flow Form Guide
        </h1>
        <p>
            <strong>You’re browsing the documentation for Vue Flow Form v1.1.7 and earlier, which works with Vue 2. Starting with v2.0.0, Vue Flow Form has migrated from Vue 2 to Vue 3. <a href="https://www.ditdot.hr/en/docs/vue-flow-form-guide">Click here</a> if you're looking for Vue 3 compatible documentation.</strong>
        </p>
    </header>
    <div>
        <h2 id="introduction">
            Introduction
        </h2>
        <p>
            This documentation is made to support the Vue Flow Form open-source project - to help users and to encourage contributors. Documentation includes the latest project info, examples, and how-to's.
        </p>
        <p>
            Vue Flow Form is a form generator <a href="http://vuejs.org">Vue</a> component, built as a lightweight solution with minimum dependencies. Create reactive, dynamic, and highly extensible forms with various field types, step-by-step interface, and conditional-logic. You can customize the appearance with slots and CSS variables.
        </p>
        <h2 id="features">
            Features
        </h2>
        <ul>
            <li>
            <a href="https://www.ditdot.hr/en/vue-flow-form">Vue Flow Form - Open Source Form Generator built with Vue.js</a></li>
        </ul>
        <h2 id="installation">
            Installation
        </h2>
        <ul>
            <li><a href="https://github.com/ditdot-dev/vue-form/blob/master/README.md">README on GitHub</a> covers installation in details</li>          
        </ul>
        <h2 id="basic-form">
            Creating a form
        </h2>
        <ul>
            <li>To create a new form, import the necessary components and classes into your app, in a way that depends on the installation method.</li>
            <li>Add the component to your template and register it either locally or globally.</li>
            <li>Define the form steps by passing the question options into <code>QuestionModel</code> class instances. Create as many <code>QuestionModel</code> instances as you like for your project by adding them inside the <code>questions</code> array in the <code>data</code> function.</li>
            <li>Include the pre-built theme file or your own custom theme into your application <a href="#theming"> #&darr;</a></li>
            <li>Add language model as <code>language</code> prop (optional) and define it by creating a new instance of <code>LanguageModel</code> and setting its properties. <a href="#multilanguage"> #&darr;</a></li>
            <li>Add <code>submit</code> and/or <code>complete</code> event listeners if you want to submit data to the backend. <a class="anchor-link" aria-hidden="true" href="#component-slots"> #&darr;</a></li>
        </ul>
        <h3 id="using-npm">
            When using npm
        </h3>
        <ul>
            <li>Import the <code>FlowForm</code> component itself, the <code>QuestionModel</code> class and <code>QuestionType</code> enum. If you're going to use the  <code>MultipleChoice</code> or <code>Dropdown</code> field type, import the <code>ChoiceOption</code> class
                <pre class="display-code"><code class="language-javascript">// import from npm package  
import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form';</code></pre></li>
            <li>Add <code>FlowForm</code> component with the question list as <code>questions</code> prop</li>
            <li>Define questions in the <code>questions</code> array</li>
            <li>Import base CSS and optional theme CSS <a href="#theming"> #&darr;</a></li>
        </ul>
        <h3  id="using-cdn">
            When using CDN
        </h3>
        <ul>
            <li>Requires at least Vue version 2.6.x</li>
            <li><a href="https://github.com/ditdot-dev/vue-flow-form#usage-with-plain-javascript-via-cdn">Usage with plain JavaScript via CDN</a></li>
            <li>Import Vue.js, FlowForm in either the head or before closing the body of your HTML document</li>
            <li>Import base CSS and theme CSS (optional) in the head of your HTML document <a href="#theming"> #&darr;</a></li>
            <li>Create new Vue instance in your app.js and add the <code>questions</code> array with <code>QuestionModel</code> instances</li>
        </ul>
        <h2 id="question-types">
            Question types
        </h2>
        <ul>
            <li>Text - <code>QuestionType.Text</code></li>
            <li>LongText (Textarea) - <code>QuestionType.LongText</code></li>
            <li>Number - <code>QuestionType.Number</code></li>
            <li>Email - <code>QuestionType.Email</code></li>
            <li>Phone - <code>QuestionType.Phone</code></li>
            <li>URL - <code>QuestionType.Url</code></li>
            <li>Password - <code>QuestionType.Password</code></li>
            <li>Date - <code>QuestionType.Date</code>
                <ul>
                    <li>A native input type="date" datepicker</li>
                    <li>Browsers that don't natively support it (like Safari) will fall back to a text input. You can use the <code>placeholder</code> attribute to describe the expected date format</li>
    <li>Alternatively, you can create a date input field by adding <code>mask</code> and <code>placeholder</code> attributes to <code>QuestionType.Phone</code>
<pre class="display-code"><code class="language-js">import { MaskPresets } from '@ditdot-dev/vue-flow-form';<br>
new QuestionModel({
  type: QuestionType.Phone,
  // use one of the MaskPresets constants or create your own - https://vuejs-tips.github.io/vue-the-mask/#tokens
  mask: MaskPresets.Date,
  placeholder: 'yyyy-mm-dd'
  // ...
});</code></pre>
</ul>
            </li>
            <li>Dropdown (Select) - <code>QuestionType.Dropdown</code></li>
            <li>MultipleChoice - <code>QuestionType.MultipleChoice</code></li>
            <li>MultiplePictureChoice - <code>QuestionType.MultiplePictureChoice</code></li>
            <li>SectionBreak - <code>QuestionType.SectionBreak</code></li>
        </ul>
        <h2 id="defining-questions">
            Defining questions
        </h2>
        <ul>
            <li>To define a question, create a new instance of <code>QuestionModel</code> and pass in the options
                <pre class="display-code"><code class="language-js">new QuestionModel({
  id: 'path_b',
  tagline: "Path B",
  title: 'Hmm, are you sure?',
  subtitle: 'Path A sounds like a winner! 😉',
  type: QuestionType.MultipleChoice,
  multiple: false,
  required: true,
  options: [
    new ChoiceOption({
      label: 'Ok, let\'s go with A',
      value: 'path_a'
    }),
    new ChoiceOption({
      label: 'Yes, finish the survey'
    })
  ],
  jump: {
    path_a: 'path_a'
  }
})</code></pre>
            </li>
        </ul>
            <h3 id="global-options">
                Global options
                <a class="anchor-link" aria-hidden="true" href="#global-options"><span class="anchor">#</span></a>
            </h3>
                <ul>
                    <li><code>type</code> - (one of <code>QuestionType</code> constants above)</li>
                    <li><code>id</code> - ID of the question (optional but necessary when using <code>jump</code>)</li>
                    <li><code>title</code> - main title</li>
                    <li><code>tagline</code> - text above question (optional)</li>
                    <li><code>subtitle</code> - text below question (optional)</li>
                    <li><code>description</code> - helper text below main content (optional)</li>
                    <li><code>descriptionLink</code> - add links below main content (optional):
                        <pre class="display-code"><code class="language-js">descriptionLink: [
  new LinkOption({
    url: 'https://www.example.com',
    text: 'Example link', // optional, default is link url
    target: '_self' // optional, default is '_blank'
  })
]</code></pre>
                        <ul>
                            <li>if description text is defined, links will be added to the end of the description text</li>
                        </ul>
                    </li>
                    <li><code>required</code> - is field required or not (true/false - default is false)
                        <ul>
                            <li>turn on/off the required asterisk indicator next to the question in
                                vue-flow-form/src/assets/css/common.css:
                                <pre class="display-code"><code class="language-css">.f-required {
  display: inline; /* or display: none; to turn off */
}</code></pre>
                            </li>
                        </ul>
                    </li>
                    <li><code>answer</code> - holds the user's answer after replying to a question. This can for example be used to pre-fill the answer to any of the questions.
                    <li><code>jump</code> - define which question to jump to after answering (function or object)
                        <ul>
                            <li><strong>function</strong>: it will get the question model as the only parameter and must return the ID to jump to</li>
                            <li><strong>object</strong>: must define object with possible answer values and jump IDs, eg.:
                                <pre class="display-code"><code class="language-js">{
  a: 'jump_a',
  b: 'jump_b',
  c: '_submit',
  _other: 'jump_other'
}</code></pre>
                            </li>
                            <li>
                                Object key <code>_other</code> will be used when no other keys match the answer. Object value
                                <code>_submit</code> will jump to form submit button
                            </li>
                        </ul>
                    </li>
                    <li><code>progressbar</code> You can disable the progress bar (UX recommendation if you have many logic jumps) by passing <code>false</code> to the <code>progressbar</code> prop on the FlowForm component instance: <pre class="display-code"><code class="language-html">&lt;flow-form v-bind:progressbar="false"&gt; &lt;!-- ... --&gt; &lt;/flow-form&gt;</code></pre></li>
                    <li><code>navigation</code> You can disable the footer backward/forward navigation and Shift + Tab backward navigation by passing <code>false</code> to the <code>navigation</code> prop on the FlowForm component instance: <pre class="display-code"><code class="language-html">&lt;flow-form v-bind:navigation="false"&gt; &lt;!-- ... --&gt; &lt;/flow-form&gt;</code></pre></li>
                    <li><code>timer</code> Timer option is available by passing <code>true</code> to the <code>timer</code> prop on the FlowForm component instance. By default, the timer starts on the first step and ends on submit. Start and stop steps can be changed by passing the question ID to the <code>timerStartStep</code> and/or <code>timerStopStep</code> props: <pre class="display-code"><code class="language-html">&lt;flow-form v-bind:timer="true" timer-start-step="id_1" timer-stop-step="id_2" &gt; &lt;!-- ... --&gt; &lt;/flow-form&gt;</code></pre></li>
                </ul>
            <h3 id="question-specific-options">
                Question specific options
            </h3>
                <ul>
                    <li><code>content</code> - used only with SectionBreak (optional)</li>
                    <li><code>options</code> - <code>ChoiceOption</code> array (used only with Dropdown and MultipleChoice)
                        <ul>
                            <li><code>ChoiceOption</code> must have a <code>label</code> defined (this is what will be shown to the user)</li>
                            <li>if <code>value</code> is not defined, <code>label</code> will be used</li>
                        </ul>
                    </li>
                    <li><code>inline</code> - displays the field next to the question, used only with Dropdown (true/false - default is false)</li>
                    <li><code>placeholder</code> - define custom placeholder for the input fields
                        <ul>
                            <li>if not defined, the default value from LanguageModel will be used </li>
                        </ul>
                    </li>
                    <li><code>mask</code> - input mask, used with Text, Email, Phone, Password and Number (optional)
                        <ul>
                            <li> <a href="https://vuejs-tips.github.io/vue-the-mask/">vue-the-mask</a> is used to provide the masked input option</li>
                        </ul>
                    </li>
                    <li><code>maxLength</code> - defines the maximum number of characters the user can enter into a Text, LongText, Number, Url, Phone, Password, Email or Date field</li>
                    <li><code>min</code> and <code>max</code> - specify the minimum and maximum value, used with Date (in "yyyy-mm-dd" format) and Number
                    <li><code>helpText</code> - help text, used only with LongText and MultipleChoice (optional)
                        <ul>
                            <li>if not defined, the default values from LanguageModel will be used</li>
                        </ul>
                    </li>
                    <li><code>helpTextShow</code> - show or hide help text, used only with LongText and MultipleChoice (true/false - default is true)
                    <li><code>multiple</code> - used only with MultipleChoice, defines if multiple answers can be chosen (true/false - default is false)</li>
                    <li><code>allowOther</code> - used only with MultipleChoice, adds custom text field to the MultipleChoice selection (true/false - default is false)</li>
                    <li><code>nextStepOnAnswer</code> - used only with MultipleChoice and only when <code>multiple</code> is set to <code>false</code>; takes you to the next step after selecting an option (true/false - default is false)</li>
                    <li><code>imageSrc</code> - used only with MultiplePictureChoice, adds image to the MultiplePictureChoice option</li>
                    <li><code>imageAlt</code> - used only with MultiplePictureChoice, adds alt text to the MultiplePictureChoice option image</li>
            </ul>
        <p>For additional guidance, check the <a href="https://github.com/ditdot-dev/vue-flow-form/blob/master/examples/questionnaire/Example.vue">Questionnaire</a> or other examples to see all question types defined.</p>
        <h2 id="question-components">
            Questions as components 
        </h2>
        <ul>
            <li>This feature allows dynamic questions and Vue's conditional rendering. Example usage:<pre class="display-code"><code class="language-html">&lt;template&gt;     
  &lt;flow-form&gt; 
    &lt;question type="text" title="Hello, what is your name?" v-model="name" &gt;&lt;/question&gt;
    &lt;question type="number" title="What is your age?" v-model="age"&gt;&lt;/question&gt;
    &lt;!-- name and age are stored in the FlowForm component's data and can be used in the following question --&gt;  
    &lt;question v-if="age < 18" type="sectionbreak" title="Sorry, you are under 18"&gt;&lt;/question&gt;
    &lt;question v-else type="sectionbreak" :title="'Nice to meet you, ' + name + '. Welcome to our site!'"&gt;&lt;/question&gt;
  &lt;/flow-form&gt;
&lt;/template&gt; <br>
&lt;script&gt;
  import FlowForm from '../../src/components/FlowForm.vue'
  import Question from '../../src/components/Question.vue'
  // If using the npm package, use the following line instead of the ones above.
  // import FlowForm, { Question } from '@ditdot-dev/vue-flow-form'<br>
  export default {
    name: 'example',
    components: {
      FlowForm,
      Question
    },
    data() {
      return {
        name: '',
        age: ''
      }
    }
  }
&lt;/script&gt;</code></pre>
            </li>
            <li>When using CDN, make sure to register the Question component locally:
                <pre class="display-code"><code class="language-js">export default {
    name: 'example',
    components: {
        question: FlowForm.Question 
    },
    ...
  }</code></pre>
            </li>
        </ul>
        <h2 id="component-events">
            FlowForm component events
        </h2>
        <ul>
            <li><code>complete</code> - emitted whenever the &quot;completed&quot; status changes, the first parameter is the status, the second is the question list, eg.:
                    <pre class="display-code"><code class="language-js">function onComplete(completed, questionList) {
  // Handle status change.
}</code></pre>
            </li>
            <li>If the user completes the form, then goes back and changes any of the answers to make them invalid, this event will again be called with <code>false</code> as the first parameter, so make sure to handle this correctly in your app.</li>
            <li><code>submit</code> - when the default &quot;submit&quot; button is clicked - if you override the default <code>completeButton</code> slot, this event won&#39;t be called (example in Example.vue)
                 <pre class="display-code"><code class="language-js">function onSubmit(questionList) {
  // Handle submit event. 
}</code></pre>
            </li>
            <li><code>answer</code> - gets fired after a question is answered
                <pre class="display-code"><code class="language-js">function onAnswer(questionAnswered) {
  // Handle answer event. 
}</code></pre>
            </li>
            <li><code>step</code> - gets fired when a new step is displayed
                <pre class="display-code"><code class="language-js">function onStep(activeQuestionId, activeQuestion) {
  // Handle step event. 
}</code></pre>
            </li>
        </ul>
        <h2 id="component-slots">
            FlowForm component slots
        </h2>
        <ul>
            <li><code>complete</code> - Complete/submit screen content
                <ul>
                    <li>This is the content of your custom complete screen, by default the <code>thankYouText</code> language string is used, but you can customize this screen to look like you want</li>
                </ul>
            </li>
            <li><code>completeButton</code> - Complete/submit screen button
                <ul>
                    <li>If you override the button, the <code>complete</code> event will not be called so you&#39;ll need to handle the button <code>onClick</code> event manually</li>
                </ul>
            </li>
        </ul>
        <h2 id="submitting-data">
            Submitting data
        </h2>
        <ul>
            <li>the <code>submit</code> event emits an event with the question list as the only parameter. You can then send the data to your backend using <code>fetch</code> API or something like <code>Axios</code>. If you&#39;ve overridden the default <code>completeButton</code> slot, implement the <code>complete</code> event to know when the user is on the complete screen and handle the rest manually.</li>
        </ul>
        <h2 id="theming">
            Theming
        </h2>
        <h3 id="prebuilt-theme">
            Using a pre-built theme
        </h3>
        <ul>
            <li>Vue Flow Form comes with several out-of-the box theme CSS files. Theme files include all common color and typography styles.</li>
            <li>When using npm or CDN, just import one of the available themes together with the base CSS file</li>
            <li>
                CSS variables support for legacy browsers is included in the example project. If you need to support legacy browsers in your
                project when using the npm package, either create an alternate theme without using variables or use <a href="https://github.com/jhildenbiddle/css-vars-ponyfill">css-vars-ponyfill</a>
            </li>
            <li>
                There are three pre-built themes:
                <ul>
                    <li>
                        minimal - <a href="https://unpkg.com/@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.min.css">CDN &rarr;</a>
                    </li>
                    <li>
                        green - <a href="https://unpkg.com/@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.min.css">CDN &rarr;</a>
                    </li>
                    <li>
                        purple - <a href="https://unpkg.com/@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.min.css">CDN &rarr;</a>
                    </li>
                </ul>
            <li>
                To use a theme when using the npm package, import it in your style block:
                <br>
                <pre class="display-code"><code class="language-css">@import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-[THEME NAME].css';</code></pre>
            </li>
            <li>
                When using the CDN version, reference the CSS using one of the CDN links above
            </li>
            <li>Dark mode support is enabled by using the <code>prefers-color-scheme</code> media query
                <pre class="display-code"><code class="language-css">@media (prefers-color-scheme: dark) {
  /* dark mode styles go here */
}</code></pre>
            </li>
        </ul>
        <h3  id="custom-theme">
            Defining a custom theme
        </h3>
        <ul>
            <li>Customize existing themes as you like or create your own. The easiest way to create a new theme is to copy and change one of the pre-built theme CSS files from the src/assets/css/themes folder</li>
            <li>When using npm or CDN, customize/create the theme and import it into your app as you would do with the pre-built theme</li>
            <li>You can further customize other aspects of the app for your particular needs in the src/assets/css/common.css</li>
        </ul>
        <h2 id="layout">
            Layout options
        </h2>
        <ul>
            <li>Standalone (default) layout is suitable for a full-page display, or you can use a non-standalone layout - more suitable for integrating and embedding into your existing layout.</li>
            <li>To use Vue Flow Form as an integrated component embed it into an applicable HTML element and pass <code>false</code> to the <code>standalone</code> prop on the FlowForm component instance:
            <pre class="display-code"><code class="language-html">&lt;flow-form v-bind:standalone="false"&gt; &lt;!-- ... --&gt; &lt;/flow-form&gt;</code></pre></li>
        </ul>
        <h2 id="multilanguage">
            Multilanguage Support
        </h2>
        <ul>
            <li>To translate the form fields and values into your preferred language, create a language object and define language options</li>
            <li>Use the language object with the LanguageModel instance
                <pre class="display-code"><code class="language-js">// npm example
import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form';<br>
export default {
  name: 'example',
  components: {
    FlowForm
  },
  data() {
    return {
      language: new LanguageModel({
        continue: 'Fortsetzen',
        pressEnter: 'Drücken Sie ENTER',
        otherPrompt: 'Andere',
        submitText: 'Einreichen'
        // ...
      })
      // ...
    }
  }
}</code></pre>
            </li>
        </ul>
        <h2 id="included-examples">
            Source code and demo examples
        </h2>
        <ul class="lista">
            <li><a href="https://github.com/ditdot-dev/vue-flow-form">GitHub code repository</a></li>
        </ul>
        <ul>
            <li>Questionnaire (default):
                <ul>
                    <li>example containing a sample questionnaire</li>
                    <li><a title="Questionnaire" href="https://www.ditdot.hr/demo/vff/questionnaire/">Live demo</a></li>
                </ul>
            </li>
            <li>Quiz:
                <ul>
                    <li>example showing how the component can be used in a more advanced way</li>
                    <li>this example shows the number of correctly answered questions after submitting the form, along with an accompanying message</li>
                    <li>to view this quiz example, change the entry point in vue.config.js to <code>&#39;examples/quiz/main.js&#39;</code></li>
                    <li><a title="Quiz" href="https://www.ditdot.hr/demo/vff/quiz/">Live demo</a></li>
                </ul>
            </li>
            <li>Support page:
                <ul>
                    <li>example of a support ticket form</li>
                    <li>this example allows you to submit a support request or to check your existing ticket status</li>
                    <li>to view this customer support example, change the entry point in vue.config.js to <code>&#39;examples/support-page/main.js&#39;</code>
                    </li>
                    <li><a title="Support page" href="https://www.ditdot.hr/demo/vff/support-page/">Live demo</a></li>
                </ul>
            </li>
        </ul>
        <h3 id="files-folders">
            Files/folders
        </h3>
        <ul>
            <li><strong>CSS</strong>: src/assets/css</li>
            <li><strong>Vue components</strong>: src/components, src/components/QuestionTypes</li>
            <li><strong>Models</strong>: src/models</li>
        </ul>
        <h3  id="usage-examples">
            Demo project usage
        </h3>
        <p>
            Set corresponding JavaScript entry file in vue.config.js (examples in examples /<em>example-name</em> / Example.vue)
        </p>
        <pre class="display-code"><code class="language-js">module.exports = {
  publicPath: '',
  pages: {
    index: {
      entry: 'examples/questionnaire/main.js', // Replace with your .js entry file path
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}</code></pre>
        <h2 id="contribute">
            How to contribute:
        </h2>
        <p>
            Pull requests and potential features are welcome.
        </p>
        <pre class="display-code"><code class="language-bash"><span class="anchor">#</span> clone repo
$ git clone https://github.com/ditdot-dev/vue-flow-form.git 
# create a new branch
$ git checkout -b new_branch_name
# make changes, test and submit pull request with description of changes </code></pre>
        <p>
            If you think you found a bug, perform the <a href="https://github.com/ditdot-dev/vue-flow-form/issues">Issues</a> search to see if the problem has already been reported. If you're unable to find an issue addressing it, create a new issue that thoroughly explains the problem, with clear steps to reproduce.
        </p>
        <ul class="lista">
            <li><a href="https://github.com/ditdot-dev/vue-flow-form/blob/master/CONTRIBUTING.md">Contributing guide on GitHub</a></li>
        </ul>
        <p>
            Made with <a href="https://vuejs.org/">Vue.js</a>
        </p>
    </div>
</article>
