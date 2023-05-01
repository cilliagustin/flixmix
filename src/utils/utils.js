import { axiosReq } from "../api/axiosDefaults";

export const fecthMoreData = async(resource, setResource)=>{
    try {
        const {data} = await axiosReq.get(resource.next);
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, curr) => {
                return acc.some(accResult => accResult.id === curr.id)
                ? acc 
                : [...acc, curr]
            }, prevResource.results)
        }))
    } catch (err) {
        console.log(err)
    }
}

// helper function to handle input change
export const handleInputChange = (event, data, setData) => {
    setData({
        ...data,
        [event.target.name]: event.target.value,
        });
};