import { DocumentNode, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const Query = (QUERY: DocumentNode) => {
    const [datas, setDatas] = useState();

    const { loading, error, data } = useQuery(QUERY);
    
    useEffect(() => {
        setDatas(data);
    }, [loading]);

    return datas;
}