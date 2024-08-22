export default function filterItems(items: any[], searchTerm: string, tags: any[]){
    searchTerm = searchTerm.trim().toLowerCase()
    let filteredArray: any[] = []

    //filter by searchTerm
    if(searchTerm){
        items.forEach(image => {
            if(image.title.includes(searchTerm)){
                filteredArray.push(image)
            }
        })
    } else {
        filteredArray = items
    }


    let matches: any[] = []
    filteredArray.forEach(item => {
        matches.push({
            item: item,
            matchStrength: 0
        })
    })


    matches.forEach(match => {
        match.matchStrength = findNumberOfMatches(match.item.tags,tags)
    })

    matches.sort((a,b) => {
        return(b.matchStrength-a.matchStrength)
    })

    let responseArray: any[] = []

    matches.forEach(match => {
        responseArray.push(match.item)
    })

    return responseArray
}



function findNumberOfMatches(array1: any[], array2: any[]): number {
    let numberOfMatches = 0

    array1.forEach(array1Item => {
        const foundItem = array2.indexOf(array1Item) !== -1
        if(foundItem){
            numberOfMatches++
        }
    })

    return numberOfMatches
}