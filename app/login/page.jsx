export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form action="" className="bg-bgSoft p-12 rounded-lg w-1/3 h-auto flex flex-col justify-center gap-8">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <input type="text" name="username" className="p-8 border-2 border-teal-600 bg-inherit bg-bg text-text" placeholder="Name"/>
        <input type="password" name="password" className="p-8 border-2 border-teal-600 bg-inherit bg-bg text-text" placeholder="Password"/>
        <button type="submit" className='bg-red-600 p-5 rounded-sm'>Log In</button>
      </form>
    </div>
  )
}
