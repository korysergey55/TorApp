import React from 'react'
import styles from './styles.module.scss'
import { Modal } from 'antd'

interface Iprops {
  visible: boolean
  title: string
  width: string
  children?: any
  onClose: Function
}

const ModalAnt: React.FC<Iprops> = ({
  title,
  visible,
  children,
  width,
  onClose,
}) => {
  const handleOk = () => {
    onClose()
  }
  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      title={title}
      className={styles.modal}
      width={width}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={true}
    >
      {children}
    </Modal>
  )
}

export default ModalAnt
