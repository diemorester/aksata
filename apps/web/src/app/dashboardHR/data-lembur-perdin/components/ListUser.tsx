'use client';

import useGetAllUser from '@/hooks/adminHR/useGetAllUser';
import React from 'react';
import CardUser from './CardUser';

const ListUser = () => {
  const { data: dataUsers } = useGetAllUser();

  return (
    <div className="grid md:grid-cols-3 gap-5 md:p-32">
      {dataUsers?.response.map((user) => {
        return <CardUser key={user.id} id={user.id} name={user.name} avatar={user.avatar!} phone={user.phone} />;
      })}
    </div>
  );
};

export default ListUser;
