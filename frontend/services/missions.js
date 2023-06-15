import axios from '@/lib/axios'

export const missionService = () => {
    const add = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/planner-missions', props)
            .then(response => setStatus(response.data.status))
            .catch(error => {
                switch (error.response.status) {
                    case 403:
                        window.location.href = '/403'
                        break
                    case 422:
                        setErrors(error.response.data.errors)
                        break
                    default:
                        throw error
                }
            })
    }

    return {
        add
    }
}