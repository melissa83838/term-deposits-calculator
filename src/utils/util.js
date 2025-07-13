export const calculateFinalBalance = (
  initialDeposit,
  interestRate,
  depositPeriod,
  interestPaymentFrequency
) => {
  // Validation
  if (!initialDeposit || initialDeposit < 1000 || initialDeposit > 1500000) {
    return "Invalid input for Initial Deposit Amount";
  }

  if (!interestRate || interestRate < 0 || interestRate > 15) {
    return "Invalid input for Interest Rate";
  }

  if (!depositPeriod || depositPeriod < 3 || depositPeriod > 60) {
    return "Invalid input for Term Deposit Period";
  }

  if (
    !interestPaymentFrequency ||
    !(
      interestPaymentFrequency === "monthly" ||
      interestPaymentFrequency === "quarterly" ||
      interestPaymentFrequency === "annually" ||
      interestPaymentFrequency === "at maturity"
    )
  ) {
    return "Invalid input for Interest Payment Frequency";
  }

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

  const timePeriodInYears = depositPeriod / 12.0;

  let finalBalance;
  if (
    interestPaymentFrequency === "monthly" ||
    interestPaymentFrequency === "quarterly" ||
    interestPaymentFrequency === "annually"
  ) {
    // Use compound interest formula
    let compoundsPerYear;
    switch (interestPaymentFrequency) {
      case "monthly":
        compoundsPerYear = 12;
        break;
      case "quarterly":
        compoundsPerYear = 4;
        break;
      case "annually":
        compoundsPerYear = 1;
        break;
    }

    finalBalance =
      initialDeposit *
      (1 + interestRate / 100 / compoundsPerYear) **
        (compoundsPerYear * timePeriodInYears);
  }

  if (interestPaymentFrequency === "at maturity") {
    // Use simple interest formula
    finalBalance =
      initialDeposit * (1 + (interestRate / 100) * timePeriodInYears);
  }

  return Math.round(finalBalance);
};
