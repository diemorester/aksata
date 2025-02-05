import ListPengajuanByUser from './components/ListPengajuanByUser';

const LemburPerdinDetail = ({ params }: { params: { userId: string } }) => {
  return <ListPengajuanByUser userId={params.userId}/>;
};

export default LemburPerdinDetail;
