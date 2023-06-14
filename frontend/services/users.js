import axios from '@/lib/axios'

export const userService = () => {
    const add = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/users', props)
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

    const find = async ({ setError, setUser, setStatus, id }) => {
        setError(null)
        setUser(null)
        setStatus(null)

        axios
            .get(`/api/users/${id}`)
            .then((response) => {
                if (response.data.status) {
                    setUser(response.data.data)
                } else {
                    setError(response.data.message)
                }

                setStatus(response.data.status)
            })
            .catch(error => {
                if (error.response.status !== 404) throw error
                setStatus(error.response.data.status)
                setError(error.response.data.message)
            })
    }

    const update = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .put(`/api/users/${props.id}`, props)
            .then(response => setStatus(response.data.status))
            .catch(error => {
                switch (error.response.status) {
                    case 422:
                        setErrors(error.response.data.errors)
                        break
                    default:
                        throw error
                }
            })
    }

    return {
        add,
        find
    }
}