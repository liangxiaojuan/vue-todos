import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import {
  Todos
} from './data/todoList';
export default {
  /**
   * mock bootstrap
   */
  start() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });
    // 获取todo列表
    mock.onGet('/todo/list').reply(config => {
      let mockTodo = Todos.map(tode => {
        return {
          id: tode.id,
          title: tode.title,
          count: tode.record.filter((data) => {
            if (data.checked === false) return true;
            return false;
          }).length,
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
        }, 200);
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
      let todo = Todos.filter(tode => {
        if (id && tode.id === id) return true;
        return false;
      })[0];
      todo.count = todo.record.filter((data) => {
        if (data.checked === false) return true;
        return false;
      }).length;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            tode: todo
          }]);
        }, 200);
      });
    });

    // 新增一条todo
    mock.onPost('/todo/addTodo').reply(config => {
      Todos.push({
        id: Mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
    // 新增一条代办事项
    mock.onPost('/todo/addRecord').reply(config => {
      let {
        id,
        text
      } = JSON.parse(config.data);
      Todos.some((t, index) => {
        if (t.id === id) {
          t.record.push({
            text: text,
            isDelete: false,
            checked: false
          });
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });

    // 修改标题
    mock.onPost('/todo/editTodo').reply(config => {
      let {
        todo
      } = JSON.parse(config.data);
      Todos.some((t, index) => {
        if (t.id === todo.id) {
          t.title = todo.title;
          t.locked = todo.locked;
          t.isDelete = todo.isDelete;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
    // 修改标题
    mock.onPost('/todo/editRecord').reply(config => {
      let {
        id,
        record,
        index
      } = JSON.parse(config.data);
      Todos.some((t) => {
        if (t.id === id) {
          t.record[index] = record;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
  }
};
