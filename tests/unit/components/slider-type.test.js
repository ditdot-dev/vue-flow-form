import { mount } from "@vue/test-utils";
import QuestionModel, {
  QuestionType,
  MarkOption,
} from "@/models/QuestionModel";

import FlowForm from "@/components/FlowForm.vue";
import FlowFormSliderType from "@/components/QuestionTypes/SliderType.vue";

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

  it("corectly sets min and max", async () => {
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

  it.only("correclty displays labels", async () => {
    const min = 0;
    const max = 100;

    const sliderType = new QuestionModel({
      id: "slider_test",
      title: "Slider Test",
      subtitle: "Test Subtitle",
      type: QuestionType.Slider,
      min,
      max,
      marks: [
        new MarkOption({
          value: 0,
          label: "Strongly disagree",
        }),
        new MarkOption({
          value: 25,
          label: "Disagree",
        }),
        new MarkOption({
          value: 50,
          label: "Neutral",
        }),
        new MarkOption({
          value: 75,
          label: "Agree",
        }),
        new MarkOption({
          value: 100,
          label: "Strongly agree",
        }),
      ],
    });

    const flowFormProps = { questions: [sliderType] };
    const flowForm = mount(FlowForm, {
      props: flowFormProps,
    });

    await new Promise((r) => setTimeout(r, 0));
    expect(
      flowForm
        .findComponent(FlowFormSliderType)
        .findAll(".vue-slider-mark-label")
        .map((mark) => mark.text())
        .join(",")
    ).toEqual(
      [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ].join(",")
    );
  });

  it("updates syncs the slider with the number input", async () => {});
  it("correctly updates the valueData on the question model ", async () => {});
  it("clears the last user input ", async () => {});
});
