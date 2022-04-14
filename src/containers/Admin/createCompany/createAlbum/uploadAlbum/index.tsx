import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { message, Upload } from 'antd'

interface IProps {
  addFotoToAlbum: Function
  images: any[]
  editedAlbum?: any
}

const UploadComponent: React.FC<IProps> = observer(({ addFotoToAlbum, images, editedAlbum }) => {
  const [fileList, setFileList] = useState<any>([])

  useEffect(() => {
    if (editedAlbum && images.length) {
      setFileList(images)
    }
  }, [images])

  const beforeUpload = (file: any) => {
    if (file.type !== 'image/png') {
      message.error(`${file.name} is not a png file`)
    }
    return file.type === 'image/png' ? true : Upload.LIST_IGNORE
  }

  const onChange = async ({ fileList: newFileList }: any) => {
    setFileList(newFileList)
    addFotoToAlbum(newFileList)
  }

  // const remuveFoto = (file: any) => {
  //   const newFotoArr = photosArr.filter((item: any) => item.id !== file.originFileObj.uid)
  //   addFotoToAlbum(newFotoArr)
  // }

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

  const customRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok')
    })
  }

  return (
    <Upload
      customRequest={customRequest}
      listType="picture-card"
      fileList={fileList}
      multiple={true}
      maxCount={10}
      beforeUpload={beforeUpload}
      onChange={onChange}
      onPreview={onPreview}
      // onRemove={remuveFoto}
      headers={{}}
    >
      {'+ Upload'}
    </Upload>
  )
})
export default UploadComponent

// const onChange = async ({ fileList: newFileList }: any) => {
//   console.log('newFileList', newFileList)
//   setFileList(newFileList)

//   newFileList.forEach(async (file: any) => {
//     let src = file.url
//     if (!src) {
//       src = await new Promise(resolve => {
//         const reader = new FileReader()
//         reader.readAsDataURL(file.originFileObj)
//         reader.onload = () => {
//           resolve(reader.result)
//           // photosArr.push(reader.result)
//         }
//       })
//     }
//     photosArr.push(file)
//     addFotoToAlbum(photosArr)
//   })
// }
