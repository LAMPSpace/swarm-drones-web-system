import useSWR from 'swr'
import axios from '@/lib/axios'
import { encode } from 'base-64'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR('/api/me', () =>
        axios
            .get('/api/me')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const login = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/login', props)
            .then(response => {
                let token = response.data.token
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                mutate()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        setErrors([])
        setStatus(null)

        axios
            .post('/api/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/api/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (! error) {
            await axios.post('/api/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        } else if (
            window.location.pathname === '/api/verify-email' &&
            user?.email_verified_at
        ) {
            router.push(redirectIfAuthenticated)
        } else if (middleware === 'auth' && error) {
            logout()
        } else if (!user && !error) {
            mutate()
        }
    }, [user, error])


    return {
        user,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}