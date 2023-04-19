// helper function to handle input change
export const handleInputChange = (event, data, setData) => {
    setData({
        ...data,
        [event.target.name]: event.target.value,
        });
};