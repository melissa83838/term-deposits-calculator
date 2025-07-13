import { describe, expect, it } from "vitest";
import { calculateFinalBalance } from "../utils/util";

describe("Util function calculateFinalBalance", () => {
  it.each([
    { input: "Initial Deposit Amount", values: [undefined, 5, 5, "monthly"] },
    { input: "Interest Rate", values: [1000, undefined, 5, "monthly"] },
    { input: "Term Deposit Period", values: [1000, 5, undefined, "monthly"] },
    { input: "Interest Payment Frequency", values: [1000, 5, 5, undefined] },
  ])(
    "Should return error message when input $input is empty",
    ({ input, values }) => {
      const errorMessage = `Invalid input for ${input}`;
      const finalBalance = calculateFinalBalance(...values);
      expect(finalBalance).toBe(errorMessage);
    }
  );

  it.each([
    { input: "Initial Deposit Amount", values: [0, 5, 5, "monthly"] },
    { input: "Interest Rate", values: [1000, 0, 5, "monthly"] },
    { input: "Term Deposit Period", values: [1000, 5, 0, "monthly"] },
  ])(
    "Should return error message when input $input is smaller than min",
    ({ input, values }) => {
      const errorMessage = `Invalid input for ${input}`;
      const finalBalance = calculateFinalBalance(...values);
      expect(finalBalance).toBe(errorMessage);
    }
  );

  it.each([
    { input: "Initial Deposit Amount", values: [2000000, 5, 5, "monthly"] },
    { input: "Interest Rate", values: [1000, 20, 5, "monthly"] },
    { input: "Term Deposit Period", values: [1000, 5, 100, "monthly"] },
  ])(
    "Should return error message when input $input is greater than max",
    ({ input, values }) => {
      const errorMessage = `Invalid input for ${input}`;
      const finalBalance = calculateFinalBalance(...values);
      expect(finalBalance).toBe(errorMessage);
    }
  );

  it("Should return error message if Interest Payment Frequency is not a valid option", () => {
    const finalBalance = calculateFinalBalance(1000, 5, 5, "invalid");
    expect(finalBalance).toBe("Invalid input for Interest Payment Frequency");
  });

  it.each([
    {
      expectedBalance: 10330,
      initialDeposit: 10000,
      interestRate: 1.1,
      depositPeriod: 36,
      interestPaymentFrequency: "at maturity",
    },
    {
      expectedBalance: 48036,
      initialDeposit: 46400,
      interestRate: 2,
      depositPeriod: 21,
      interestPaymentFrequency: "annually",
    },
    {
      expectedBalance: 5356,
      initialDeposit: 4700,
      interestRate: 3.5,
      depositPeriod: 45,
      interestPaymentFrequency: "quarterly",
    },
    {
      expectedBalance: 82193,
      initialDeposit: 74800,
      interestRate: 6.3,
      depositPeriod: 18,
      interestPaymentFrequency: "monthly",
    },
  ])(
    "The final balance should be $expectedBalance if you deposit $initialDeposit initially at an interest rate of $interestRate percent over $depositPeriod months and the interest is paid $interestPaymentFrequency",
    ({
      expectedBalance,
      initialDeposit,
      interestRate,
      depositPeriod,
      interestPaymentFrequency,
    }) => {
      const finalBalance = calculateFinalBalance(
        initialDeposit,
        interestRate,
        depositPeriod,
        interestPaymentFrequency
      );
      expect(finalBalance).toBe(expectedBalance);
    }
  );
});
