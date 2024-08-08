import { useEffect, useState } from "react"
import { useAndCompileContext } from "./context/CompileContext"
import {useForm} from "react-hook-form"

export const User = () => {
const {getDataUsers, dataConsultedUsers, editDataUser, payloadToken, errorData, postDataUsers, deleteDataUser, getIdUser, dataConsultedUserForId} = useAndCompileContext()
const [modal, setModal] = useState(false)
const [rowId, setRowId] = useState(0)
const [edit, setEdit] = useState(false)
const [del, setDel] = useState(false)
const {handleSubmit, register, formState: {errors}} = useForm()

const handleEditUser = handleSubmit((data)=> {
    editDataUser(data)
})


const handleCreateUser = handleSubmit((data) => {
    postDataUsers(data)
})

useEffect(()=> {
    const effectGetUsers = async () => await getDataUsers()
    console.log("EFFECT USERS WHEN PAYLOAD CHANGE")
    effectGetUsers()
},[payloadToken])

    return (<section>


        {del && payloadToken.superuser | (payloadToken.staff  && payloadToken.conditions.delete) && <div className="modal-delete">
            <h4>Do you want delete this row?</h4>
            <button onClick={() => setDel(!del) & deleteDataUser(rowId)} type="button" className="btn-delete-modal">Accept</button>
            <button onClick={() => setDel(!del)} type="button"className="btn-cancel-modal">Cancel</button>
        </div>}


        <h1>TABLE USERS</h1>


        {edit && payloadToken.superuser && <div className="modal-editingi">
            <button onClick={() => setEdit(!edit)} type="button" className="btn-x-editingi">X</button>
            <h3>EDITING USER</h3>
            
            <form onSubmit={(e) => handleEditUser(e)} className="form-modal-editingi">
                {dataConsultedUserForId && dataConsultedUserForId.map((data) => {
                return <>
                        <label htmlFor="username" className="label-modal-editingi">data</label> 
                        <input type="text" name="username" placeholder={data.username} {...register("username", {required: true})}/>
                        <label htmlFor="password" className="label-modal-editingi">password</label> 
                        <input type="password" name="password" placeholder={data.password} {...register("password", {required: true})}/>
                        <label htmlFor="email" className="label-modal-editingi">e-mail</label> 
                        <input type="email" name="email" placeholder={data.email} {...register("email", {required: true})} />
                        <input type="number" name="number" defaultValue={data.id} {...register("number")}/>
                    </>
            })}
                <div className="div-check-box-editingi-modal">
                    <label htmlFor="is_staff" className="label-modal-editingi">staff</label>
                    <input type="checkbox" name="is_staff" {...register("is_staff")} />
                    <label htmlFor="is_superuser" className="label-modal-editingi">superuser</label>
                    <input type="checkbox" name="is_superuser" {...register("is_superuser")} />
                    <label htmlFor="is_active" className="label-modal-editingi">active</label>
                    <input type="checkbox" name="is_active" {...register("is_active")} />
                </div>
                <button className="btn-modal-editingi" type="submit">edit user</button>
                {errorData && <p>{errorData}</p>}
            </form>
        </div>}

        {modal && payloadToken.superuser && <div className="modal-create">
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
        </div>}

        <div className="div-CV">
            <button onClick={() => getDataUsers()} type="button" className="btn-get">RELOAD TABLE</button>
            {payloadToken.superuser && <button  onClick={() => setModal(!modal)} type="button" className="btn-create">CREATE USER</button>}
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
                    {payloadToken.superuser && <th>Editing</th>}
                </tr>
            </thead>
            <tbody>

                {dataConsultedUsers.length ? dataConsultedUsers.map((data, index)=> {
                    return  <tr key={index}>
                                    <td>{data.username}</td>
                                    <td>{data.email}</td>
                                    {payloadToken.superuser && <td>{data.password}</td>}
                                    <td>{data.is_superuser ? "True" : "False"}</td>
                                    <td>{data.is_staff ? "True" : "False"}</td>
                                    <td>{data.is_active ? "True" : "False"}</td>
                                    <td>{data.date_joined}</td>
                                    {payloadToken.superuser && <td className="td-none">
                                            <button onClick={(e) => setDel(!del) & setRowId(e.target.id)} id={data.id} className={"btn-del"}>DEL</button>
                                            <button onClick={(e) => getIdUser(e.target.id) & setEdit(!edit)} id={data.id} className="btn-edit">EDIT</button>
                                    </td>}
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