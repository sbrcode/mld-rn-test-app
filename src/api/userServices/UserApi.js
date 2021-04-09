import Api from '../../api/api';

const loginUser = async (login, password) => {
  try {
    Api.setUserCredentials(login, password);
    // TODO change the WS url and body
    // const res = await Api.post("/.......", {
    //   login: login,
    //   password: password,
    // });
    const res = { user: { name: 'testUser' }, token: 'testToken' };
    return res;
  } catch (e) {
    return { error: { message: e.message } };
  }
};

export default {
  loginUser,
};
