import { useAndCompileContext } from "./context/CompileContext"

export const Agent = () => {
const {getDataAgents, dataConsulted} = useAndCompileContext()



    return(
        <section>
            <h1>TABLE AGENTS</h1>

            <div className="div-CV">
                <button onClick={() => getDataAgents()} type="button" className="btn-get">RELOAD TABLE</button>
                <button   type="button" className="btn-create">CREATE AGENT</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Agent</th>
                        <th>Group</th>
                        <th>Last ip</th>
                        <th>Last connection</th>
                        <th>DNI</th>
                        <th>Address</th>
                        <th>Inactive</th>
                        <th>Secret Key</th>
                        <th>Editing</th>
                    </tr>
                </thead>
                <tbody>
                
                {dataConsulted ? dataConsulted.map((data, index)=> {
                    return  <tr key={index}>
                                <td>{data.agent}</td>
                                <td>{data.group}</td>
                                <td>{data.current_ip}</td>
                                <td>{data.last_connection}</td>
                                <td>{data.dni}</td>
                                <td>{data.address}</td>
                                <td>{data.inactive ? "True": "False"}</td>
                                <td>{data.secretKey}</td>
                                <td>
                                <button className="btn-del">DEL</button>
                                <button className="btn-edit">EDIT</button>
                                </td>
                            </tr>
                })
            
                :
                        <tr>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
                                <td>algo</td>
                                <td>
                                <button className="btn-del">DEL</button>
                                <button className="btn-edit">EDIT</button>
                                </td>
                        </tr>


                }

                </tbody>



            </table>

        </section>
    )
}