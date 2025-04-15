import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div>
      <h1 className={styles.title}>Welcome To GradeGood</h1>
      <h2 className={styles.subtitle}>
        Change your study game today by creating an account.
      </h2>
      {/* <form className={`${styles.loginForm} ${styles.testBorder}`}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username-input" className='label'>Username:</label>
                    <input id="username-input" className='input' />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password-input" className='label'>Password:</label>
                    <input id="password-input" type="password"  className='input'/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirm-password-input" className='label'>Confirm Password:</label>
                    <input id="confirm-password-input" type="password" className='input'/>
                </div>
                <button className={styles.createAccountBtn} onClick={submit}>Create Account</button>
            </form> */}
    </div>
  );
}
