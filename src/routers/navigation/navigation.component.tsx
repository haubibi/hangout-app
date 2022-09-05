import { FC, useState} from "react";
import { Menu, MenuProps } from "antd";
import { Col, Divider, Row } from 'antd';
import NavigationMenu from "../../components/navigationMenu/navigationMenu.component";
import { Outlet } from "react-router-dom";
import React from "react";

const Navigation:FC = () => { 
    return(
        <div className="navigation-container">
            <Row>
                <Col span={24}>
                    <NavigationMenu />
                </Col>
            </Row>
            <Outlet />
        </div>
    )
}

export default Navigation;