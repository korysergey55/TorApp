import React, { useState } from 'react'
import { Menu, Button } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  LinkOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router'
import { MenuInfo } from 'rc-menu/lib/interface'

const SideBar = () => {
  const [collapsed, setState] = useState<boolean>(false)
  const history = useHistory()

  const onCollapse = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setState(!collapsed)
  }
  const onChange = (e: MenuInfo) => {
    history.push(`/admin/${e.key}`)
  }
  // style={{ width: 256 }}
  return (
    <div>
      {/* <Button type="primary" onClick={e => onCollapse(e)} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button> */}
      <Menu
        defaultSelectedKeys={['main']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        onClick={onChange}
      >
        <Menu.Item key="main" icon={<PieChartOutlined />}>
          Main Page
        </Menu.Item>
        <Menu.Item key="createCompany" icon={<LinkOutlined />}>
          Create Company
        </Menu.Item>
        <Menu.Item key="companyList" icon={<AppstoreOutlined />}>
          Company List
        </Menu.Item>
        <Menu.Item key="commerce" icon={<ContainerOutlined />}>
          Commerce
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default SideBar
