export function parsePageContent(string: string){
    string = htmlEncode(string)

    for(let i=0; i<string.length; i++){
        const letter = string[i]
        const nextLetter = string[i+1]
        
        //[[
        if(letter === "[" && nextLetter === "["){
            let linkEnd
            for(let j=i; j<string.length; j++){
                //]]
                if(string[j] === "]" && string[j+1] === "]"){
                    linkEnd = j
                    break
                }

            }
            if(!linkEnd){
                return
            }

            const linkCode = string.slice(i+2, linkEnd)

            let seperationIndex
            for(let j=0; j<linkCode.length; j++){
                if(linkCode[j] === "|"){
                    seperationIndex = j
                }
            }
            if(!seperationIndex){
                return
            }
            const linkTarget = linkCode.slice(0, seperationIndex)
            const linkText = linkCode.slice(seperationIndex+1, linkCode.length)
            const anchorElement = `<a href="/page/${linkTarget}">${linkText}</a>`
            
            string = string.slice(0,i) + anchorElement + string.slice(linkEnd+2, string.length)
            
        
            i=anchorElement.length
        }
    }

    string = string.replace(/!\[!/g, '[');
    string = string.replace(/!\]!/g, ']');
    string = string.replace(/ {2}/g, ' &nbsp;')

    return(string)
}
    




function htmlEncode(str: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };

    return str.replace(/[&<>"']/g, function(m) {
        return map[m as keyof typeof map];
    });
}


function htmlDecode(str: string): string {
    const map: { [key: string]: string } = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&nbsp;': ' '
    };

    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g, function(m) {
        return map[m as keyof typeof map];
    });
}




export function encodePageContent(string: string){
    //this replaces [ with ![! and ] with !]!
    string = string.replace(/\[/g, '![!')
    string = string.replace(/\]/g, '!]!')

    //this removes all html tags except for anchor tags
    string = string.replace(/<(?!\/?a(?=>|\s.*>))\/?[^>]+>/gi, '')



    for(let i=0; i<string.length; i++){
        const letter = string[i]
        const nextLetter = string[i+1]

        if(letter === "<" && nextLetter === "a"){

            const targetWord = " href="
            //make sure tag contains " href="
            const validHref = string.slice(i+2,i+2+targetWord.length).toLowerCase() ===  targetWord
            if(!validHref){
                console.error("no valid href tag")
                return
            }
           

            const referenceIndex = i+3+targetWord.length
            let referenceEndIndex
            for(let j=referenceIndex; j<string.length; j++){
                if(string[j] === '"'){
                    referenceEndIndex = j
                    break
                }
            }
            if(!referenceEndIndex){
                console.error("no closing quote for refence")
                return
            }
            const href = string.slice(referenceIndex, referenceEndIndex)
            const location ="/page/"
            const validReference = href.slice(0,location.length).toLowerCase() === location
            //return if tag has no valid reference
            if(!validReference){
                console.error("invalid reference in anchor tag")
                return
            }
            const pageName = href.slice(location.length, href.length)

            let linkedWordStart
            let linkedWordEnd
            for(let j=referenceEndIndex; j<string.length; j++){
                if(string[j] === ">"){
                    linkedWordStart = j+1
                    for(let k=j; k<string.length; k++){
                        if(string[k] === "<" && string[k+1] === "/" && string[k+2] === "a" && string[k+3] === ">"){
                            linkedWordEnd = k
                            break
                        }
                    }
                    break
                }
            }
            if(!linkedWordStart || !linkedWordEnd){
                console.error("invalid anchor tag")
                return
            }

            const linkedWord = string.slice(linkedWordStart, linkedWordEnd)

            if(htmlDecode(linkedWord).trim() === ""){
                console.log('empty anchor tag')
                const newString = `${string.slice(0,i)}${string.slice(linkedWordEnd+4, string.length)}`
                string = newString
            } else {
                const newLink=`[[${pageName}|${linkedWord}]]`
                const newString = `${string.slice(0,i)}${newLink}${string.slice(linkedWordEnd+4, string.length)}`
                string = newString
                i+=newLink.length
            }
        }

    }




    return(htmlDecode(string))
}