export const personalizedAnswerMessages = (question, QuestionType) => {
  const { options, answer, answerMessage, checkbox } = question;

  if (question.type === QuestionType.Dropdown) {
    return (
      options.find(item => item.value === answer).answerMessage || answerMessage
    );
  }
  if (question.type === QuestionType.Salary) {
    if (checkbox) {
      return answerMessage.checkbox || answerMessage;
    }
    return answerMessage.answer || answerMessage;
  }
  return answerMessage;
};
