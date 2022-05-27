export const moveEleToEndByIndex = (arr: any[], index: number) => {
    if (!arr[index]) {
        return arr;
    }
    let result: any[] = [...arr];
    result.push(result.splice(index, 1)[0]);
    return result;
};
