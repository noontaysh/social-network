export const updateArrayObject = (items, itemId, propName, newObjParam) => {
    return items.map(u => {
        if (u[propName] === itemId) {
            return {...u, ...newObjParam}
        }
        return u
    })
}