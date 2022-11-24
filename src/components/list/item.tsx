/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from "react";

import { ButtonComponent } from '../button'
import FileBase64 from "react-file-base64";
import styled from "styled-components";

export const Item = (
    { items, fields, update, onChange, onSave, onDelete, onSaveImage }: 
    { items: any, fields: string[], update: (items: any) => void, onChange: (name: string, value: string) => void, onSave: () => void, onDelete: (id: number) => void, onSaveImage: (base64: string, id: number) => void }
    ) => {

    const [isUpdate, setIsUpdate] = useState(false);
    const [values, setValues] = useState({});
    const [isDownload, setIsDownload] = useState(false);

    useEffect(() => {
        setValues({...items});
    }, [items])

    const line = fields.map((field, i) => {
        if(field === 'photo') {
            if (items[field] === null) return <div></div>;
            return (
                isDownload ? 
                    <FileBase64 
                        type="file"
                        multiple={false}
                        onDone={(e) => {
                            onSaveImage(e.base64, items.id);
                            setIsDownload(false);
                        }}
                    />
                : <img onClick={() => setIsDownload(prev => !prev)} style={{ width: '100px', height: '100px'}} src={`${items[field]}`} alt={items.title} key={i}/>
            )
        }
        return (
            isUpdate ?
                <input key={i} type="text" name={field} value={values ? values[field] : items[field]} onChange={(e) => {
                    onChange(e.target.name, e.target.value);
                    setValues({...values, [e.target.name]: e.target.value });
                }}/>
            :
                <Span key={i}>
                    {items[field]}
                </Span>
        );
    });

    const clickUpdate = () => {
        update(items);
        setIsUpdate(prev => !prev);
        isUpdate && onSave()
    };

    const clickDelete = () => {
        onDelete(items.id);
    }

    return (
        <Block>
            {line}
            <Position>
                <ButtonComponent isDelete={true} onClick={() => clickDelete()}/>
                <ButtonComponent isUpdate={true} onClick={() => clickUpdate()}/>
            </Position>
        </Block>
    );
};

export const Span = styled.span`
    margin-right: 5px;
`;

export const Block = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #e6e6e6;
    padding: 5px;
    justify-content: space-between;
    align-items: center;

    :hover {
        cursor: pointer;
        background-color: #f5f5f5;
    }
`;

const Position = styled.div`
    text-align: right;
    margin: 5px;
`;
