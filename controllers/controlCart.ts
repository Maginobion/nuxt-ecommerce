export const remove = async (productId:string) => {
    const { status } = await $fetch('/api/cart/delete-product',{
        method:'POST',
        body: { id: productId }
    })
    status && useRouter().go()
}

const actualizarCarro = async () =>{

    const data = await $fetch('/api/cart/get-products',{
        method: 'post'
    })

    return { data }
}

export const {data: cartItems} = await actualizarCarro()