import { FC, useState, useEffect, useContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../../components/navigation/navigation.component';
import { MenuKey, NavigationContext } from '../../context/navigation.context';
import { 
    AppLayoutContainer,
    LayoutCon,
    HeaderCon,
    ContentStartCon,
    ContentCenterCon,
    FooterCon
 } from './appLayout.styles';


export type ContentFlexType = 'start' | 'center';

const getContentCon = (type: ContentFlexType) => {
    switch(type){
        case 'start':
            return ContentStartCon;
        case 'center':
            return ContentCenterCon;
    }
}


const AppLayout: FC = () =>{
    const { currentMenuKey } = useContext(NavigationContext);
    const [ contentFlexType, setContentFlexType] = useState<ContentFlexType>('start' as ContentFlexType);


    // set the flex type by router
    useEffect(()=>{
        switch(currentMenuKey){
            case MenuKey.HOME:
            case MenuKey.MYACCOUNT:
                setContentFlexType('start' as ContentFlexType);
                break;
            default:
                setContentFlexType('center' as ContentFlexType);
                break;
        }
    },[currentMenuKey]);


    const ContentCon = useMemo(()=> getContentCon(contentFlexType),[contentFlexType]);

    return (
        <AppLayoutContainer>
           <LayoutCon>
                <HeaderCon>
                    <Navigation/>
                </HeaderCon>
                <ContentCon >
                    <Outlet />
                </ContentCon>
                <FooterCon>Footer</FooterCon>
            </LayoutCon>
        </AppLayoutContainer>
    )
}

export default AppLayout;