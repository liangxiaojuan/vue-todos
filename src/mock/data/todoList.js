 import Mock from 'mockjs';
 let Todos = [];
 let COUNT = [1, 2, 3, 4, 5];
 for (let i = 1; i <= 10; i++) {
   Todos.push(Mock.mock({
     id: i,
     title: Mock.Random.first(),
     count: 5,
     isDelete: false,
     locked: Mock.Random.boolean(),
     record: COUNT.map(() => {
       return {
         text: Mock.Random.cparagraph(2),
         isDelete: Mock.Random.boolean(),
         checked: false
       };
     })
   }));
 }
 export {
   Todos
 };
