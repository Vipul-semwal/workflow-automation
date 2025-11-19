interface PageProps {
    params: Promise<{
        excutionId:string
    }>
};



const Page = async ({params}:PageProps)=>{
    const {excutionId} = await params; 
    return <p>excution Id:{excutionId}</p>
}

export default Page;


