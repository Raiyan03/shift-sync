import { logOutUser } from "@/action/actions"

const page = () => {
  return (
    <div>
        <div>
            Employee
        </div>
        <form action={logOutUser}>
            <button type="submit">
                Logout
            </button>
        </form>
        {/* <button onClick={logOutUser}>Logout</button> */}
    </div>
  )
}

export default page