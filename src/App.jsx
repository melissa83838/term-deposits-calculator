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
      <p>Valid range for inputs: </p>
      <ul>
        <li>Initial deposit amount: $1000 and $1,500,000</li>
        <li>Interest rate: 0% and 15%</li>
        <li>Term deposit period: 3 to 60 months</li>
      </ul>
      <form onSubmit={handleSubmit}>
        {/* Initial deposit amount */}
        <label>
          Initial Deposit Amount ($):
          <input
            required
            type="number"
            min="1000"
            max="1500000"
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
            required
            type="number"
            min="0"
            max="15"
            step="0.01"
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
            required
            type="number"
            min="3"
            max="60"
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
        {typeof finalBalance === "number" ? (
          <>
            <hr />
            <p>Final Balance: ${finalBalance}</p>
          </>
        ) : (
          <>
            <hr />
            {finalBalance}
          </>
        )}
      </form>
    </>
  );
}

export default App;
