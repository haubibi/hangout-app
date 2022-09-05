import { FC,useState } from 'react';
import React from "react";
import { Menu, MenuProps } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { PandaIcon } from '../../assets/svgIcon/custom.icon'
const items: MenuProps['items'] = [
    {
        label: '',
        key: 'home',
        icon: <PandaIcon />,
    },
    {
        label: 'Fun',
        key: 'fun',
        // icon: <MailOutlined />,
    }
]

const NavigationMenu: FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <Menu 
            onClick={onClick} 
            selectedKeys={[current]} 
            mode="horizontal" 
            items={items}
            theme = "dark"
        />
    )
}

export default NavigationMenu;    