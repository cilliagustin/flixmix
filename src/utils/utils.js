import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";


/**
 * used in the Ininite scroll. gets more data from the api and updates the resource
 */
export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next);
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

/**
 * Helper function to handle input change. Updates the target data but nor the rest of the state
 */
export const handleInputChange = (event, data, setData) => {
    setData({
        ...data,
        [event.target.name]: event.target.value,
    });
};

/**
 * Sets the token timestamp in the local storage based on the provided data.
 */
export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

/**
* Checks if the token should be refreshed based on the presence of the token timestamp in the local storage.
*/
export const shouldRefreshToken = () => {
    return !!localStorage.getItem('refreshTokenTimestamp')
}

/**
 * Removes the token timestamp from the local storage.
 */
export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp')
}