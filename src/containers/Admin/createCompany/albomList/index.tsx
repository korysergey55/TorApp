import React, { useState } from 'react'
import { useStore } from 'stores'
import { observer } from 'mobx-react'
import { IAlbumItem } from './types'

import AlbomItem from './albumItem/index'
import ModalAnt from '../modal'
import CreateAlbum from '../createAlbum'

import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'antd'

const AlbomList = observer(() => {
  const { CreateCompanyStore } = useStore()
  const [modal, setModal] = useState<boolean>(false)

  const createNewAlbum = () => {
    setModal(!modal)
  }

  return (
    <ul className={styles.albumList}>
      {CreateCompanyStore.albums?.map((item: IAlbumItem, index: number) => (
        <AlbomItem item={item} itemIndex={index} key={item.id} />
      ))}
      <Tooltip title={'Add new Album'}>
        <li className={styles.item}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faPlus}
            color="black"
            size="3x"
            onClick={createNewAlbum}
          />
        </li>
      </Tooltip>
      {modal && (
        <ModalAnt visible={true} title="New Album" width="700px" onClose={() => setModal(!modal)}>
          <CreateAlbum modalFinish={() => setModal(!modal)} />
        </ModalAnt>
      )}
    </ul>
  )
})

export default AlbomList
