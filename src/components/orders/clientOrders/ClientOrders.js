import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchOrders} from "../orderSlice";
import {fetchCartInOrders} from "../../clientCart/cartSlice";
import Spinner from "../../spinner/Spinner";
import {Link} from "react-router-dom";
import ArrowVertical from "../../icons/ArrowVertical";


const ClientOrders = () => {
    const activeClient = useSelector(state => state.authUser.client);
    const ordersLoadingStatus = useSelector(state => state.getOrders.ordersLoadingStatus);
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState([])
    const [openTab, setOpenTab] = useState('');

    const dispatch = useDispatch();

    useEffect(()=>{
        if(activeClient){
            updateOrders();
        }
    }, [activeClient])

    const updateOrders = () =>{
        dispatch(fetchOrders()).then(data => {
            setOrders(data.payload)
        })
        dispatch(fetchCartInOrders()).then(data => {
            setCart(data.payload)
        })
    }
    const renderStatus = (id) => {
        let typeStatus;
        switch(id){
            case 'active':
                typeStatus = 'text-red-700 bg-red-100';
                break;
            case 'completed':
                typeStatus = 'text-green-700 bg-green-100';
                break;
            case 'canceled':
                typeStatus = 'text-gray-700 bg-green-gray';
                break;
            default:
                typeStatus = 'text-blue-700 bg-blue-100';
                break;
        }
        return typeStatus;
    }

    function byField(field, detail) {
        if(detail === 'ascending'){
            return (a, b) => a['order'][field] > b['order'][field] ? 1 : -1;
        }else{
            return (a, b) => a['order'][field] < b['order'][field] ? 1 : -1;
        }
    }

    let sorted_orders;

    if(openTab === 'date_ascending'){
        sorted_orders = orders.sort(byField('order_date', 'ascending'))
    }
    else if(openTab === 'date_descending'){
        sorted_orders = orders.sort(byField('order_date', 'descending'))
    }
    else if(openTab === 'price_ascending'){
        sorted_orders = orders.sort(byField('order_sum', 'ascending'))
    }
    else if(openTab === 'price_descending'){
        sorted_orders = orders.sort(byField('order_sum', 'descending'))
    }
    else{
        sorted_orders = orders.sort(byField('status', 'ascending'))
    }

    return(
        <div className="w-full px-28 py-10">
            <h1 className="text-3xl font-bold">Заказы</h1>
            <div className="flex w-1/3 items-center justify-between mt-6">
                <p>Сортировать по:</p>
                <div className="flex items-center">
                    <a className={` ${openTab === 'date_ascending' || openTab === 'date_descending' ? "text-mainOrange-600" : ""} cursor-pointer mr-1`}
                       href=""
                       onClick={(e) => {
                           e.preventDefault();
                           openTab !== 'date_ascending' ? setOpenTab('date_ascending') : setOpenTab('date_descending')
                       }}>
                        Дате
                    </a>
                    <ArrowVertical color={openTab === 'date_ascending' || openTab === 'date_descending' ? "#FFA82E" : "#000"}
                                   rotate={openTab === 'date_ascending' ? 180 : 0}
                    />
                </div>
                <div className="flex items-center">
                    <a className={` ${openTab === 'price_ascending' || openTab === 'price_descending' ? "text-mainOrange-600" : ""} cursor-pointer mr-1`}
                       href=""
                       onClick={(e) => {
                           e.preventDefault();
                           openTab !== 'price_ascending' ? setOpenTab('price_ascending') : setOpenTab('price_descending')
                       }}>
                        Цене
                    </a>
                    <ArrowVertical color={openTab === 'price_ascending' || openTab === 'price_descending' ? "#FFA82E" : "#000"}
                                   rotate={openTab === 'price_ascending' ? 180 : 0}
                    />
                </div>
                <a className="cursor-pointer text-mainGray text-sm"
                   href=""
                   onClick={(e) => {
                       e.preventDefault();
                       setOpenTab('')
                   }}>
                    Сбросить
                </a>
            </div>
            {ordersLoadingStatus === 'loading' ? <Spinner/> : null}
            {sorted_orders.map((item) => {
                return(
                    <div className="flex flex-col bg-lightGray pt-6 w-full rounded-xl mt-6 shadow-md" key={item.order.order_id}>
                        <div className="flex justify-between pr-10">
                            <p className="text-lg font-semibold ml-10">Заказ №{item.order.order_id}  от {item.order_date}</p>
                            <div className="flex items-center">
                                <p className="text-base">Оплачено</p>
                                <p className="text-xl font-semibold ml-2">{item.order.order_sum} Р</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-between bg-mainWhite px-10 py-5 mt-5 rounded-xl">
                            <div className="flex flex-col">
                                <div className="flex flex-row w-full rounded-xl">
                                    <p className="mr-5 font-semibold">Доставка курьером</p>
                                    <div className={`${renderStatus(item.status.status_id)} text-xs flex justify-center h-fit rounded-lg py-1.5 px-3 shadow-sm`}>
                                        {item.status.status_name}
                                    </div>
                                </div>
                                {item.status.status_id === 6 ?
                                    <div>
                                        <p className="flex text-mainGray mt-5">Дата доставки: {item.delivery_date}</p>
                                        <div className="flex mt-10 text-sm">
                                            <Link to="/reviews/" className="bg-mainOrange-600 rounded-xl px-3 py-1.5 mr-5">Оценить заказ</Link>
                                        </div>
                                    </div>
                                    : <p className="flex text-mainGray mt-5">Ожидаемая дата: {item.delivery_date} {item.user_delivery_time}</p>
                                }
                            </div>
                            <div className="flex pr-10 items-end">
                            {cart.map(({order, product, weight}) => {
                                if(item.order.order_id === order){
                                    let image;
                                    weight === 250 ? image = product.image_min : image = product.image_max;
                                    return (
                                        <div className="flex flex-col text-sm justify-center items-center">
                                            <img src={image} alt="картинка товара" width="100" className="h-fit mb-2"/>
                                            {item.status.status_id === 6 ?
                                                <Link to={`/products/${product.product_id}/`} className="text-mainOrange-600 rounded-xl px-3 py-1.5">Оценить товар</Link>
                                             : null }
                                        </div>
                                    )
                                }
                            })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default ClientOrders;