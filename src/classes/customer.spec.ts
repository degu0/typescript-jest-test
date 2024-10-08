import { EnterpriseCustomer, IndividualCustomer } from "./customer";

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

afterEach(() => jest.clearAllMocks());

describe("IndividualCustomer", () => {
  it("should have firstName, lastName and cpf", () => {
    const sut = createIndividualCustomer("Deyvid", "Gustavo", "123.123");
    expect(sut).toHaveProperty("firstName", "Deyvid");
    expect(sut).toHaveProperty("lastName", "Gustavo");
    expect(sut).toHaveProperty("cpf", "123.123");
  });
  it("should have methods to get name and idn for individual customers", () => {
    const sut = createIndividualCustomer("Deyvid", "Gustavo", "123.123");
    expect(sut.getName()).toBe("Deyvid Gustavo");
    expect(sut.getIDN()).toBe("123.123");
  });
});

describe("EnterpriseCustomer", () => {
  it("should have name and cnpj", () => {
    const sut = createEnterpriseCustomer("Udemy", "222");
    expect(sut).toHaveProperty("name", "Udemy");
    expect(sut).toHaveProperty("cnpj", "222");
  });
  it("should have methods to get name and idn for enterprise customers", () => {
    const sut = createEnterpriseCustomer("Udemy", "222");
    expect(sut.getName()).toBe("Udemy");
    expect(sut.getIDN()).toBe("222");
  });
});
