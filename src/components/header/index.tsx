import { Content, H1 } from './styled';

import { useLocation } from "react-router-dom"

export const Header = ({children}: {children: React.ReactNode}): React.ReactElement => {
    const location = useLocation();
    const head = location.pathname.slice(6) === 'product/new' ? 'New / edit Product' : location.pathname.slice(6) === 'brand/new' ? 'New / edit brand' : location.pathname.slice(6)
    
    return (
        <Content>
            <H1>{head}</H1>
            {children}
        </Content>
    )
}