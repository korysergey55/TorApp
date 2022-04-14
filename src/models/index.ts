export interface IAdminInputsJSON {
  id: string
  label: string
  name: string
}

export interface IFormData {
  id?: string
  notes: string
  name: string
  address: string
  city: string
  monthlyPrice: number
  phone: string
  firstName: string
  lastName: string
  ownerPhone: string
  username: string
}

export interface IAdminTabsJSON {
  id: string
  logo: string
  businessName: string
  name: string
}

export interface IAlbumItem {
  id: string
  title: string
  images: any[]
}

export interface IAdminColors {
  btnColor: string
  webColor: string
  mobileColor: string
}

export interface IAdminLabels {
  id: string
  name: string
}

export interface IMonthsList {
  month: string
  total: number
}
