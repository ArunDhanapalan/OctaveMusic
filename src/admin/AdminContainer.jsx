import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminContent from './AdminContent'

const AdminContainer = () => {
  return (
    <section className='flex w-full min-h-[calc(100vh-70px)] m-auto overflow-y-auto'>
        <AdminSidebar />
        <AdminContent />
    </section>
  )
}

export default AdminContainer