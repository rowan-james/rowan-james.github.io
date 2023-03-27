import Image from 'next/image'
import styles from '/styles/Network.module.css'


function Icon ({ image, url, text, alt, ...props } = {}) {
    return <a className={styles.link} href={url}>
        <Image alt={alt} width="24" height="24" src={image}></Image>
        {text}
    </a>
}

export default Icon
