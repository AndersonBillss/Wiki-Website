export default function getTags(imageArray: any){
    let tags: any[] = []
    imageArray.forEach((image: any) => {
        tags = tags.concat(image.tags)
    })
    let uniqueTags = Array.from(new Set(tags))
    uniqueTags.sort()
    return uniqueTags
}