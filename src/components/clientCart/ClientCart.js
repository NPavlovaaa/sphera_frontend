import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart, fetchDeleteProductInCart, fetchUpdateCart } from "../../api/cartSlice";
import bobs250 from "../../assets/bobs250.png";


const ClientCart = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const dispatch = useDispatch();
    const [cart, setCart] = useState();

    useEffect(()=>{
        if(activeClient){
            updateCart();
        }
    }, [activeClient])

    const updateCart = () =>{
        dispatch(fetchCart(activeClient.client_id)).then(data => {
            setCart(data.payload)
        })
    }

    let totul_sum  = 0;
    let weight_sum  = 0;
    let count_products = 0;

    const itemCart = () => {
        const renderCart = cart ? cart.map(({product, roasting, processing, price, weight, cart_id, count, weight_selection}) => {
            const changeCount = (value) => {
                count += value
                if (count > 0){
                    setTimeout(() =>{
                        dispatch(fetchUpdateCart({
                            'client': activeClient.client_id,
                            'weight_selection': weight_selection,
                            'product_count': count,
                            'id': cart_id
                        })).then(updateCart)
                    }, 150)
                }else{
                    setTimeout(() =>{
                        dispatch(fetchDeleteProductInCart(cart_id)).then(updateCart)
                    }, 150)
                }

            }

            const deleteProduct = () => {
                dispatch(fetchDeleteProductInCart(cart_id)).then(updateCart)
            }
            totul_sum += price;
            weight_sum += weight * count;
            count_products += 1 * count;
            return (
                <div className="flex flex-row w-full justify-between bg-mainWhite mb-1.5 p-8 rounded-xl" key={cart_id}>
                    <div className="flex flex-row w-2/3 items-center justify-center">
                        <input type="checkbox" className="flex mr-3"/>
                        <div className="flex py-3 w-1/4">
                            <img src={bobs250} alt="картинка товар" width="120"/>
                        </div>
                        <div className="flex flex-col w-3/4 ml-5">
                            <p className="flex font-medium text-lg mt-1">
                                {product.product_name}
                            </p>
                            <div className="grid grid-cols-4 mt-1">
                                <p className="flex text-sm text-mainGray">
                                    {roasting}
                                </p>
                                <p className="flex text-sm text-mainGray">
                                    {processing}
                                </p>
                            </div>
                            <p className="flex text-sm text-mainGray mt-1">
                                {product.taste}
                            </p>
                            <div className="grid grid-cols-3 mt-1 text-sm">
                                <button type="submit" className="flex text-mainOrange-600 py-2 w-full">В избранное</button>
                                <button type="submit" onClick={deleteProduct} className="flex text-red py-2 w-full">Удалить</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-1/5 justify-end">
                        <button type="submit" onClick={() => changeCount(-1)} className="flex text-xl mr-2 bg-lightGray px-2.5 py-1 rounded-lg h-fit">-</button>
                        <p className="flex text-lg mr-2 py-1">{count}</p>
                        <button type="submit" onClick={() => changeCount(1)} className="flex text-xl bg-lightGray px-2 py-1 rounded-lg h-fit">+</button>
                    </div>
                    <div className="flex w-1/5 pr-3 justify-end">
                        <div className="flex flex-col items-center">
                            <p className="flex text-xl">{price} р</p>
                            <p className="flex text-sm text-mainGray mt-0.5">{weight} г</p>
                        </div>
                    </div>
                </div>
            )
        }) : null
        return renderCart
    }

    return (
        <div className="w-full p-20">
            <div className="grid grid-cols-3 gap-16 col-span-2 bg-lightGray p-10 w-full rounded-xl">
                <div className="flex flex-col col-span-2">
                {itemCart()}
                </div>
                <div className="flex flex-col items-center">
                    <button type="submit" className="flex bg-mainOrange-600 hover:bg-mainOrange-700 rounded-2xl px-5 py-3 w-full text-lg font-semibold justify-center">
                        Перейти к оформлению
                    </button>
                    <p className="text-mainGray text-sm mt-3">Доступные способы и время доставки можно выбрать при оформлении заказа</p>
                    <div className="flex flex-row justify-between bg-mainWhite w-full mb-1.5 p-6 rounded-xl mt-3">
                        <p className="text-lg">Ваша корзина</p>
                        <div className="flex">
                            <p className="text-base text-mainGray mr-2">{count_products} шт /</p>
                            <p className="text-base text-mainGray">{weight_sum / 1000} кг</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between bg-mainWhite w-full mb-1.5 p-6 rounded-xl">
                        <p className="flex text-xl">Общая стоимость</p>
                        <p className="flex justify-end items-end text-xl font-semibold">{totul_sum} р</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ClientCart;
