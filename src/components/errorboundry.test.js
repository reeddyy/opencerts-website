import { mount } from "enzyme";
import ErrorBoundary from "./ErrorBoundry";

const ProblemChild = () => {
  throw new Error("Error thrown from problem child");
};

const pauseErrorLogging = codeToRun => {
  const logger = console.error;
  console.error = () => {};

  codeToRun();

  console.error = logger;
};

describe("<ErrorBoundary />", () => {
  it("should catch errors with componentDidCatch", () => {
    pauseErrorLogging(() => {
      jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");
      mount(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      );
      expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalled();
    });
  });
});
