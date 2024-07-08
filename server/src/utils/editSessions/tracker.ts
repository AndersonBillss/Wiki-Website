
export const tracker = {
    editingSessions: [] as editSession[],

    addEditSession(userName: string, pageName: string){
        this.editingSessions.push({ pageName: pageName, userName: userName })
    },
    removeEditSession(userName: string){
        let targetSessionIndex: number = -1
        this.editingSessions.forEach((session: editSession, index: number) => {
            if(session.userName === userName){
                targetSessionIndex = index
            }
        });

        if(targetSessionIndex > -1){
            this.editingSessions.splice(targetSessionIndex,1)
        }
    },

    findWhoIsEditing(pageName: string): string | undefined{
        const targetSession: editSession | undefined = this.editingSessions.find((session: editSession) => session.pageName === pageName)

        const targetUser = targetSession?.userName
        return targetUser
    },


}

interface editSession {
    pageName: string,
    userName: string
}