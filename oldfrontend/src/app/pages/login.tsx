"use client"
import Header from '../components/header'
import styles from '../styles/login.module.css'

export default () => <>
    <Header />
    <div className={styles.overlay}>
        <div>
            <span>L</span>
            <span>o</span>
            <span>g</span>
            <span>i</span>
            <span>n</span>
        </div>
    </div>
</>