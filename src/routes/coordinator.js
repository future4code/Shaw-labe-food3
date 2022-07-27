export const voltar = (navigate) => {
    navigate(-1)
}

export const goToHome = (navigate) => {
    navigate(`/`)
}

export const goTohistory = (navigate) => {
    navigate('/busca')
}

// export const goToRestaurante = (navigate, idRestaurante) => {
//     navigate(`/restaurante/${idRestaurante}`)
// }