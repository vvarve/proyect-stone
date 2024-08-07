import { useAndCompileContext } from "./context/CompileContext"
import "./css/Navigator.css"


export const Navigator = () => {
const { payloadToken, signOut} = useAndCompileContext()
    return (
        <header className="navi-header">
            <nav className="navi-nav">

                
                <ul>
                    <a href="/" className="a-logo"></a>
                    <a href="/" className="a-home"><li>Home</li></a>


                    {payloadToken && 
                    <>
                        <a href="/agent" className="a-home"><li>Agents</li></a>
                        <a href="/module" className="a-home"><li>Modules</li></a>
                        <a href="/user" className="a-home"><li>Users</li></a>
                    </>
                    }

                    
                </ul>


                <ol>
                    <li>_____</li>
                    {(!payloadToken | !localStorage.getItem("access") | !localStorage.getItem("refresh")) && <a href="/signin"><li>Sign in</li></a>}
                    {(payloadToken && localStorage.getItem("access") && localStorage.getItem("refresh")) && <a onClick={()=> signOut()}><li>Sign out</li></a>}
                </ol>
            </nav>
        </header>
    )

}