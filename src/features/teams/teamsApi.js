import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
    //endpoints
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => {
                return {
                    url: `/teams?members_like=${email}`,
                };
            },
        }),
        addTeam: builder.mutation({
            query: (data) => ({
                url: '/teams',
                method: 'POST',
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    let { data: team } = await queryFulfilled;
                    let { email } = team.author;
                    dispatch(
                        teamsApi.util.updateQueryData('getTeams', email, (draft) => {
                            draft.push(team);
                        })
                    );
                } catch (error) { }
            },
        }),


    })
});

export default teamsApi;
export const { useAddTeamMutation, useGetTeamsQuery } = teamsApi 