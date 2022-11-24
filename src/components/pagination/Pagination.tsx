import * as React from 'react';

import {ActionButton, ActionWrapper, Button, Container, Plug, Wrapper} from './styled'

interface PaginationProps {
    pages?: number[]
    page: number
    pageHandler: (page: number) => void
    rest?: any
}

export default function Pagination({pages, page, pageHandler, ...rest}: PaginationProps) {
   
    return (
        <Container {...rest}>
            <Wrapper>
                <Plug><i className="bi-asterisk" style={{fontSize: '0.5rem', color: 'cornflowerblue'}}/></Plug>
                {pages && pages.map((currentPage, idx) => <Button onClick={() => pageHandler(currentPage)} className={currentPage === page ? 'active' : ''} key={idx * 2}>{currentPage}</Button>)}
                <Plug><i className="bi-asterisk" style={{fontSize: '0.5rem', color: 'cornflowerblue'}}/></Plug>
            </Wrapper>
            <ActionWrapper>
                <ActionButton disabled={page === 1} onClick={() => pageHandler(page - 1)}><i className="bi-arrow-left"/> Older</ActionButton>
                <ActionButton disabled={page === pages?.length} onClick={() => pageHandler(page + 1)}>Newer <i className="bi-arrow-right" /></ActionButton>
            </ActionWrapper>
        </Container>
    );
}
