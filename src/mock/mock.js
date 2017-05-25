import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  LoginUsers
} from './data/user';
// let _Users = Users;
import {
  Todos
} from './data/todoList';
console.log(Todos);
export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    // 登录
    mock.onPost('/login').reply(config => {
      let {
        username,
        password
      } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          console.log(LoginUsers);
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, {
              code: 200,
              msg: '请求成功',
              user
            }]);
          } else {
            resolve([200, {
              code: 500,
              msg: '账号或密码错误'
            }]);
          }
        }, 1000);
      });
    });

    // 获取todo列表
    mock.onGet('/todo/list').reply(config => {
      let mockTodo = Todos.map(tode => {
        return {
          id: tode.id,
          title: tode.title,
          count: tode.count,
          locked: tode.locked,
          isDelete: tode.isDelete
        };
      }).filter(tode => {
        if (tode.isDelete === true) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todos: mockTodo
          }]);
        }, 1000);
      });
    });
    // 获取todo单个列表
    mock.onGet('/todo/listId').reply(config => {
      let {
        id
      } = config.params;
      // Todos.some(t => {
      //   if (t.id === id) {
      //     return true;
      //   }
      // });
      let tode = Todos.filter(tode => {
        if (id && tode.id === parseInt(id)) return true;
        return false;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            tode: tode[0]
          }]);
        }, 200);
      });
    });

    // 新增一条代办事项
    mock.onPost('/todo/addLocked').reply(config => {
      let {
        id,
        text
      } = JSON.parse(config.data);
      console.log(text);
      Todos.some((t, index) => {
        if (t.id === id) {
          console.log(Todos[index].record);
          t.record.push({
            text: text,
            isDelete: false,
            checked: false
          });
           t.count = t.count + 1;
          // console.log(t);
          // let =
          // t.record = t.record.push({
          //   text: text,
          //   isDelete: false,
          //   checked: false
          // });
          return true;
        }
      });
      console.log(Todos);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
  }
};
