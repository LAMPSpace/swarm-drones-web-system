import axios from '@/lib/axios'

export const userService = () => {
    const add = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/users', props)
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    return {
        add
    }
}