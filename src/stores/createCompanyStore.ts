import { IFormData } from 'models/index'
import { IMonthsList } from 'models/index'
import { IAlbumItem } from 'models/index'
import { IAdminColors } from 'models/index'
import { IAdminLabels } from 'models/index'

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
import axios from 'axios'
import { api } from '../config'

class CreateCompanyStore {
  @observable profileData: any = {
    notes:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere',
    name: '',
    address: '',
    city: '',
    monthlyPrice: 0,
    phone: '',
    firstName: '',
    lastName: '',
    ownerPhone: '',
    username: '',
    primaryColors: {
      btnColor: '#fffff',
      webColor: '#fffff',
      mobileColor: '#fffff',
    },
  }
  @observable avatar: any = null
  @observable avatarAPI: any = null

  @observable albumItem: IAlbumItem = {
    id: '',
    title: '',
    images: [],
  }

  @observable albums: any = [
    {
      id: '1',
      title: 'Main Page',
      images: [],
    },
    {
      id: '2',
      title: 'My Album',
      images: [],
    },
  ]

  @observable albumIndx = 0

  @observable language = 'english'

  @observable labelLanguages: string[] = ['userkey', 'english', 'russian', 'hebrew']

  @observable allLabals: IAdminLabels[] = [
    { id: '1', name: 'Main Page' },
    { id: '2', name: 'Info' },
    { id: '3', name: 'Page' },
    { id: '4', name: 'Admin' },
    { id: '5', name: 'Create1' },
    { id: '6', name: 'Main Page1' },
    { id: '7', name: 'Info1' },
    { id: '8', name: 'Page1' },
    { id: '9', name: 'Admin1' },
    { id: '10', name: 'Create1' },
  ]

  @observable filteredLabals: IAdminLabels[] = [...this.allLabals]

  @observable companyList: IFormData[] = [
    // {
    //   notes:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere',
    //   name: 'Serg',
    //   address: 'Serg',
    //   city: 'Serg',
    //   monthlyPrice: 100,
    //   phone: '+380683973333',
    //   firstName: 'serg',
    //   lastName: 'serg',
    //   ownerPhone: '+380683973333',
    //   username: '',
    // },
    // {
    //   notes:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere',
    //   name: 'Alina',
    //   address: 'Alina',
    //   city: 'Alina',
    //   monthlyPrice: 400,
    //   phone: '+380683972222',
    //   firstName: 'Alina',
    //   lastName: 'Alina',
    //   ownerPhone: '+380683972222',
    //   username: '',
    // },
    // {
    //   notes:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere',
    //   name: 'John',
    //   address: 'John',
    //   city: 'John',
    //   monthlyPrice: 300,
    //   phone: '+380683971111',
    //   firstName: 'John',
    //   lastName: 'John',
    //   ownerPhone: '+380683971111',
    //   username: '',
    // },
    // {
    //   notes:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere',
    //   name: 'Alla',
    //   address: 'Alla',
    //   city: 'Alla',
    //   monthlyPrice: 400,
    //   phone: '+38068397000',
    //   firstName: 'Alla',
    //   lastName: 'Alla',
    //   ownerPhone: '+38068397000',
    //   username: '',
    // },
  ]

  @observable filteredCompanyList: IFormData[] = []

  @observable commerceList: IFormData[] = [
    // {
    //   notes:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere',
    //   name: 'Serg',
    //   address: 'Serg',
    //   city: 'Serg',
    //   monthlyPrice: 100,
    //   phone: '+380683973333',
    //   firstName: 'serg',
    //   lastName: 'serg',
    //   ownerPhone: '+380683973333',
    //   username: '',
    // },
    // {
    //   notes:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere',
    //   name: 'Alina',
    //   address: 'Alina',
    //   city: 'Alina',
    //   monthlyPrice: 200,
    //   phone: '+380683972222',
    //   firstName: 'Alina',
    //   lastName: 'Alina',
    //   ownerPhone: '+380683972222',
    //   username: '',
    // },
    // {
    //   notes:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere',
    //   name: 'John',
    //   address: 'John',
    //   city: 'John',
    //   monthlyPrice: 300,
    //   phone: '+380683971111',
    //   firstName: 'John',
    //   lastName: 'John',
    //   ownerPhone: '+380683971111',
    //   username: '',
    // },
    // {
    //   notes:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere Lorem ipsum dolor sit amet consectetur adipisicing elit Illum reprehenderit autem deserunt debitis provident tempore amet tenetur perferendis hic id Officiis velit labore molestias  omnis consequatur quo ipsa ratione facere',
    //   name: 'Alla',
    //   address: 'Alla',
    //   city: 'Alla',
    //   monthlyPrice: 400,
    //   phone: '+38068397000',
    //   firstName: 'Alla',
    //   lastName: 'Alla',
    //   ownerPhone: '+38068397000',
    //   username: '',
    // },
  ]

