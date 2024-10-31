export const addEventOnElements = (elements,event,callback) => {
    elements.forEach((element) => {
        element.addEventListener(event, callback);
    })
}