const getUserId = (users, text) => {
  const user = users.filter(user => user.name === text);
  return user[0].userId;
};

export default getUserId;
