import SplitButton from "@/components/buttons/splitbutton"

const VerifiedPage = ({params}: {params: {token: string}}) => {

  return (
    <div className='min-h-screen text-center place-content-center bg-neutral-900 text-white'>
      <div className="flex flex-col justify-center items-center">
        <h2 className="pb-5">Click the button to verify</h2>
        <SplitButton token={params.token}/>
      </div>
    </div>
  )
}

export default VerifiedPage