const dataReducer = () => {
    return []
}

const dataItemReducer = (selectedItem=null, action) => {
    if (action.type=== 'DATA_SELECTED') {
        return action.payload
    } 
    return selectedSong
}