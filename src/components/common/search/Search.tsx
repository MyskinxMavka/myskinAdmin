/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import {CustomSearch, SearchIcon, SearchWrapper} from './styled'

import React from 'react'

const icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNCAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cmVjdCB4PSIxMS4zNSIgeT0iMTMuNjU5MiIgd2lkdGg9IjIuODIxMzgiIGhlaWdodD0iOS4wMTQzMSIgcng9IjEuNDEwNjkiIHRyYW5zZm9ybT0icm90YXRlKC0zNi44NDA3IDExLjM1IDEzLjY1OTIpIiBmaWxsPSJibGFjayIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4NCiAgICA8cGF0aCBkPSJNMTQuODEwMiA1LjI2NkMxNi42NDkgNy43MjAzOSAxNS45MDQ4IDExLjQ0OTUgMTMuMDU0NyAxMy41ODQ3QzEwLjIwNDYgMTUuNzIgNi40MTY2OSAxNS4zODY1IDQuNTc3ODYgMTIuOTMyMUMyLjczOTAyIDEwLjQ3NzcgMy40ODMyNiA2Ljc0ODY1IDYuMzMzMzEgNC42MTMzN0M5LjE4MzM3IDIuNDc4MSAxMi45NzEzIDIuODExNjIgMTQuODEwMiA1LjI2NloiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjAuNSIvPg0KPC9zdmc+DQo='

interface SearchProps {
    data: Array<any>
    setFiltered: (data: any[]) => void
    isOrder?: boolean
}
const Search = ({data, setFiltered, isOrder, ...rest}: SearchProps) => {

    const criteriaHandler = (val: string, res: any[]) => {
        data.forEach((el) => {
            if(el?.userName && (el.userName).toLowerCase().search(val.toLowerCase()) !== -1) {
                res.push(el)
            } 

            if(el?.userSurname && (el.userSurname).toLowerCase().search(val.toLowerCase()) !== -1) {
                res.push(el)
            } 

            if(el?.id && (el.id).toLowerCase().search(val.toLowerCase()) !== -1) {
                res.push(el)
            } 

            if(el?.userId && el.user&& (el.user.name).toLowerCase().search(val.toLowerCase()) !== -1) {
                res.push(el)
            } 

            if(el?.userId && el.user && (el.user.surname).toLowerCase().search(val.toLowerCase()) !== -1) {
                res.push(el)
            } 

            if(el?.userId && (el.userId).toLowerCase().search(val.toLowerCase()) !== -1) {
                res.push(el)
            } 
        })
    }
    
    const search = (text: string) => {
        const val = text.trim();
        const res = [] as any[];

        if (val !== '') {
            if (isOrder) {
                criteriaHandler(val, res)
            } else {
                data.forEach((el) => {
                    if((el.title).toLowerCase().search(val.toLowerCase()) !== -1) {
                        res.push(el)
                    } 
                })
            }
            
            setFiltered([...new Set(res)])

        } else [
            setFiltered(data)
        ]
    }
    
    return (
        <SearchWrapper {...rest}>
            <SearchIcon src={icon}/>
            <CustomSearch
                onChange={(e) => search(e.currentTarget.value)}
                placeholder="Search"
            />
        </SearchWrapper>
    )
}

export default Search