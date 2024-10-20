import styles from './jobs.module.css'

export default function Jobs() {
    return (
        <>
            <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 200 }} className={styles.jobs}>
                <main style={{
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#fefefe',
                    width: '80vw',
                    backdropFilter: 'blur(15px)',
                    height: '80vh',
                    borderRadius: '10px',
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <div className={styles.load}>
                        <div data-percent="0.0%"></div>
                    </div>
                </main>
            </div>
        </>
    )
}