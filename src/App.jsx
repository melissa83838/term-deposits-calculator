import { useState } from "react";
import { calculateFinalBalance } from "./utils/util";

function App() {
  const [initialDeposit, setInitialDeposit] = useState();
  const [interestRate, setInterestRate] = useState();
  const [depositPeriod, setDepositPeriod] = useState();
  const [interestPaymentFrequency, setInterestPaymentFrequency] =
    useState("monthly");
  const [finalBalance, setFinalBalance] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const balance = calculateFinalBalance(
      initialDeposit,
      interestRate,
      depositPeriod,
      interestPaymentFrequency
    );

    setFinalBalance(balance);
  };

  return (
    <>
      <h1>Term Deposit Calculator</h1>
      <p>
        Use this simple calculator to calculate your final term deposit balance
        by inputting your initial deposit amount ($), interest rate (%), deposit
        period (month) and interest payment frequency.
      </p>
      <form onSubmit={handleSubmit}>
        {/* Initial deposit amount */}
        <label>
          Initial Deposit Amount ($):
          <input
            type="number"
            value={initialDeposit}
            onChange={(e) => {
              setInitialDeposit(e.target.value);
            }}
          />
        </label>
        <br />
        <br />

        {/* Interest rate */}
        <label>
          Interest Rate (%):
          <input
            type="number"
            value={interestRate}
            onChange={(e) => {
              setInterestRate(e.target.value);
            }}
          />
        </label>
        <br />
        <br />

        {/* Term Deposit Period */}
        <label>
          Term Deposit Period (month):
          <input
            type="number"
            value={depositPeriod}
            onChange={(e) => {
              setDepositPeriod(e.target.value);
            }}
          />
        </label>
        <br />
        <br />

        {/* Interest Payment Frequency: */}
        <label>
          Interest Payment Frequency:
          <select
            value={interestPaymentFrequency}
            onChange={(e) => {
              setInterestPaymentFrequency(e.target.value);
            }}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
            <option value="at maturity">At maturity</option>
          </select>
        </label>
        <br />
        <br />

        {/* Button to calculate final balance */}
        <button type="submit">Calculate</button>

        {/* Final Balance */}
        {finalBalance && (
          <>
            <hr />
            <p>Final Balance: ${finalBalance}</p>
          </>
        )}
      </form>
    </>
  );
}

export default App;
