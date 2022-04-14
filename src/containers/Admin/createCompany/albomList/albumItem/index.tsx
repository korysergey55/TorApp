import React, { useState } from 'react'
import { useStore } from 'stores'
import { observer } from 'mobx-react'
import { IAlbumItem } from '../types'

import ModalAnt from '../../modal/index'
import CreateAlbum from '../../createAlbum/index'

import styles from './styles.module.scss'
import albumIMG from 'sources/images/albutIMG.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { Card } from 'antd'
const { Meta } = Card

interface Iprops {
  item: IAlbumItem
  itemIndex: number
}

const AlbumItem: React.FC<Iprops> = observer(({ item, itemIndex }) => {
  const { CreateCompanyStore } = useStore()
  const [album, setAlbum] = useState<any>(null)
  const [modal, setModal] = useState<boolean>(false)

  const getEditAlbum = (item: IAlbumItem) => {
    setAlbum(item)
    CreateCompanyStore.setAlbumIndx(itemIndex)
    CreateCompanyStore.setAlbumItem(item)
    setModal(!modal)
  }

  return (
    <div className={styles.container}>
      <li className={styles.item}>
        <Card
          hoverable
          style={{ width: 150 }}
          cover={
            <img
              className={styles.img}
              alt="logo"
              src={item.images?.length ? item.images[0].thumbUrl : albumIMG}
            />
          }
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon={faEdit}
            color="black"
            size="1x"
            onClick={() => getEditAlbum(item)}
          />
          <Meta title={item.title} />
        </Card>
      </li>
      <ModalAnt visible={modal} title="Edit Album" width="700px" onClose={() => setModal(!modal)}>
        <CreateAlbum editedAlbum={album} modalFinish={() => setModal(!modal)} />
      </ModalAnt>
    </div>
  )
})

export default AlbumItem
