import {
    useContext
} from 'react'
import { MyMenuCon } from './my-account-menu.styles';

import {
    UserOutlined,
    BellFilled,
    BulbOutlined,
  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
    Menu,
 } from 'antd';
import { useNavigate } from 'react-router-dom';
import { NavigationContext, MyAccountMenuKey} from '../../../context/navigation.context';

export enum MyAccountMenuLabelEnum {
    PERSONNALINFO = 'Personal information',
    EVENTS = 'Events',
    EVENTS_I_ORGANIZE = 'Hosting',
    EVENTS_I_ATTEND = 'Attending',
    NOTIFICATIONS = 'Notifications',
    NOTIFICATIONS_APPLICATION = "applications",
    NOTIFICATIONS_REQUEST = "requests",
    NOTIFICATIONS_EVENT_UPDATE = "event update"
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
    getItem(MyAccountMenuLabelEnum.PERSONNALINFO, MyAccountMenuKey.PERSONNALINFO, <UserOutlined />),
    getItem(MyAccountMenuLabelEnum.EVENTS, MyAccountMenuKey.EVENTS, <BulbOutlined  />,[
        getItem(MyAccountMenuLabelEnum.EVENTS_I_ORGANIZE, MyAccountMenuKey.EVENTS_I_ORGANIZE),
        getItem(MyAccountMenuLabelEnum.EVENTS_I_ATTEND, MyAccountMenuKey.EVENTS_I_ATTEND),
    ]),
    getItem(MyAccountMenuLabelEnum.NOTIFICATIONS, MyAccountMenuKey.NOTIFICATIONS, <BellFilled />,[
        getItem(MyAccountMenuLabelEnum.NOTIFICATIONS_APPLICATION, MyAccountMenuKey.NOTIFICATIONS_APPLICATION),
        getItem(MyAccountMenuLabelEnum.NOTIFICATIONS_REQUEST, MyAccountMenuKey.NOTIFICATIONS_REQUEST),
        getItem(MyAccountMenuLabelEnum.NOTIFICATIONS_EVENT_UPDATE, MyAccountMenuKey.NOTIFICATIONS_EVENT_UPDATE),
    ]),
  ];



export const MyAccountMenu = () => {
    const navigate = useNavigate();
    const { currentMenuKey } = useContext(NavigationContext);
    const onClick: MenuProps['onClick'] = e => {
        const parentPath = `/myAccount`;
        console.log(e.key)
        switch(e.key){
            case MyAccountMenuKey.PERSONNALINFO:
                navigate(`${parentPath}/`);
                break;
            case MyAccountMenuKey.EVENTS_I_ORGANIZE:
                navigate(`${parentPath}/events/`);
                break;
            case MyAccountMenuKey.EVENTS_I_ATTEND:
                navigate(`${parentPath}/events/attend`);
                break;
            case MyAccountMenuKey.NOTIFICATIONS_APPLICATION:
                navigate(`${parentPath}/notifications/`);
                break;
            case MyAccountMenuKey.NOTIFICATIONS_REQUEST:
                navigate(`${parentPath}/notifications/requests`);
                break;
            case MyAccountMenuKey.NOTIFICATIONS_EVENT_UPDATE:
                navigate(`${parentPath}/notifications/event`);
                break;
        }
        // console.log('click ', e);
        // navigateTo(e.key as MenuKey);
        
    };

    console.log('currentMenuKey:', currentMenuKey)
    return (
        <MyMenuCon>
            <Menu
                selectedKeys = {[currentMenuKey]}
                mode="inline"
                theme="dark"
                onClick = {onClick}
                defaultOpenKeys={[MyAccountMenuKey.NOTIFICATIONS, MyAccountMenuKey.EVENTS]}
                // inlineCollapsed={collapsed}
                items={items}
            />
        </MyMenuCon>
    )
}