const extractData = (images:Array<string>, title: string, descriptions: Array<string>)=>{
    let result: Result = {};

    images.forEach((image)=>{
        let srcIndex = image.indexOf('src="')+5;
        let imageSrcEnd = image.indexOf('"', srcIndex)
        let imgSrc = image.slice(srcIndex, imageSrcEnd)
        if(result.images){
            result.images.push(imgSrc)
        }
        else{
            result.images = [imgSrc]
        }
    })

    descriptions.forEach((description)=>{
        let descIndex = description.indexOf('content="')+9;
        let descEnd = description.indexOf('"', descIndex)
        let desc = description.slice(descIndex, descEnd)
        if(result.Description){
            result.Description.push(desc)
        }
        else{
            result.Description = [desc]
        }
    })

    let titleText = title.slice(title.indexOf(">")+1, title.indexOf("<", title.indexOf(">")+1))
    result.Title = titleText;

    return result
}

export default extractData;