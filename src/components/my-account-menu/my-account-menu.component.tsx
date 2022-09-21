import { MyMenuCon } from './my-account-menu.styles';

import {
    UserOutlined,
    BellFilled,
    AppstoreOutlined,
    ContainerOutlined,
    BulbOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
    Menu, 
    message
 } from 'antd';
import { useNavigate } from 'react-router-dom';


export enum MyAccountMenuLabelEnum {
    PERSONNALINFO = 'Personal information',
    MyEVENT = 'My event',
    NOTIFICATIONS = 'Notifications'
}
export enum MyAccountMenuKeyEnum {
    PERSONNALINFO = 'person',
    MyEVENT = 'myEvent',
    NOTIFICATIONS = 'notifications',
}

type MenuItem = Required<MenuProps>['items'][number];
const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
};
const items: MenuItem[] = [
    getItem(MyAccountMenuLabelEnum.PERSONNALINFO, MyAccountMenuKeyEnum.PERSONNALINFO, <UserOutlined />),
    getItem(MyAccountMenuLabelEnum.MyEVENT, MyAccountMenuKeyEnum.MyEVENT, <BulbOutlined  />),
    getItem(MyAccountMenuLabelEnum.NOTIFICATIONS, MyAccountMenuKeyEnum.NOTIFICATIONS, <BellFilled />),
  ];



export const MyAccountMenu = () => {
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = e => {
        const parentPath = `/myAccount`;
        console.log(e.key)
        switch(e.key){
            case MyAccountMenuKeyEnum.PERSONNALINFO:
                navigate(`${parentPath}/`);
                break;
            case MyAccountMenuKeyEnum.MyEVENT:
                navigate(`${parentPath}/events`);
                break;
            case MyAccountMenuKeyEnum.NOTIFICATIONS:
                navigate(`${parentPath}/notifications`);
                break;
        }
        // console.log('click ', e);
        // navigateTo(e.key as MenuKey);
        
    };
    return (
        <MyMenuCon>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                onClick = {onClick}
                // inlineCollapsed={collapsed}
                items={items}
            />
        </MyMenuCon>
    )
}