export const getTransactions = async (username: string) => {
    try {
      const response = await fetch(`http://localhost:8000/transactions/${username}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Error fetching transactions');
    }
  };
  
  export const getBalance = async (username: string) => {
    try {
      const response = await fetch('http://localhost:8000/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw new Error('Error fetching balance');
    }
  };
  
  // Withdraw function
  export const withdraw = async (username: string, amount: number) => {
    try {
      const response = await fetch('http://localhost:8000/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, amount }),
      });
      if (response.ok) {
        return await response.text();
      } else {
        throw new Error('Withdrawal failed');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error withdrawing');
    }
  };
  
  // Deposit function
  export const deposit = async (username: string, amount: number) => {
    try {
      const response = await fetch('http://localhost:8000/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, amount }),
      });
      if (response.ok) {
        return await response.text();
      } else {
        throw new Error('Deposit failed');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error depositing');
    }
  };
  