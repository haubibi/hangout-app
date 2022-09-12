import { FC } from "react";
import { Link } from "react-router-dom";
import NavigationMenu from "../navigationMenu/navigationMenu.component";
import {
     NavigationContainer,
     PandaHomeIconCon
     } from './navigation.styles';
import { PandaIcon } from '../../assets/svgIcon/custom.icon';

import {
     Col,
     Row
    } from 'antd';

export const Navigation:FC = () => { 
    return(
        <NavigationContainer>
            {/* <Row>
                <Col>
                    <PandaHomeIconCon>
                        <Link to={`/`}><PandaIcon /></Link>
                    </PandaHomeIconCon>
                </Col>
            </Row> */}
            <NavigationMenu />
        </NavigationContainer>
    )
}

