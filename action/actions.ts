"use server"
import { signIn, signOut } from "@/auth"
import { db } from "@/app/lib/firebase"
import { saltAndHashPassword } from "@/app/lib/utilities"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { CredentialsSignin } from "next-auth"
import { redirect } from "next/navigation"
import { getSession } from "@/app/lib/getSession"

const loginUser = async (formData: FormData) =>{
    const email = formData.get('email');
    const password = formData.get('password');

    try{

       await signIn('credentials',{
        redirect: false,
        callbackUrl: '/',
        email: email,
        password: password,
       })
       return true;
    }catch(error){
        const someError =error as CredentialsSignin
        throw someError
    }
    redirect('/')

}



const registerUser = async (formData: FormData)=>{

    const name = formData.get('fname') + " " + formData.get('lname')
    const email = formData.get('email').toLowerCase()
    const teamName = formData.get('team')
    const password = formData.get('password')
    
    const id = Math.floor(Math.random() * 100000);

    const realId = `${teamName.slice(0,6).toLowerCase()}-${id}`;

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
                password: hashedPassword,
                id: realId
            })
            console.log("User Registered Successfully")
            
        }else{
            return null
        }

    } catch (error) {   
        throw new Error(error)
    }
    redirect('/login');

}

const logOutUser = async() => {
    await signOut()
}

const getUser = async()=>{
    const session = await getSession();
    const user = session?.user;
    return user;
}

export {registerUser, loginUser, logOutUser, getUser}