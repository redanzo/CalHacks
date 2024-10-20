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
                    <div className={styles.job}>
                        <div className={styles.header}>
                            <h1>Emily Roberts</h1>
                            <div className={styles.require}>
                                <span>C#</span>
                                <span>Python</span>
                                <span>Java</span>
                                <span>JavaScript</span>
                            </div>
                            <span></span>
                            <p>98% Compatible</p>
                        </div>
                        <p>Imagine a good job oppertunity</p>
                    </div>

                    <div className={styles.job} onClick={(e) => (e.target as any).remove()}>
                        <div className={styles.header} style={{ pointerEvents: 'none' }}>
                            <h1>Mark Weasel</h1>
                            <div className={styles.require}>
                                <span>C#</span>
                                <span>Python</span>
                                <span>Java</span>
                                <span>JavaScript</span>
                            </div>
                            <span></span>
                            <p>98% Compatible</p>
                        </div>
                        <p>Imagine a good job oppertunity</p>
                    </div>
                    
                    <div className={styles.job} onClick={(e) => (e.target as any).remove()}>
                        <div className={styles.header} style={{ pointerEvents: 'none' }}>
                            <h1>Mark Weasel</h1>
                            <div className={styles.require}>
                                <span>C#</span>
                                <span>Python</span>
                                <span>Java</span>
                                <span>JavaScript</span>
                            </div>
                            <span></span>
                            <p>98% Compatible</p>
                        </div>
                        <p>Imagine a good job oppertunity</p>
                    </div>

                    <div className={styles.job} onClick={(e) => (e.target as any).remove()}>
                        <div className={styles.header} style={{ pointerEvents: 'none' }}>
                            <h1>Mark Weasel</h1>
                            <div className={styles.require}>
                                <span>C#</span>
                                <span>Python</span>
                                <span>Java</span>
                                <span>JavaScript</span>
                            </div>
                            <span></span>
                            <p>98% Compatible</p>
                        </div>
                        <p>Imagine a good job oppertunity</p>
                    </div>

                    <div className={styles.job}>
                        <div className={styles.header}>
                            <h1>Jonny Whatshisface</h1>
                            <div className={styles.require}>
                                <span>C#</span>
                                <span>Python</span>
                                <span>Java</span>
                                <span>JavaScript</span>
                            </div>
                            <span></span>
                            <p>98% Compatible</p>
                        </div>
                        <p>Imagine a good job oppertunity</p>
                    </div>
                </main>
            </div>
        </>
    )
}