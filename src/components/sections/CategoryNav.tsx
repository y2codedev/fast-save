import { NAVITEMS } from "@/constants/socialLinks";
import Link from "next/link";

export default function CategoryNav() {
    return (
        <nav className="w-full">
            <div className="overflow-x-auto">
                <ul className="text-sm sm:px-6 px-0 flex items-center gap-3 whitespace-nowrap w-max m-auto font-medium">
                    {NAVITEMS?.map((item) => (
                        <li key={item?.id} className="flex-shrink-0">
                            <Link href={item?.href}>
                                <div className="flex flex-col items-center justify-center text-center rounded-md p-2 transition-colors duration-200 text-indigo-600 hover:text-indigo-700">
                                    <span className="bg-gray-200 rounded-full  h-10 w-10 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 stroke-2" />
                                    </span>
                                    <span className=" text-gray-200 mt-2">
                                        {item?.ariaLabel}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
