import {
  makeAutoObservable,
  observable,
  action,
  reaction,
  toJS,
  configure,
  computed,
  runInAction,
} from 'mobx'

class ModalStore {
  @observable modal = false

  constructor() {
    makeAutoObservable(this)
    reaction(
      () => this.modal,
      _ => console.log('mobx', toJS(this.modal))
    )
  }

  @action setModal(bool: boolean) {
    this.modal = bool
  }
}

export default new ModalStore()
