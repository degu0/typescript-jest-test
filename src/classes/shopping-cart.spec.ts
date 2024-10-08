import { Discount } from "./discount";
import { CartItem } from "./interfaces/cart-item";
import { ShoppingCart } from "./shopping-cart";

// Função para criar um mock do Discount
const createDiscountMock = (): Discount => {
  class DiscountMock extends Discount {
    calculate(total: number): number {
      return total; // Implementação simplificada; ajuste conforme necessário
    }
  }
  return new DiscountMock();
};

// Função para criar um mock de CartItem
const createCartItem = (name: string, price: number): CartItem => ({
  name,
  price,
});

// Função para criar o sistema sob teste (SUT)
const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

// Função para criar o SUT com produtos adicionados
const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  const cartItem1 = createCartItem("Celular", 5000);
  const cartItem2 = createCartItem("Blusa", 50);
  sut.addItem(cartItem1);
  sut.addItem(cartItem2);
  return { sut, discountMock };
};

describe("ShoppingCart", () => {
  afterEach(() => jest.clearAllMocks());

  it("should be an empty cart when no product is added", () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it("should have 2 cart items", () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  });

  it("should test total and totalWithDiscount", () => {
    const { sut, discountMock } = createSutWithProducts();
    
    // Espiando o método calculate do DiscountMock
    const discountMockSpy = jest.spyOn(discountMock, "calculate").mockReturnValue(5001);
    
    expect(sut.total()).toBe(5050); // 5000 + 50 = 5050
    expect(sut.totalWithDicount()).toBe(5001); // Valor mockado
    
    expect(discountMockSpy).toHaveBeenCalledWith(5050);
  });

  it("should add products and clear cart", () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(5050); // 5000 + 50 = 5050
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it("should remove products", () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it("should call discount.calculate once when totalWithDiscount is called", () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, "calculate");
    sut.totalWithDicount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it("should call discount.calculate with total price when totalWithDiscount is called", () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, "calculate");
    sut.totalWithDicount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
