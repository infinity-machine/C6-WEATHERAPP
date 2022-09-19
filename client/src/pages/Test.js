import React, { useState, useEffect } from 'react'
import { useStore } from '../store';

const Test = () => {
    const { state: { user }, setState } = useStore();

    // setState(function setState(old) {
    //     useState('ok')
    // })
    // useState('ok')
    // setUser()
    // useEffect(() => {
    //     setState('ok')
    //   }, [])

    // setState((...old_user) => {
    //     console.log(old_user)
    // })
    // user.setState('ok')

    // setState((old_state) => {
    //     return {
    //       ...old_state, user: {
    //         email: 'ok'
    //       }
    //     }
    //   })
   
    

  return (
    <div>
        <h1>{user.email}</h1>
    </div>
  )
}

export default Test