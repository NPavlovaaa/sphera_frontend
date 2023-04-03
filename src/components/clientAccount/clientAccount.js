import AvatarDetail from "../icons/AvatarDetail";
import Pen from "../icons/Pen"
import Phone from "../icons/Phone"
import Calendar from "../icons/Calendar"
import Mail from "../icons/Mail"


const ClientAccount = ({activeClient, activeUser, logout}) => {

    return(
        <div className="flex flex-col px-20 py-10">
            <h1 className="text-3xl font-bold">Личный кабинет</h1>
            <div className="flex flex-row bg-lightGray shadow-md rounded-xl px-16 py-10 w-full h-fit">
                <div className="flex flex-col w-1/2">
                    <div className="flex flex-row items-center mb-5">
                        <AvatarDetail/>
                        <p className="text-xl ml-2">{activeClient.first_name} {activeClient.last_name}</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <Phone/>
                        <p className="ml-3">{activeClient.phone}</p>
                    </div>
                    <div className="flex flex-row items-center mt-3">
                        <Mail/>
                        <p className="ml-3">{activeUser.username}</p>
                    </div>
                    <div className="flex flex-row items-center mt-3">
                        <Calendar/>
                        <p className="ml-3">{activeClient.birthday}</p>
                    </div>
                    <div className="flex mt-3">
                        <button type="submit" className="text-mainGray hover:text-mainOrange-600" onClick={logout}>Выйти</button>
                    </div>
                </div>
                <div className="flex items-start w-1/2 justify-end">
                    <button type="submit" className="flex flex-row items-center bg-mainOrange-600 shadow-lg rounded-2xl px-5 py-1.5">
                        Редактировать
                        <div className="ml-2">
                            <Pen/>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ClientAccount