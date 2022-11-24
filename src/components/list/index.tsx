// eslint-disable-next-line @typescript-eslint/no-explicit-any

import styled from 'styled-components';

import { Item } from './item';

export const List = (
    { data, fields, update, onChange, onSave, onDelete, onSaveImage }: 
    { data: any[], fields: string[], update: any, onChange: any, onSave: () => void, onDelete: (id: number) => void, onSaveImage: (base64: string, id: number) => void }
    ) => {

    const Element = data && data?.map(item => {
        return (
            <Item 
                key={item.id} 
                items={item} 
                fields={fields} 
                update={(items) => update(items)} 
                onChange={(name, value) => onChange(name, value)}
                onSave={() => onSave()}
                onDelete={(id) => onDelete(id)}
                onSaveImage={(base64, id) => onSaveImage(base64, id)}
            />
        )
    });

    return (
        <Block>
            {Element}
        </Block>
    );
};

const Block = styled.div`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    width: 100%;
`;