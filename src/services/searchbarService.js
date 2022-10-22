import apiClient from "./apiClient";

const SearchBarService = {
    search: async (username) => {
        try {
            console.log("SearchBarService -> " + username)
            // const response = await apiClient.get(`api/user/profile/search/${username}`)
            // return response
        } catch (error) {
            console.log(error)
        }
    
    }
}

export default SearchBarService