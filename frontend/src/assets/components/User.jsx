
import { useAndCompileContext } from "./context/CompileContext"

export const User = () => {
const {getDataUsers, dataConsulted, decodedToken} = useAndCompileContext()


    return (<section>
        <h1>TABLE USERS</h1>

        <div className="div-CV">
            <button onClick={() => getDataUsers()} type="button" className="btn-get">RELOAD TABLE</button>
            <button   type="button" className="btn-create">CREATE USER</button>
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

                {dataConsulted.length ? dataConsulted.map((data, index)=> {
                    return  <tr key={index}>
                                    <td>{data.username}</td>
                                    <td>{data.email}</td>
                                    <td>{data.password}</td>
                                    <td>{data.is_superuser ? "True" : "False"}</td>
                                    <td>{data.is_staff ? "True" : "False"}</td>
                                    <td>{data.is_active ? "True" : "False"}</td>
                                    <td>{data.date_joined}</td>
                                    <td>
                                    <button className="btn-del">DEL</button>
                                    <button className="btn-edit">EDIT</button>
                                    </td>
                            </tr>})
                :
                <tr>
                        <td>none</td>
                        <td>none</td>
                        <td>none</td>
                        <td>none</td>
                        <td>none</td>
                        <td>none</td>
                        <td>none</td>
                        <td>
                        <button className="btn-del">DEL</button>
                        <button className="btn-edit">EDIT</button>
                        </td>
                </tr>}
            </tbody>
        </table> 
        {/* <table>
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
                <tr>
                    <td>none</td>
                    <td>none</td>
                    <td>none</td>
                    <td>none</td>
                    <td>none</td>
                    <td>none</td>
                    <td>none</td>
                    <td>
                    <button className="btn-del">DEL</button>
                    <button className="btn-edit">EDIT</button>
                    </td>
                </tr>      
            </tbody>
        </table> */}
        

    </section>)
}