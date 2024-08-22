let cachedConceptImageTags: any[] = []
let cachedConceptSearchTerm: string = ""

export function getCachedImageTags(): any[]{
    return cachedConceptImageTags
}
export function getCachedSearchTerm(): string{
    return cachedConceptSearchTerm
}

export function setCachedImageTags(tags: any[]){
    cachedConceptImageTags = tags
}
export function setCachedSearchTerm(searchTerm: string){
    cachedConceptSearchTerm = searchTerm
}