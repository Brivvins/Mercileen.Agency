import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
interface props{
    property:Properties;
    message: string;
    directory:string;
}

export default function PCard({property, message, directory}:props, ) {
    return (
        <div className="bg-slate-300 h-auto overflow-hidden shadow-sm rounded-lg text-black m-5 transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:shadow-primary">
            <div className=" w-full mb-3">
                <Image src={property.image} alt="image"  height={70} width={650} objectFit="cover" />
            </div>
            <div className="m-2  text-primary font-bold ">
                <p className="text-lg text-amber-500 font-bold ">KSH {property.price}</p> 
                 {property.title}
            </div>
            <div className="m-2">
                <p className="line-clamp-1 overflow-hidden">{property.description}</p>
            </div>
            <div className="m-2.5 flex justify-between ">
                <Link href={directory}><Button variant={"default"} className="font-semibold">{message}</Button></Link>
                <Button variant={"ghost"} className=" hover:bg-slate- text-sm">{property.location}</Button>
            </div>
        </div>
    );
}

