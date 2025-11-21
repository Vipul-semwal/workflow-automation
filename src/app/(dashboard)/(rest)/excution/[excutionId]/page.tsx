import {requireAuth} from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        excutionId:string
    }>
};



const Page = async ({params}:PageProps)=>{
    await requireAuth();
    const {excutionId} = await params; 
    return <p>excution Id:{excutionId}</p>
}

export default Page;


