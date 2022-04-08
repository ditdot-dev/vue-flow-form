import { mount } from "@vue/test-utils";
import QuestionModel, {
  QuestionType,
  StepOption,
} from "@/models/QuestionModel";

import FlowForm from "@/components/FlowForm.vue";
import FlowFormSliderType from "@/components/QuestionTypes/SliderType.vue";

beforeEach(() => {
  console.log("before each");
});

afterEach(() => {
  console.log("after each");
});

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

  it.only("corectly sets min and max", async () => {
    const min = 33;
    const max = 66;
    const sliderType = new QuestionModel({
      id: "slider_test",
      title: "Slider Test",
      subtitle: "Test Subtitle",
      type: QuestionType.Slider,
      min,
      max,
    });

    const flowFormProps = { questions: [sliderType] };

    const flowForm = mount(FlowForm, {
      props: flowFormProps,
    });

    await new Promise((r) => setTimeout(r, 0));

    expect(
      flowForm
        .findComponent(FlowFormSliderType)
        .find(`[aria-valuemin="${min}"]`)
        .exists() &&
        flowForm
          .findComponent(FlowFormSliderType)
          .find(`[aria-valuemax="${max}"]`)
          .exists()
    ).toBe(true);
  });

  it("correclty displays labels", async () => {
    expect(false).toBe(true);
  });

  it("correclty highlights labels", async () => {
    expect(false).toBe(true);
  });
});
