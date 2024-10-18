import React, { useState } from "react";
import Modal from "react-modal"; // Import the Modal component
import "./App.css";
import "./components/TransactionList.css";
import TransactionList from "./components/TransactionList";
import { Layout, Button } from "antd";

// Initialize the react-modal library
Modal.setAppElement("#root");
function App() {
  const [transactions, setTransactions] = useState([]);
  const [transactionText, setTransactionText] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTransaction = () => {
    if (transactionText !== "" && amount !== "") {
      const selectedDate = new Date(date);
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        // 선택한 날짜가 오늘보다 미래인 경우
        alert("미래의 날짜를 선택할 수 없습니다.");
        return;
      }
      const newAmount = isExpense ? -parseFloat(amount) : parseFloat(amount);

      const newTransaction = {
        id: new Date().getTime(),
        text: transactionText,
        amount: newAmount,
        isExpense,
        date,
      };

      setTransactions([...transactions, newTransaction]);
      setTransactionText("");
      setAmount("");
      setDate("");

      if (isExpense) {
        setTotalExpense(totalExpense + newAmount);
      } else {
        setTotalIncome(totalIncome + newAmount);
      }

      closeModal();
    }
  };

  const deleteTransaction = (transactionId, transactionAmount, isExpense) => {
    const shouldDelete = window.confirm("삭제하시겠습니까?");
    if (shouldDelete) {
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );

      setTransactions(updatedTransactions);

      if (isExpense) {
        const newTotalExpense = updatedTransactions.reduce(
          (total, transaction) => {
            if (transaction.isExpense) {
              return total + transaction.amount;
            }
            return total;
          },
          0
        );
        setTotalExpense(newTotalExpense);
      } else {
        const newTotalIncome = updatedTransactions.reduce(
          (total, transaction) => {
            if (!transaction.isExpense) {
              return total + transaction.amount;
            }
            return total;
          },
          0
        );
        setTotalIncome(newTotalIncome);
      }
    }
  };

  return (
    <Layout className="layout">
      <div className="expense-tracker">
        <h1>
          <p>&#127808;</p>
          <p>2024 자산 현황</p>
          <p>&#127808;</p>{" "}
        </h1>
        <div className="total-asset">
          <h2>{(totalIncome + totalExpense).toLocaleString()}원</h2>
        </div>
        <div className="totals">
          <div className="total-container">
            <div className="income-money">
              <p>수입</p>
              {totalIncome.toLocaleString()}원
            </div>
            <div class="separator"></div>
            <div className="expense-money">
              <p>지출</p>
              {totalExpense.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="expense-form">
          <Button type="primary" ghost onClick={openModal}>
            내역 추가
          </Button>
          {/* <button onClick={openModal}>내역 추가</button> */}
          <Modal
            className="expense-form-modal"
            isOpen={isModalOpen}
            onRequestClose={closeModal}
          >
            <input
              type="text"
              placeholder="내용"
              value={transactionText}
              onChange={(e) => setTransactionText(e.target.value)}
            />
            <input
              type="number"
              placeholder="금액"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              placeholder="날짜"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Button
              type="primary"
              // className="modal-btn"
              onClick={handleAddTransaction}
            >
              추가
            </Button>
            <div>
              <label>
                <input
                  type="radio"
                  name="transactionType"
                  value="expense"
                  checked={isExpense}
                  onChange={() => setIsExpense(true)}
                />
                지출
              </label>
              <label>
                <input
                  type="radio"
                  name="transactionType"
                  value="income"
                  checked={!isExpense}
                  onChange={() => setIsExpense(false)}
                />
                수입
              </label>
            </div>
          </Modal>
        </div>
        <h2 className="total_list">거래 내역</h2>
        <div className="underline"></div> {/* 밑줄을 추가합니다 */}
        {transactions.length > 0 && (
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
          />
        )}
      </div>
    </Layout>
  );
}

export default App;
