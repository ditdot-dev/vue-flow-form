import { mount, shallowMount } from '@vue/test-utils'
import Example from '@/examples/questionnaire/Example.vue'
import QuestionModel, { QuestionType, ChoiceOption} from '@/src/models/QuestionModel.js'
import FlowForm from '@/src/components/FlowForm.vue'
import FlowFormQuestion from '@/src/components/Question.vue'
import FlowFormMultipleChoiceType from '@/src/components/QuestionTypes/MultipleChoiceType.vue'


describe('Example', () => {

  const factory = (values = {}) => {
  return shallowMount(Example, {
    data () {
      return {
        ...values
      }
    }
  })
}

const deepFactory = (values = {}) => {
  return mount(Example, {
    data () {
      return {
        ...values
      }
    }
  })
}

const wrapper = deepFactory({
                    questions: [
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
                })

    let form 
    let question
    let multipleChoice

    (async function getComponent() {
        await wrapper.vm.$nextTick()
        form = wrapper.findComponent(FlowForm)
        question = wrapper.findComponent(FlowForm).findAllComponents(FlowFormQuestion).at(0)
        multipleChoice = wrapper.findComponent(FlowForm).findComponent(FlowFormQuestion).findComponent(FlowFormMultipleChoiceType)  
    })()


    it("is a component", () => {

        const wrapper = factory()

        expect(wrapper.findComponent(Example).vm)
    })

    it("contains a FlowForm component", () => {
         
        const wrapper = factory()

        expect(wrapper.findComponent(FlowForm).exists()).toBe(true)
     })
    
    
    it("renders a submit button on the final screen", () => {

        const wrapper = deepFactory()
      
        expect(wrapper.find('.f-submit button').exists()).toBe(true)
        expect(wrapper.find('.f-submit button').text()).toBe("Submit")
    })


    it("removes submit button and renders a success message on submit button click", () => {

        const wrapper = deepFactory()
        const submitButton = wrapper.find('.f-submit button')
        submitButton.trigger('click')
            
        expect(wrapper.vm.submitted).toBe(true)
        setTimeout(() => {
            expect(form.find('.text-success').exists()).toBe(true)
            expect(form.classes('.f-submit')).toBe(false)
        }, 10)
    })


    it("renders one MultipleChoice type question", () => {
         
        wrapper.vm.$nextTick(() => {
            expect(question.exists()).toBe(true)
            expect(form.findAllComponents(FlowFormQuestion)).toHaveLength(1)
            expect(multipleChoice.exists()).toBe(true)
            expect(multipleChoice.classes('.f-multiple')).toBe(false)
        })   
    })
  
    it("renders one option", () => {
         
        wrapper.vm.$nextTick(() => {
            expect(multipleChoice.find('.f-radios').findAll('li')).toHaveLength(1)
        })
    })
  
    it("renders question strings correctly", () => {
         
        wrapper.vm.$nextTick(() => {
            expect(question.find('.f-text').text()).toEqual("Question")
            expect(multipleChoice.find('.f-key').exists()).toBe(true)
            expect(multipleChoice.find('.f-key').text()).toEqual("A")
            expect(multipleChoice.find('.f-label').exists()).toBe(true)
            expect(multipleChoice.find('.f-label').text()).toEqual("Answer")
        })
    })
  
  
    it("doesn't render Enter button if not selected", () => {
         
          wrapper.vm.$nextTick(() => {
          expect(multipleChoice.classes('.f-selected')).toBe(false)
          expect(question.find('.f-enter').exists()).toBe(false)
        })  
    })

     it("allows to select an answer and click OK", () => {
         
         wrapper.vm.$nextTick(async () => {
            const option = multipleChoice.findAll('.f-radios li').at(0)
            await option.trigger('click')
             
            expect(form.find('.f-enter').exists()).toBe(true)
            expect(multipleChoice.find('.f-selected').exists()).toBe(true)
             
            const okButton = question.find('.o-btn-action')
            await okButton.trigger('click')
            
            expect(question.emitted().answer).toBeTruthy()
        })
     })
     
})