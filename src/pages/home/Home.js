export default function Home() {

    const auth = UseAuth()
    const [Perfil, setPerfil] = useState([])
    const navigate = useNavigate()


    const getPerfil = () => {
        api
            .get(`restaurants`, auth)
            .then((res) => {
                setPerfil(res.data)
            })
            .catch((err) => { console.log(err.response) })
    }

    useEffect(() => {
        getPerfil()
    }, [])



    return (
        <MainContainerHome>

            {
                filtrarRestaurantes.length > 0 ?

                    filtrarRestaurantes.map((item) => {
                        return (
                            <DivCards>
                                <CardRestaurante
                                    restaurante={item}
                                />
                            </DivCards>
                        )
                    })
                    : <p>Carregando...</p>
            }
        </MainContainerHome >
    )
}