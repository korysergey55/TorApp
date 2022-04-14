import React, { useState, useEffect } from 'react'
import { useStore } from 'stores'
import { observer } from 'mobx-react'
import { v4 as uuidv4 } from 'uuid'
import { INewAlbum } from './types'
import UploadAlbum from './uploadAlbum'

import styles from './styles.module.scss'
import { Form, Input, Button } from 'antd'
import { toJS } from 'mobx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

interface IProps {
  editedAlbum?: INewAlbum | undefined
  modalFinish: Function
}

const CreateAlbum: React.FC<IProps> = observer(({ editedAlbum, modalFinish }) => {
  const { CreateCompanyStore } = useStore()
  const [state, setState] = useState<INewAlbum>({
    id: uuidv4(),
    title: '',
    images: [],
  })

  useEffect(() => {
    if (editedAlbum) {
      setState(editedAlbum)
    }
  }, [])

  const onChangeAlbum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setState((prev: any) => ({ ...prev, title: value }))
  }

  const addFotoToAlbum = (foto: any) => {
    setState((prev: any) => ({ ...prev, images: [...foto] }))
  }

  const onFinish = () => {
    if (editedAlbum) {
      CreateCompanyStore.editAlbum(state)
      modalFinish()
    } else {
      CreateCompanyStore.setNewAlbum(state)
      modalFinish()
    }
  }

  const remuveAlbum = () => {
    console.log('remuveAlbum', toJS(editedAlbum))
    CreateCompanyStore.remuveAlbum(editedAlbum)
  }

  return (
    <div className={styles.container}>
      {editedAlbum && (
        <FontAwesomeIcon
          className={styles.icon}
          icon={faTrashAlt}
          color="black"
          size="1x"
          onClick={remuveAlbum}
        />
      )}
      <Input
        className={styles.input}
        placeholder="Enter album name"
        minLength={1}
        value={state.title}
        onChange={onChangeAlbum}
      />
      <UploadAlbum
        addFotoToAlbum={addFotoToAlbum}
        images={state.images}
        editedAlbum={editedAlbum}
      />
      <Button className={styles.btnSave} type="primary" onClick={onFinish}>
        Save
      </Button>
    </div>
  )
})

export default CreateAlbum

// const validateMessages = {
//   required: '${label} is required!',
// }
//  <div className={styles.container}>
//       <Form
//         name="CreateNewAlbum"
//         className={styles.form}
//         onFinish={onFinish}
//         validateMessages={validateMessages}
//       >
//         <Form.Item
//           className={styles.label}
//           label="Album Name"
//           name="albumName"
//           rules={[{ required: true, message: 'Please input your Album name!' }]}
//         >
//           <Input
//             className={styles.input}
//             placeholder="Enter album name ..."
//             minLength={1}
//             value={state?.title}
//             onChange={onChangeAlbum}
//           />
//         </Form.Item>
//         <UploadAlbum addFotoToAlbum={addFotoToAlbum} images={state.images}  editedAlbum={editedAlbum} />
//         <Form.Item>
//           <Button className={styles.btnSave} type="primary" htmlType="submit">
//             Save
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
