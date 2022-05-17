import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedBack = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedBack.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
