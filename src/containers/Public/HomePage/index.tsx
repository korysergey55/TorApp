import React from 'react'
import Header from 'components/Header'
import styles from './styles.module.scss'

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Home Page</h2>
      </div>
    </div>
  )
}

export default HomePage
