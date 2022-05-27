export const isJsonString = (str: any) => {
    try {
        JSON.parse(str);
    } catch {
        return false;
    }
    return true;
};
