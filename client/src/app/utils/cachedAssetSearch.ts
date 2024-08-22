let cachedAssetTags: any[] = []
let cachedSearchTerm: string = ""

export function getCachedAssetTags(): any[]{
    return cachedAssetTags
}
export function getCachedSearchTerm(): string{
    return cachedSearchTerm
}

export function setCachedAssetTags(tags: any[]){
    cachedAssetTags = tags
}
export function setCachedSearchTerm(searchTerm: string){
    cachedSearchTerm = searchTerm
}