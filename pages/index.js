// https://www.behance.net/search/projects?search=cyberpunk+website+design
// https://dribbble.com/shots/9954664-Cyberpunk-2145-Online-Resume
// https://www.reddit.com/r/LowSodiumCyberpunk/comments/n387d5/cyberpunk_inspired_android_theme_by_uouttiefive/
// https://www.behance.net/gallery/162458515/UXUI-design-Neural-networks-curator-corpo-website?tracking_source=search_projects%7Ccyberpunk+website+design

import 'augmented-ui'
import clsx from 'clsx'
import Head from 'next/head'
import Bio from '../components/bio.js'
import WarningBar from '../components/error-bar.js'
import ErrorIcon from '../components/error-triangle.js'
import Icon from '../components/icon.js'
import Panel from '../components/panel.js'
import Projects from '../components/projects.js'
import styles from '../styles/Home.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>USER // ROWAN JAMES</title>
        <meta name="description" content="Rowan James' software development portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.window}>
          <div className={clsx(styles['first-row'], "row flex-space-between-desktop")}>
            <Bio
              className={styles.bio}
              name="Rowan James"
              title="Profession: Developer"
              icon="https://github.com/rowan-james.png">
            </Bio>
            <Panel className={styles.network} title="Other Connections Found">
              <div className={clsx(styles.header, "flex flex-row flex-space-between")}>
                <ErrorIcon />
                <p className={styles.title}>Other Connections Found</p>
              </div>
              <div className={styles['network-separator']}>
                <div className={styles['network-separator-a']} data-augmented-ui="border">&nbsp;</div>
                <div className={styles['network-separator-b']} data-augmented-ui="border">&nbsp;</div>
              </div>
              <div className="row flex-space-between">
                <div>
                  <Icon alt="Github icon" image="github-mark-white.svg" text="Github" url="https://github.com/rowan-james" />
                  <Icon alt="Email icon" image="mail.svg" text="Email" url="mailto:rowan.james.dev@gmail.com" />
                </div>
              </div>
              <WarningBar style={{ width: '100%', height: '16px' }}
                data-augmented-ui="tr-clip bl-clip border"
              />
            </Panel>
          </div>

          <div>
            <Projects />
          </div>
        </div>
      </main>
    </div>
  )
}
