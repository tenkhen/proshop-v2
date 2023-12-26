import { useGetUsersQuery } from '../slices/usersApiSlice';
import Loader from '../ui/Loader';

const UserListPage = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <Loader />;

  console.log(users);

  return <div>UserListPage</div>;
};

export default UserListPage;
