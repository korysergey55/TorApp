import React, { useState } from 'react'
import { useStore } from 'stores'
import { observer } from 'mobx-react'

import styles from './styles.module.scss'
import { Upload, Tooltip } from 'antd'
import ImgCrop from 'antd-img-crop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

const UploadComponent = observer(() => {
  const { CreateCompanyStore } = useStore()
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ])

  const onChange = async ({ file }: any) => {
    // console.log('file-onChange', file.originFileObj)
    CreateCompanyStore.setAvatarAPI(file.originFileObj)
    setFileList(file)
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => {
          resolve(reader.result)
          CreateCompanyStore.setAvatar(reader.result)
        }
      })
    }
    // CreateCompanyStore.setAvatar(src)
  }

  const onPreview = async (file: any) => {
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => {
          resolve(reader.result)
        }
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow: any = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  return (
    <ImgCrop rotate>
      <Upload
        listType="picture-card"
        showUploadList={false}
        onChange={onChange}
        onPreview={onPreview}
      >
        {!CreateCompanyStore.avatar && (
          <Tooltip title="Add Logo">
            <FontAwesomeIcon className="icon" icon={faUser} color="grey" size="3x" />
          </Tooltip>
        )}
        {CreateCompanyStore.avatar && (
          <Tooltip title="Change Logo">
            <img src={CreateCompanyStore.avatar} alt="userAvatar" />
          </Tooltip>
        )}
      </Upload>
    </ImgCrop>
  )
})
export default UploadComponent
