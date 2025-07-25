import React from 'react'
import ProfileSidebar from './ProfileSidebar'
import ProfileContent from './ProfileContent'

const ProfileContainer = () => {
  return (
    <section className='flex min-h-[calc(100vh-70px)] m-auto overflow-y-auto'>
        <ProfileSidebar />
        <ProfileContent />
    </section>
  )
}

export default ProfileContainer