import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    
    <div className="h-full flex flex-col justify-center">
      <div className= "flex h-screen">
        <div className= "w-1/2 flex items-center">
      <img src="/homepagepic.png"
                    alt="homepic"
                    className="w-150 h-100 mr-5"/>
       </div>
       <div className="w-1/2 flex flex-col space-y-4 ml-10 mr-10">
      <div className="mt-8">
      <h1 className={styles.title }>Welcome To GradeGood</h1>
      </div>
      <h1>
      About Creators:
      </h1>
      <h1>
      We are aspiring software developers who  aim to  create an interactive and useful aid for students of all levels. GradeGood is not a game, it is an impactful medium for academic success.
      </h1>
      <h1>
      What is GradeGood?
      </h1>
      <h1>
  GradeGood performs GPA calculation and organizes your study calendar, to ensure you are on the right track for a bright future.
      </h1>
       </div>
      </div>

      </div>
      
    
    
    
  );
}

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
                <button className={styl\es.createAccountBtn} onClick={submit}>Create Account</button>
            </form> */}