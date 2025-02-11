import ListPengajuanLemburPerdin from "./components/listDataLemburPerdin";

const LemburPerdinDetail = ({ params }: { params: { userId: string } }) => {
  return <ListPengajuanLemburPerdin userId={params.userId}/>
};

export default LemburPerdinDetail;
