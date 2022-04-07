import { mount } from "@vue/test-utils";
import QuestionModel, { QuestionType } from "@/models/QuestionModel";

import FlowForm from "@/components/FlowForm.vue";
import FlowFormSliderType from "@/components/QuestionTypes/SliderType.vue";
import FlowFormQuestion from "@/components/FlowFormQuestion.vue";

describe("Slide Type", () => {
  it("renders", async () => {
    const sliderType = new QuestionModel({
      id: "slider_test",
      title: "Slider Test",
      subtitle: "Test Subtitle",
      type: QuestionType.Slider,
    });

    const flowFormProps = { questions: [sliderType] };

    const flowForm = mount(FlowForm, {
      props: flowFormProps,
    });

    await new Promise((r) => setTimeout(r, 0));

    expect(flowForm.findComponent(FlowFormSliderType).exists()).toBe(true);
  });
});
