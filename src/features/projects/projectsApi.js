import apiSlice from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
    //endpoints
    endpoints: (builder) => ({
        fetchProjects: builder.query({
            query: (params) => {
                let { assignedProjectsQuery, author, sort = 'id', order = 'desc' } = params || {};
                let queryString = '';
                if (assignedProjectsQuery) queryString += assignedProjectsQuery;
                if (author) params += `&author=${author}`;
                if (sort) queryString += `&_sort=${sort}`;
                if (order) queryString += `&_order=${order}`;

                return {
                    url: `/projects?${queryString}`,
                };
            },
        }),

        addNewProject: builder.mutation({
            query: (data) => ({
                url: '/projects',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Project'],
            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                let { assignedProjectsQuery } = getState().projects;
                try {
                    const { data: newProject } = await queryFulfilled;
                    if (newProject?.id) {
                        dispatch(
                            projectsApi.util.updateQueryData('fetchProjects', { assignedProjectsQuery }, (draft) => {
                                draft.unshift(newProject);
                            })
                        );
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        updateProject: builder.mutation({
            query: ({ id, stage }) => {
                let data = {};
                if (stage) data = { ...data, stage };
                return {
                    url: `/projects/${id}`,
                    method: 'PATCH',
                    body: data,
                };
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                let { assignedProjectsQuery } = getState().projects;

                const patch = dispatch(
                    projectsApi.util.updateQueryData(
                        'fetchProjects',
                        {
                            assignedProjectsQuery,
                        },
                        (draft) => {
                            return (draft = draft.map((project) =>
                                project.id === arg.id ? { ...project, stage: arg.stage } : project
                            ));
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patch.undo();
                }
            },
        }),
        //delete project
        deleteProject: builder.mutation({
            query: ({ id }) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Project'],
            async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
                let { assignedProjectsQuery } = getState().projects || {};
                try {
                    await queryFulfilled;
                    dispatch(
                        projectsApi.util.updateQueryData('fetchProjects', { assignedProjectsQuery }, (draft) => {
                            return (draft = draft.filter((project) => project.id !== arg.id));
                        })
                    );
                } catch (error) { }
            },
        }),
    })
});

export const { useFetchProjectsQuery, useAddNewProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } = projectsApi