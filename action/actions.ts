"use server"
import { auth, signIn, signOut } from "@/auth"
import { db } from "@/lib/firebase"
import { saltAndHashPassword } from "@/lib/utilities"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { CredentialsSignin } from "next-auth"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/getSession"
import { updateUserDataInDB } from "@/data/user"

const loginUser = async (formData: FormData) =>{
    const email = formData.get('email');
    const password = formData.get('password');
    try{
       await signIn('credentials',{
        redirect: true,
        redirectTo: '/',
        callbackUrl: '/',
        email: email,
        password: password,
       });
       console.log("User Logged In Successfully")
    }catch(error){
        const someError =error as CredentialsSignin
        // throw someError
        console.log(someError)
    }
    redirect("/");   
}



const registerUser = async (formData: FormData)=>{

    const name = formData.get('fname') + " " + formData.get('lname')
    const email = formData.get('email').toLowerCase()
    const teamName = formData.get('team')
    const password = formData.get('password')
    
    const id = Math.floor(Math.random() * 100000);

    let realId = `${teamName.slice(0,6).toLowerCase()}-${5}${id}`;
    realId = realId.replace(/\s+/g, '')

    const hashedPassword = await saltAndHashPassword(password)
    
    if(!name || !teamName || !password || !email){
        throw new Error("Please fill all the fields")
    }

    const userReference = collection(db, 'Organizations/')
    const userQuery = query(userReference, where("email", "==", email ))

    try {
        const userSnapshot = await getDocs(userQuery);

        if(userSnapshot.empty){
            await setDoc(doc(db, `Organizations/`, realId),{
                name: name,
                email: email,
                organization: teamName,
                password: hashedPassword,
                role: "manager",
                id: realId
            })
            console.log("User Registered Successfully")
            
        }else{
            return null
        }

    } catch (error) {   
        throw new Error(error)
    }

    redirect('/auth/login');

}

const logOutUser = async() => {
    await signOut({redirectTo: '/auth/login'})
}

const getUser = async()=>{
    const session = await getSession();
    const user = session?.user;
    return user;
}

const updateUserData = async(formData: FormData)=>{
    const {id, email, password, status, role} = Object.fromEntries(formData)
    
    try{
        const updatedFields = {
            email, 
            password, 
            status, 
            role
        }
        Object.keys(updatedFields).forEach((key)=>(updatedFields[key] === "" || undefined) && delete updatedFields[key])

        if(updatedFields.password !== undefined || ""){
            const hashedPassword = await saltAndHashPassword(updatedFields.password)

            updatedFields.password = hashedPassword
        }

        if(updatedFields.status !== "undefined" || ""){
            var statusUpdated : boolean
            updatedFields.status == "Full Time"? statusUpdated = true : statusUpdated = false
            updatedFields.status = statusUpdated
        }

        var response = await updateUserDataInDB(id, updatedFields)
    }catch(err){
        console.log(err)
    }
    if(response == true){
        redirect("/manager/employees/")
    }
}

export {registerUser, loginUser, logOutUser, getUser, updateUserData}