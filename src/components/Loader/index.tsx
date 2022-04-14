import React from 'react'
import styles from './styles.module.scss'
import Load from 'react-loader-spinner'

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Load
        type="Circles"
        color=" #23a6d5"
        height={60}
        width={60}
        timeout={3000}
      />
    </div>
  )
}

export default Loader
