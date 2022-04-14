import AdminMain from 'containers/Admin/adminMain/index'
import CreateCompany from 'containers/Admin/createCompany/index'
import CompanyList from 'containers/Admin/companyList/index'
import Commerce from 'containers/Admin/commerce/index'

export const adminRoutes = [
  {
    name: 'MainPage',
    path: '/admin/main',
    component: AdminMain,
    exact: true,
  },
  {
    name: 'CreateCompany',
    path: '/admin/createCompany',
    component: CreateCompany,
    exact: true,
  },
  {
    name: 'CompanyList',
    path: '/admin/companyList',
    component: CompanyList,
    exact: true,
  },
  {
    name: 'Commerce',
    path: '/admin/commerce',
    component: Commerce,
    exact: true,
  },
]