  @observable filteredCommerceList: IFormData[] = []

  @observable monthsList: IMonthsList[] = [
    { month: 'January', total: 0 },
    { month: 'February', total: 0 },
    { month: 'March', total: 0 },
    { month: 'April', total: 0 },
    { month: 'May', total: 0 },
    { month: 'June', total: 0 },
    { month: 'Jul', total: 0 },
    { month: 'August', total: 0 },
  ]
  constructor() {
    makeAutoObservable(this)
    reaction(
      () => this.avatarAPI,
      _ => console.log('mobx', toJS(this.avatarAPI))
    )
  }

  @action setProfileData(data: IFormData) {
    this.profileData = { ...this.profileData, ...data }
  }
  @action setAvatar(data: any) {
    this.avatar = data
  }
  @action setAvatarAPI(data: any) {
    this.avatarAPI = data
  }
  @action setColorsApp(name: string, color: string) {
    this.profileData = {
      ...this.profileData,
      primaryColors: { ...this.profileData.primaryColors, [name]: color },
    }
  }
  @action setNewAlbum(data: IAlbumItem) {
    this.albums = [...this.albums, data]
  }
  @action setAlbumItem(item: any) {
    this.albumItem = this.albums.find((album: IAlbumItem) => album.id === item.id)
  }
  @action setAlbumIndx(index: number) {
    this.albumIndx = index
  }
  @action editAlbum(data: IAlbumItem | false) {
    this.albums[this.albumIndx] = data
  }
  @action remuveAlbum(item: any) {
    this.albums = this.albums.find((album: IAlbumItem) => item.id !== album.id)
  }
  @action setLanguage(data: string) {
    this.language = data
  }

  @action setFilterLabels(data: string) {
    const dataLabels = data.toLocaleLowerCase().trim()
    const filtered: IAdminLabels[] = this.allLabals.filter((label: IAdminLabels) =>
      label.name.toLocaleLowerCase().includes(dataLabels)
    )
    this.filteredLabals = filtered
  }

  @action setTotalIncrement(data: number, month: string) {
    this.monthsList.find((item: IMonthsList) => {
      if (item.month === month) {
        item.total = item.total + data
      }
    })
  }

  @action setTotalDecriment(data: number, month: string) {
    this.monthsList.find((item: IMonthsList) => {
      if (item.month === month) {
        item.total = item.total - data
      }
    })
  }

  @action setCompanyList(data: IFormData[]) {
    this.companyList = data
    this.filteredCompanyList = this.companyList
  }

  @action setCommerceList(data: IFormData[]) {
    this.commerceList = data
    this.filteredCommerceList = this.commerceList
  }

  @action setFilterCompanyList(data: string) {
    const companyList = data.toLocaleLowerCase().trim()
    const filtered: IFormData[] = this.companyList.filter(
      (company: IFormData) =>
        company.name.toLocaleLowerCase().includes(companyList) ||
        company.phone.includes(companyList)
      // ||
      // company.firstName.toLocaleLowerCase().includes(companyList)
    )
    this.filteredCompanyList = filtered
  }

  @action filterCommerceList(data: string) {
    const usersList = data.toLocaleLowerCase().trim()
    const filtered: IFormData[] = this.commerceList.filter(
      (user: IFormData) =>
        user.name.toLocaleLowerCase().includes(usersList) || user.phone.includes(usersList)
      // ||   user.firstName.toLocaleLowerCase().includes(usersList)
    )
    this.filteredCommerceList = filtered
  }

  @action async createNewUserAPI(data: IFormData) {
    const res = await api.post('/company', data, {
      headers: { Authorization: 'Bearer ' + process.env.REACT_APP_API_KEY },
    })
    if (res && res.status === 200) {
      await this.addUserAvatarAPI(this.avatarAPI, res.data._id)
    }
  }

  @action async getAllUsersAPI() {
    const res = await api.get('/company?startsFrom=50', {
      headers: { Authorization: 'Bearer ' + process.env.REACT_APP_API_KEY },
    })
    if (res && res.status === 200) {
      this.setCompanyList(res.data)
      this.setCommerceList(res.data)
    }
  }

  @action async addUserAvatarAPI(file: any, id: string, type = 'company') {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    formData.append('id', id)

    await api.post('/image', formData, {
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_API_KEY,
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
export default new CreateCompanyStore()
