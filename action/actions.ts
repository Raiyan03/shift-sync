"use server"
import { auth, signIn, signOut } from "@/auth"
import { db } from "@/lib/firebase"
import { saltAndHashPassword } from "@/lib/utilities"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { CredentialsSignin } from "next-auth"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/getSession"

const loginUser = async (formData: FormData) =>{
    const email = formData.get('email');
    const password = formData.get('password');

    try{
       await signIn('credentials',{
        redirect: false,
        redirectTo: '/',
        callbackUrl: '/',
        email: email,
        password: password,
       });
       console.log("User Logged In Successfully")
    }catch(error){
        const someError =error as CredentialsSignin
        throw someError
    }
    redirect("/");
}



const registerUser = async (formData: FormData)=>{

    const name = formData.get('fname') + " " + formData.get('lname')
    const email = formData.get('email').toLowerCase()
    const teamName = formData.get('team')
    const password = formData.get('password')
    
    const id = Math.floor(Math.random() * 100000);

    const realId = `${teamName.slice(0,6).toLowerCase()}-${5}${id}`;

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

export {registerUser, loginUser, logOutUser, getUser}