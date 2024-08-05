import { useAndCompileContext } from "./context/CompileContext"
import "./css/signin.css"
import {useForm} from "react-hook-form"

export const Sigin = () => {
const {getCredentials} = useAndCompileContext()
const {handleSubmit, register, formState: {errors}} = useForm()

const handleSignIn = handleSubmit( async data => {
    getCredentials(data)
})


    return (
        <div className="div-signin">
            <div>
                <h2>Signin</h2>
                <form onSubmit={(e) => handleSignIn(e)}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"  {...register("username")}/>
                    {errors.username && errors.username.message}
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"  {...register("password")}/>
                    {errors.password && errors.password.message}
                    <button type="submit" className="btn-signin">Singin</button>
                </form>
            </div>
        </div>
    )
}