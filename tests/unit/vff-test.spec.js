import { mount, shallowMount } from '@vue/test-utils'
import Example from '@/examples/questionnaire/Example.vue'
import QuestionModel, { QuestionType, LinkOption } from '@/src/models/QuestionModel.js'
import FlowForm from '@/src/components/FlowForm.vue'
import FlowFormQuestion from '@/src/components/Question.vue'
import LanguageModel from '@/src/models/LanguageModel'
import FlowFormDropdownType from '@/src/components/QuestionTypes/DropdownType.vue'
import FlowFormEmailType from '@/src/components/QuestionTypes/EmailType.vue'
import FlowFormLongTextType from '@/src/components/QuestionTypes/LongTextType.vue'
import FlowFormMultipleChoiceType from '@/src/components/QuestionTypes/MultipleChoiceType.vue'
import FlowFormNumberType from '@/src/components/QuestionTypes/NumberType.vue'
import FlowFormPasswordType from '@/src/components/QuestionTypes/PasswordType.vue'
import FlowFormPhoneType from '@/src/components/QuestionTypes/PhoneType.vue'
import FlowFormSectionBreakType from '@/src/components/QuestionTypes/SectionBreakType.vue'
import FlowFormTextType from '@/src/components/QuestionTypes/TextType.vue'
import FlowFormUrlType from '@/src/components/QuestionTypes/UrlType.vue'
import { IsMobile } from '@/src/mixins/IsMobile'
  

const factory = (values = {}) => {
  return shallowMount(Example, {
    data () {
      return {
        ...values
      }
    }
  })
}

describe('Example', () => {
    it('Example is a component', () => {
        const wrapper = factory()

        expect(wrapper.findComponent(Example).vm)
    })

     it('Example contains a FlowForm component', () => {
        const wrapper = mount(Example)

        expect(wrapper.findComponent(FlowForm).exists()).toBe(true)
     })
    
    it('Example contains a completed and submitted data', () => {
        const wrapper = mount(Example)

        expect(wrapper.vm.completed).toBe(false)
        expect(wrapper.vm.submitted).toBe(false)
     })


    it("onSendData sets the submitted data to true", () => {
        const wrapper = factory({ submitted: false })
        wrapper.vm.onSendData()
            
        expect(wrapper.vm.submitted).toBe(true)
    })

    it("Shows text success message when submitted", () => {
         const wrapper = mount(Example, {
             data() {
                return {
                    submitted: true
                }
            }
        })
           
        expect(wrapper.findComponent(FlowForm).find('.text-success').exists()).toBeTruthy()
    })

    it('There is a submit button on the final screen', () => {
        const wrapper = mount(Example)
    
        expect(wrapper.find("button").text()).toBe("Submit")
    
    })

    it("Question component exists", () => {
         const wrapper = mount(Example, {
             data() {
                return {
                    questions: [
                         new QuestionModel({
                            id: 'first_name',
                            tagline: 'Hi! Welcome to our demo survey 😊',
                            title: 'What is your first name?',
                            type: QuestionType.Text,
                            required: true,
                            placeholder: 'Start typing here...'
                        })
                    ]
                }
            }
        })
           
    wrapper.vm.$nextTick(() => {
        expect(wrapper.findComponent(FlowForm).findComponent(FlowFormQuestion).exists()).toBeTruthy()
        expect(wrapper.findComponent(FlowForm).findAllComponents(FlowFormQuestion)).toHaveLength(1)
  })
    })
    
})