import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../../components/navigation/navigation.component';
import { 
    AppLayoutContainer,
    LayoutCon,
    HeaderCon,
    ContentCon,
    FooterCon
 } from './appLayout.styles';


const AppLayout: FC = () =>{
    return (
        <AppLayoutContainer>
           <LayoutCon>
                <HeaderCon>
                    <Navigation />
                </HeaderCon>
                <ContentCon>
                    <Outlet />
                </ContentCon>
                <FooterCon>Footer</FooterCon>
            </LayoutCon>
        </AppLayoutContainer>
    )
}

export default AppLayout;