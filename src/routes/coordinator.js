export const voltar = (navigate) => {
    navigate(-1)
}

export const goToHome = (navigate) => {
    navigate(`/home`)
}

export const goToBusca = (navigate) => {
    navigate('/busca')
}

export const goToCadastro = (navigate) => {
    navigate('/cadastro')
}

export const goToCarrinho = (navigate) => {
    navigate('/carrinho')
}

export const goToEndereco = (navigate) => {
    navigate('/endereco')
}

export const goToLogin = (navigate) => {
    navigate('/login')
}

export const goToPedido = (navigate) => {
    navigate('/pedido')
}

export const goToPerfil = (navigate) => {
    navigate('/perfil')
}

export const goToRestaurante = (navigate, idRestaurante) => {
    navigate(`/restaurante/${idRestaurante}`)
}