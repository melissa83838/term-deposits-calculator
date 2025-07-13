export const calculateFinalBalance = (
  initialDeposit,
  interestRate,
  depositPeriod,
  interestPaymentFrequency
) => {
  // Compound interest formula: A = P(1+r/n) ^ (nt)
  // where
  // A: final balance (principal + accrued interest)
  // P: initial deposit amount
  // r: annual interest rate as a decimal
  // n: number of times the interest is compounded per time period
  // t: time period in years

  // Simple interest formula: A = P (1 + r * t)
  // Where
  // A: final balance (principal + accrued interest)
  // P: initial deposit amount
  // r: annual interest rate as a decimal
  // t: time period in years

  // TODO: add some basic validation

  const timePeriodInYears = depositPeriod / 12.0;

  let finalBalance;
  if (
    interestPaymentFrequency === "monthly" ||
    interestPaymentFrequency === "quarterly" ||
    interestPaymentFrequency === "annually"
  ) {
    // Use compound interest formula
    let compoundsPerPeriod;
    switch (interestPaymentFrequency) {
      case "monthly":
        compoundsPerPeriod = depositPeriod;
        break;
      case "quarterly":
        compoundsPerPeriod = depositPeriod / 4.0;
        break;
      case "annually":
        compoundsPerPeriod = depositPeriod / 12.0;
        break;
    }

    finalBalance =
      initialDeposit *
      (1 + interestRate / 100 / compoundsPerPeriod) **
        (compoundsPerPeriod * timePeriodInYears);
  }

  if (interestPaymentFrequency === "at maturity") {
    // Use simple interest formula
    finalBalance =
      initialDeposit * (1 + (interestRate / 100) * timePeriodInYears);
  }

  return Math.floor(finalBalance);
};
