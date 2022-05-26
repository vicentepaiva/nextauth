import { useContext, useEffect } from "react"


import { AuthContext } from "../context/AuthContext"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupAPIClient } from "../services/api";
import { useCan } from "../hooks/useCan";
import { Can } from "../components/Can";



export default function Dashboard() {
    const { user, signOut } = useContext(AuthContext)

    const userCanSeeMetrics = useCan({
        roles: ['admninistrator', 'editor']
    })

    useEffect(() => {
        api.get('/me')
        .then(response => console.log(response))
    }, [])

    return (
        <>
            <h1>Dashboard: {user?.email}</h1>

            <button onClick={signOut}>Sign Out</button>

            <Can permissions={['metrics.list']}>
                <div>Métricas</div>
            </Can>
        </>
        
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me')
    


    return {
        props: {}
    }
})


