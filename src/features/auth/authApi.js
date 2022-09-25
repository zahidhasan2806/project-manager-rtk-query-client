import apiSlice from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    //endpoints
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => {
                return {
                    url: '/login',
                    method: 'POST',
                    body: data,
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result.data.user) {
                        dispatch(
                            userLoggedIn({
                                accessToken: result.data.accessToken,
                                user: result.data.user,
                            })
                        );
                    }

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
});

export const { useLoginMutation } = authApi