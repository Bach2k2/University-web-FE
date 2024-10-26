export function getErrorMessage(error: any, defaultMessage?: string) {
    const { data } = error;
    if (data) {
        const { error: message, error_description, detail } = data
        return error_description 
            ? error_description 
            : detail
                ? detail
                :message;
    }
    return defaultMessage;
}