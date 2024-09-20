import React from 'react'
import { auth } from '../auth'

const page = async () => {
    const user = await auth()
    console.log("user is -> ", user)
    return (
        <div>page</div>
    )
}

export default page