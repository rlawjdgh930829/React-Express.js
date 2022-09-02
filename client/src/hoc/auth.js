import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../_actions/user_action';
import { useNavigate } from "react-router-dom"

export default function _auth(SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck() {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                if (!response.payload.isAuth) {
                    if (option) {
                        navigate('/login')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    } else {
                        if (option === false) {
                            navigate('/')
                        }
                    }
                }
            })
        }, [dispatch, navigate])

        return (
            <SpecificComponent />
        )
    }

    return <AuthenticationCheck />
}