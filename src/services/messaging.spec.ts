import { Messaging } from "./messaging";

const createSut = () => {
  return new Messaging();
};

describe("Messaging", () => {
  afterEach(() => jest.clearAllMocks());

  it("should return undefined", () => {
    const sut = createSut();
    expect(sut.sendMessage("teste")).toBeUndefined();
  });

  it('should call console.log with "Mensagem enviada:" and msg', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, "log");
    sut.sendMessage("test");
    expect(consoleSpy).toHaveBeenCalledWith("Mensagem enviada:", "test");
  });

  it("should call console.log once", () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, "log");
    sut.sendMessage("test");
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});
