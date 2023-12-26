import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../ui/Message';
import Loader from '../ui/Loader';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../slices/usersApiSlice';
import toast from 'react-hot-toast';

const UserListPage = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  if (isLoading || loadingDelete) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  const deleteHandler = async userId => {
    if (window.confirm('Are you sure to delete user?')) {
      try {
        const [user] = users.filter(user => user._id === userId);

        if (user.isAdmin) return toast.error('Cannot delete admin user');

        await deleteUser(userId);
        refetch();
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimes color="red" />
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/update`}>
                  <Button variant="light" className="btn-sm">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  className="btn-sm btn-danger"
                  onClick={() => deleteHandler(user._id)}
                  style={{ marginLeft: '10px' }}>
                  <FaTrash color="white" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListPage;
