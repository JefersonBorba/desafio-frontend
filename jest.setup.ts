import "@testing-library/jest-dom";

const originalError = console.error;
console.error = (...args: unknown[]) => {
  const msg = args[0];
  if (
    typeof msg === "string" &&
    (msg.includes("not implemented: navigation") ||
      msg.includes("Not implemented: navigation") ||
      msg.includes("An update to"))
  ) {
    return;
  }
  originalError(...args);
};

if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    const msg = event.message || "";
    if (msg.includes("Not implemented: navigation")) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  });
}

jest.spyOn(console, "log").mockImplementation(() => {});
jest.spyOn(console, "warn").mockImplementation(() => {});
