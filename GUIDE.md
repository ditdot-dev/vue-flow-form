# Files/folders:

* **CSS**: src/assets/css
* **Vue components**: src/components, src/components/QuestionTypes
* **Models**: src/models

# Usage (example in App.vue):

* Import necessary components and classes
* Create question list
* Add `Survey` component
  * Add the question list as `questions` prop
  * Add language model as `language` prop (optional)
    * language is defined by creating a new instance of `LanguageModel` and setting its properties
  * add `complete` event listener if you want to submit data to the backend

# Question types:

* Text - `QuestionType.Text`
* LongText (Textarea) - `QuestionType.LongText`
* Number - `QuestionType.Number`
* Email - `QuestionType.Email`
* Phone - `QuestionType.Phone`
* URL - `QuestionType.Url`
* Dropdown (Select) - `QuestionType.Dropdown`
* MultipleChoice - `QuestionType.MultipleChoice`
* SectionBreak - `QuestionType.SectionBreak`

# Defining questions:

* Create a new instance of `QuestionModel`
  * `type` - (one of `QuestionType` constants above)
  * `id` - id of the question (optional but necessary when using `jump`)
  * `question` - text of the question
  * `title` - text above the question (optional)
  * `subtitle` - text below question (optional)
  * `description` - text below HTML input (optional)
  * `content` - HTML, used only with SectionBreak
    * can be either a raw HTML string or a render function
    * if passing a render function, it needs to have `h` as the first argument, eg.:
    ```
      content: function(h) {
        return <div> ... </div>
      }
    ```
  * `required` - is field required or not (true/false - default is false)
  * `options` - `ChoiceOption` array (used only with Dropdown and MultipleChoice)
    * `ChoiceOption` must have a `label` defined (this is what will be shown to the user)
    * if `value` is not defined, `label` will be used
  * `inline` - if true, displays the field next to the question, used only with Dropdown (true/false - default is false)
  * `helpText` - help text, used only with LongText and MultipleChoice (optional)
    * if not defined, the default values from LanguageModel will be used (multipleChoiceHelpText for MultipleChoice and longTextHelpText for LongText)
  * `multiple` - used only with MultipleChoice, defines if multiple answers can be chosen (true/false - default is false)
  * `jump` - define which question to jump to after answering (function or object)
    * **function**: it will get the question model as the only parameter and must return the id to jump to
    * **object**: must define object with possible answer values and jump IDs, eg.:  
      ```
      {
        a: 'jump_a',
        b: 'jump_b',
        c: '_submit',
        _other: 'jump_other'
      }
      ```
      Object key `_other` will be used when no other keys match the answer. Object value `_submit` will jump to form submit button

# Survey component events:

* `complete` - emitted when clicking the "submit survey" button

# Survey component slots:

* `complete` - Complete/submit screen content 
* `completeButton` - Complete/submit screen button
* `completeAfter` - Complete/submit screen content below button

# Submitting data:

* the `complete` event emits an event with the question list as the only parameter. You can then submit the data to your backend using `fetch` API or something like `Axios`