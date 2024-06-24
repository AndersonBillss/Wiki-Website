let cachedAssetImageTags: any[] = []
let cachedAssetSearchTerm: string = ""

let cachedConceptImageTags: any[] = []
let cachedConceptSearchTerm: string = ""

export function getCachedImageTags(pageName: string): any[]{
    if(pageName === 'assets'){ 
        return cachedAssetImageTags
    } else if (pageName === 'concept'){
        return cachedConceptImageTags
    } else {
        return []
    }
}
export function getCachedSearchTerm(pageName: string): string{
    if(pageName === 'assets'){
        return cachedAssetSearchTerm
    } else if (pageName === 'concept'){
        return cachedConceptSearchTerm
    } else {
        return ''
    }
}

export function setCachedImageTags(pageName: string, tags: any[]){
    if(pageName === 'assets'){
        cachedAssetImageTags = tags
    } else if (pageName === 'concept'){
        cachedConceptImageTags = tags
    }
}
export function setCachedSearchTerm(pageName: string, searchTerm: string){
    if(pageName === 'assets'){
        cachedAssetSearchTerm = searchTerm
    } else if (pageName === 'concept'){
        cachedConceptSearchTerm = searchTerm
    }
}