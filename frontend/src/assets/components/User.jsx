import { useEffect, useState } from "react"
import { useAndCompileContext } from "./context/CompileContext"
import {useForm} from "react-hook-form"

export const User = () => {
const {getDataUsers, dataConsultedUsers, payloadToken, errorData, postDataUsers} = useAndCompileContext()
const [modal, setModal] = useState(false)
const {handleSubmit, register, formState: {errors}} = useForm()

const handleCreateUser = handleSubmit((data) => {
    postDataUsers(data)
})

useEffect(()=> {
    const effectGetUsers = async () => await getDataUsers()
    console.log("EFFECT USERS WHEN PAYLOAD CHANGE")
    effectGetUsers()
},[payloadToken])

    return (<section>
        <h1>TABLE USERS</h1>

        <div className={modal ? "modal-create" : "modal-create-nodisplay"}>
            <button onClick={() => setModal(!modal)} type="button" className="btn-x-create">X</button>
            <h3>CREATE USER</h3>
            
            <form onSubmit={(e) => handleCreateUser(e)} className="form-modal-create">
                <label htmlFor="username" className="label-modal-create">username</label> 
                <input type="text" name="username" {...register("username", {required: true})}/>
                
                <label htmlFor="password" className="label-modal-create">password</label> 
                <input type="password" name="password" {...register("password", {required: true})} />
                
                <label htmlFor="email" className="label-modal-create">e-mail</label> 
                <input type="email" name="email" {...register("email", {required: true})} />
                <div className="div-check-box-create-modal">
                    <label htmlFor="is_staff" className="label-modal-create">staff</label>
                    <input type="checkbox" name="is_staff" {...register("is_staff")} />
                    <label htmlFor="is_superuser" className="label-modal-create">superuser</label>
                    <input type="checkbox" name="is_superuser" {...register("is_superuser")} />
                    <label htmlFor="is_active" className="label-modal-create">active</label>
                    <input type="checkbox" name="is_active" {...register("is_active")} />
                </div>
                <button className="btn-modal-create" type="submit">create user</button>
                {errorData && <p>{errorData}</p>}
            </form>
        </div>

        <div className="div-CV">
            <button onClick={() => getDataUsers()} type="button" className="btn-get">RELOAD TABLE</button>
            <button onClick={() => setModal(!modal)} type="button" className="btn-create">CREATE USER</button>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Super User</th>
                    <th>Staff</th>
                    <th>Active</th>
                    <th>Register</th>
                    <th>Editing</th>
                </tr>
            </thead>
            <tbody>

                {dataConsultedUsers.length ? dataConsultedUsers.map((data, index)=> {
                    return  <tr key={index}>
                                    <td>{data.username}</td>
                                    <td>{data.email}</td>
                                    <td>{data.password}</td>
                                    <td>{data.is_superuser ? "True" : "False"}</td>
                                    <td>{data.is_staff ? "True" : "False"}</td>
                                    <td>{data.is_active ? "True" : "False"}</td>
                                    <td>{data.date_joined}</td>
                                    <td className={(payloadToken.staff || payloadToken.superuser) ? "td-none"  : "class-btns-nodisplay"}>
                                    <button className={!payloadToken.superuser ? "class-btns-nodisplay" : "btn-del"}>DEL</button>
                                    <button className="btn-edit">EDIT</button>
                                    </td>
                            </tr>})
                :
                <tr>
                        <td>NONE</td>
                        <td>NONE</td>
                        <td>NONE</td>
                        <td>NONE</td>
                        <td>NONE</td>
                        <td>NONE</td>
                        <td>NONE</td>
                        <td>
                        <button className="btn-del">DEL</button>
                        <button className="btn-edit">EDIT</button>
                        </td>
                </tr>}
            </tbody>
        </table> 
    </section>)
}