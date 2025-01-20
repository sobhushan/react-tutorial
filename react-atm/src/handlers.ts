import { getBalance, withdraw, deposit } from './api/transaction';
import { login, signup } from './api/auth';

// Login handler
export const handleLogin = async (username: string, password: string, setBalance: React.Dispatch<React.SetStateAction<number | null>>) => {
  try {
    const loginMessage = await login(username, password);
    alert(loginMessage);
    const balance = await getBalance(username);
    setBalance(balance.balance);
  } catch (error) {
    alert('Login failed');
  }
};

// Signup handler
export const handleSignup = async (username: string, password: string, initialAmount: number) => {
  try {
    const message = await signup(username, password, initialAmount);
    alert(message);
  } catch (error) {
    alert('Signup failed');
  }
};

// Withdraw handler
export const handleWithdraw = async (username: string, amount: number, setBalance: React.Dispatch<React.SetStateAction<number | null>>) => {
  if (amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }
  try {
    const withdrawMessage = await withdraw(username, amount);
    alert(withdrawMessage);
    const balance = await getBalance(username);
    setBalance(balance.balance);
  } catch (error) {
    alert('Withdrawal failed');
  }
};

// Deposit handler
export const handleDeposit = async (username: string, amount: number, setBalance: React.Dispatch<React.SetStateAction<number | null>>) => {
  if (amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }
  try {
    const depositMessage = await deposit(username, amount);
    alert(depositMessage);
    const balance = await getBalance(username);
    setBalance(balance.balance);
  } catch (error) {
    alert('Deposit failed');
  }
};
