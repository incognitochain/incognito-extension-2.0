export const isChrome = () => {
    // Chrome 1 - 79
    return !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
};

export const isEdge = () => {
    // Edge (based on chromium) detection
    return isChrome() && navigator.userAgent.indexOf('Edg') !== -1;
};

export const isOpera = () => {
    // Opera 8.0+
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
};

export const isBrave = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (navigator.brave && (await navigator.brave.isBrave())) || false;
};
