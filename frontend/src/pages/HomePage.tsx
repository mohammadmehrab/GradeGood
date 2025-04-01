import styles from './HomePage.module.css'

export default function HomePage() {

    const submit = () => {
    }

    return (
        <div>
            <h1 className={styles.title}>Welcome To GradeGood</h1>
            <h2 className={styles.subtitle}>Change your study game today by creating an account.</h2>
            <form className={`${styles.loginForm} ${styles.testBorder}`}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username-input">Username:</label>
                    <input id="username-input" />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password-input">Password:</label>
                    <input id="password-input" type="password" />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirm-password-input">Confirm Password:</label>
                    <input id="confirm-password-input" type="password" />
                </div>
                <button className={styles.createAccountBtn} onClick={submit}>Create Account</button>
            </form>
        </div>
    )
}