import axios from '@/lib/axios'

export const swarmService = () => {
    const add = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/swarms', props)
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

    const find = async ({ setError, setSwarm, setStatus, id }) => {
        setError(null)
        setSwarm(null)
        setStatus(null)

        axios
            .get(`/api/swarms/${id}`)
            .then((response) => {
                if (response.data.status) {
                    setSwarm(response.data.data)
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

    const get = async ({ setError, setSwarm, setStatus, isPaginate = false })  => {
        setError(null)
        setSwarm(null)
        setStatus(null)

        axios
            .get(`/api/swarms?is_paginate=${isPaginate ? 1 : 0}`)
            .then((response) => {
                if (response.data.status) {
                    setSwarm(response.data.data)
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

    const update = async ({ setErrors,setSwarm, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .put(`/api/swarms/${props.id}`, props)
            .then(response => {
                setSwarm(response.data.data)
                setStatus(response.data.status)
            })
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
        add,
        find,
        get,
        update
    }
}