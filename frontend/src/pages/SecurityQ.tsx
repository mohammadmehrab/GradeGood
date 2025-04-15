import { useState } from "react";
import styles from "./SecurityQ.module.css";

const SecurityQ = () => {
  const questions = [
    "What is the name of the city you were born in?",
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
  ];
  const [input, setInput] = useState([false, false, false]);
  const [ans, setAns] = useState(["", "", ""]);
  const [submit, setSubmit] = useState(false);

  const handleInput = (i: number) => {
    const update = [...input];
    update[i] = !update[i];
    setInput(update);
  };

  const handleInputChange = (i: number, val: string) => {
    const update = [...ans];
    update[i] = val;
    setAns(update);
  };

  const handleSubmit = () => {
    setSubmit(true);
  };

  return (
    <div className={`${styles.sec_contain} h-full`}>
      <h1 className={styles.heading}>Security Questions</h1>

      {questions.map((q, i) => (
        <div key={i}>
          <div className={styles.q_content}>
            <p>{q}</p>
            <button className={styles.rev} onClick={() => handleInput(i)}>
              {input[i] ? "Hide" : "Answer"}
            </button>
          </div>

          {input[i] && (
            <input
              type="text"
              className={styles.ans_inp}
              placeholder="Your response"
              value={ans[i]}
              onChange={(e) => handleInputChange(i, e.target.value)}
            />
          )}
        </div>
      ))}
      <button className={styles.submit} onClick={handleSubmit}>
        Submit Answer
      </button>
      {submit && (
        <div className={styles.ans_rev}>
          <h2>Your answers:</h2>
          <ul>
            {ans.map((a, i) => (
              <li key={i}>
                <strong>{questions[i]}</strong>: {a || "No answer provided"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SecurityQ;
