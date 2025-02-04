// "use client"

// import useGetAllUser from "@/hooks/adminHR/useGetAllUser"
// import Link from "next/link";

// const Dummy = () => {
//     const { data } = useGetAllUser();
//     console.log(data);

//     return (
//         <div>
//             {data?.response.map((user) => {
//                 return (
//                     <Link
//                         href={`/dashboardHR/dummy/${user.id}`}
//                         key={user.id}
//                     >
//                         {user.name}
//                     </Link>
//                 )
//             })}
//         </div>
//     )
// }

// export default Dummy