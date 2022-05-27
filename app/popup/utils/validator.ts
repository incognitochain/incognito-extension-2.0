const NAME_PATTERN = /^[A-Za-z0-9]*$/;

const validateAlphaNumericText = (text: string) => {
    return !(text.length === 0 || !NAME_PATTERN.test(text));
};

const validator = {
    validateAlphaNumericText,
};

export default validator;
