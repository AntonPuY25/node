const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export const productRepository = {
    findVideo(videoId : number){
        return videos.find(({id})=>videoId === id)
    },
    getVideo(){
        return videos
    },
    createVideo(title:string){
        const newVideo = {
            id: +(new Date()),
            title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        return newVideo;
    },
    deleteVideo(videoId : number){
        const currentVideoId = videos.findIndex(({id})=>videoId === id)
        if(currentVideoId !== -1){
            return videos.splice(currentVideoId,1)
        }else{
            return null
        }
    },

    updateVideo(videoId : number, title: string){
        const currentVideo = videos.find(({id})=>videoId === id)
        if(currentVideo){
            currentVideo.title = title;
            videos.splice(videoId-1,1,currentVideo)
            return videos
        }else{
            return  null
        }
    }


}