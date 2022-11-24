export function generateSortFn(props: any) {
    return function (a: any, b: any) {
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            const name = prop.name;
            const reverse = prop.reverse;
            if (a[name] < b[name])
                return reverse ? 1 : -1;
            if (a[name] > b[name])
                return reverse ? -1 : 1;
        }
        return 0;
    };
}