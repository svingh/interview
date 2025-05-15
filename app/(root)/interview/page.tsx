import Agent from '@/components/Agent'
import { getCurrentuser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {
  const user = await getCurrentuser();

  return (
    <>
        <h3>Interview Generation</h3>
        <Agent userName={user?.name} userID={user?.id} type="generate" />
    </>
  )
}

export default page