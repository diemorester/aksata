import { AiOutlineEdit } from "react-icons/ai";

const UserSettings = () => {

    return (
        <div className="w-full h-full flex flex-col justify-evenly px-8 text-white rounded-lg shadow-md">
            <div className="flex justify-between">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-400">
                        NAME
                    </label>
                    <p className="px-1 rounded-lg">burhan hanafi</p>
                </div>
                <button className="flex items-center space-x-2 rounded-3xl px-6 py-3 bg-neutral-700 hover:bg-neutral-600 active:scale-95">
                    <AiOutlineEdit />
                    <p
                        className="text-neutral-100 text-sm">
                        EDIT
                    </p>
                </button>
            </div>
            <div className="flex justify-between">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                        EMAIL
                    </label>
                    <p className="px-1 rounded-lg">youremailexample@kokop.com</p>
                </div>
                <button className="flex items-center space-x-2 rounded-3xl px-6 py-3 bg-neutral-700 hover:bg-neutral-600 active:scale-95">
                    <AiOutlineEdit />
                    <p
                        className="text-neutral-100 text-sm ">
                        EDIT
                    </p>
                </button>
            </div>
            <div className="flex justify-between">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                        PHONE
                    </label>
                    <p className="px-1 rounded-lg">+6281*****678</p>
                </div>
                <div className="flex items-center space-x-6">
                    <button className="bg-transparent relative group text-white active:scale-95">
                        remove
                        <span className="absolute bottom-1 left-1/2 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    </button>
                    <button className="flex items-center space-x-2 rounded-3xl px-6 py-3 bg-neutral-700 hover:bg-neutral-600 active:scale-95">
                        <AiOutlineEdit />
                        <p
                            className="text-neutral-100 text-sm ">
                            EDIT
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;