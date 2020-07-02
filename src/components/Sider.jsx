import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, Spin, message } from 'antd';
import { selected, selectUser } from '../actions';
import axios from '../utils/axios';

const UserItem = ({ user }) => {
  const dispatch = useDispatch();
  const handleUserClick = () => {
    dispatch(selectUser(user));
    dispatch(selected(true));
  }

  return (
    <Button type="primary" onClick={handleUserClick}>{user.name}</Button>
  );
}

const Sider = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loaded, setIsLoaded] = useState(true);
  const [search, setSearch] = useState(false);

  const searchUser = (val) => {
    setUsers([]);
    setIsLoaded(false);
    setQuery(val);
    setSearch(true);
  }

  const fetchUsers = useCallback(() => {
    if (search) {
      axios.get('/search/users', {
        params: {
          client_id: process.env.REACT_APP_ACCESS_KEY,
          client_secret: process.env.REACT_APP_SECRET_KEY,
          page: 1,
          per_page: 30,
          query: query
        }
      })
      .then(res => {
        if (res.data.total !== 0) {
          setUsers(res.data.results);
          setIsLoaded(true);
          setSearch(false);
        } else {
          setIsLoaded(true);
          setSearch(false);
          setUsers([]);
          message.info('No Users');
        }
      })
      .catch(err => {
        setIsLoaded(true);
        setSearch(false);
        message.error(`An error occurred while fetching users: ${err.message}`);
      });
    }
  }, [query, search]);

  useEffect(() => {  
    const timer = setTimeout(() => fetchUsers(), 1000);
    return () => {
      clearTimeout(timer);
    }
  }, [ fetchUsers ]);  

  return (
    <div className="sider">
      <Input.Search
        placeholder="input search text"
        onSearch={(val) => { searchUser(val) }}
        enterButton
      />
      <div className="user-list">
        {loaded
          ? users.map((user, index) => (<UserItem user={user} key={index} />))
          : <div className="loading"><Spin /></div>}
      </div>
    </div>
  )
}

export default Sider;
