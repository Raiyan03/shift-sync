export async function getShiftDataFromDB(id: string){
    const response = await fetch(`/api/getShiftData/${id}`)
    const data = await response.json()
    return data
}
export async function getShiftDataForTheUserFromDB(id: string){
    const response = await fetch(`/api/getShiftDataForTheUser/${id}`)
    const data = await response.json()
    return data
}

export async function getUserPreferencesForTheBackend(id: string){
    const response = await fetch(`/api/getUserPreferences/${id}`)
    const data = await response.json()
    return data
}
export async function getEmployeesDataFromDB(collectionId: string){
    const response = await fetch(`/api/getEmployeesData/${collectionId}`)
    const data = await response.json()
    return data
}

export async function setEmployeeDataForTheDB(collectionId: string, userData: any){
    const response = await fetch(`/api/setEmployeeData`, {
        method: "POST",
        body: JSON.stringify({
            collId: collectionId,
            data: userData
        }),
        headers: {
            "Content-type": "application/json",
        }
    })
    return response.json()
}

export async function deleteEmployeeFromDB(collectionId: string, userId: string){
    const response = await fetch(`/api/deleteEmployee`, {
        method: "POST",
        body: JSON.stringify({
            collId: collectionId,
            userId: userId,
        }),
        headers: {
            "Content-type": "application/json",
        }
    })
}