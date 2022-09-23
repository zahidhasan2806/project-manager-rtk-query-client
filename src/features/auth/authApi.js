import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    //endpoints
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = queryFulfilled;
                    if (data?.user?.id) {
                        dispatch(userLoggedIn({
                            user: data?.user,
                            accessToken: data?.accessToken,
                        }))
                    }
                    localStorage.setItem('auth', JSON.stringify(data))
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
});

export const { useLoginMutation } = authApi