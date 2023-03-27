import clsx from 'clsx'
import styles from '../styles/Panel.module.css'

function Panel ({ title, className, children } = {}) {
    return <div className={clsx(className, styles.container)} data-augmented-ui="tl-clip br-clip border">
        <div className={clsx(styles.header, "flex flex-row")}>
            <div>
                <p className={styles.title}>{title}</p>
            </div>
        </div>
        {children}
    </div>
}

export default Panel
