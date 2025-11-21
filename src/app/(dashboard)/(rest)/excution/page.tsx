import {requireAuth} from "@/lib/auth-utils";


const Page = async ()=>{
    await requireAuth();
    return <p>EXCUTION</p>
};


export default Page;

