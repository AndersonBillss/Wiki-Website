
export const tracker = {
    editingSessions: [] as editSession[],

    addEditSession(section: string, userName: string, pageName: string){
        this.removeEditSession(userName)
        this.editingSessions.push({ pageName: pageName, userName: userName, section: section })
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

    findWhoIsEditing(section: string, pageName: string): string | undefined{
        const targetSession: editSession | undefined = this.editingSessions.find(
            (session: editSession) => 
            session.pageName === pageName/*  && session.section === section */
        )

        const targetUser = targetSession?.userName
        return targetUser
    },


}

interface editSession {
    pageName: string,
    userName: string,
    section: string,
}