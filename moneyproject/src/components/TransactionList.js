import React, { useState } from "react";
import "./TransactionList.css";
import { Layout, Button } from "antd";

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleTransactionClick = (id) => {
    setSelectedTransaction(id === selectedTransaction ? null : id);
  };

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={
            transaction.isExpense ? "transaction expense" : "transaction income"
          }
          onClick={() => handleTransactionClick(transaction.id)}
        >
          <div className="vertical-align">
            {selectedTransaction === transaction.id && (
              <Button
                type="primary"
                style={{
                  backgroundColor: "YellowGreen",
                  width: 60,
                  height: 30,
                  textAlign: "center",
                }}
                // className="delete_button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTransaction(transaction.id);
                }}
              >
                삭제
              </Button>
            )}
            <p className="date_p">{transaction.date}</p>
            <p className="text_p">{transaction.text}</p>
          </div>
          <p className="income_p">{transaction.amount.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
