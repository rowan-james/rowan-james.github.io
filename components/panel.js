import clsx from 'clsx'
import styles from '../styles/Panel.module.css'

function Panel ({ className, children } = {}) {
    return <div className={clsx(className, styles.wrapper)} data-augmented-ui="tl-clip-y tr-clip br-clip-y bl-clip border">
        <div className={styles.container} data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
            {children}
        </div>
    </div>
}

export default Panel
