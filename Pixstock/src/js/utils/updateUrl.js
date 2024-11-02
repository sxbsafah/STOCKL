import { urlEncode } from "./urlEncode.js"

export const updateUrl = (filterObj, searchType) => {
    setTimeout(() => {
        const rootUrl = window.location.origin;
        const searchQuery = urlEncode(filterObj)
        window.location = `${rootUrl}/pages/${searchType}/${searchType}.html?${searchQuery}`
        console.log(searchQuery)
    },500)
}