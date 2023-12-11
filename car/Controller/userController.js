const fs = require("fs");
var path = require("path");
const userlist = (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data/user.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        res.end(500);
      } else {
        res.end(data);
      }
    }
  );
};
// 添加;
const addCar = (req, res) => {
  console.log(req.body);
  let add = req.body;
  console.log(add);
  fs.readFile(
    path.join(__dirname, "../data/user.json"),
    "utf-8",
    function (err, data) {
      if (err) {
        res.statusCode = 500;
        res.end("失败");
      } else {
        let car = JSON.parse(data);
        console.log(car);
        car.list.push(add);
        fs.writeFile(
          path.join(__dirname, "../data/user.json"),
          JSON.stringify(car),
          "utf-8",
          function (err) {
            if (err) {
              res.statusCode = 500;
              res.end("写入失败");
            } else {
              res.statusCode = 200;
              res.end("添加成功");
            }
          }
        );
      }
    }
  );
};
// 删除用户;
const deleteUser = (req, res) => {
  let id = req.url.split("?")[1].split("=")[1];
  let data = JSON.parse(userList());
  console.log(data);
  let index = data.list.findIndex((item) => item.id == id);
  if (index == -1) {
    res.statusCode = 200;
    res.end(JSON.stringify({ msg: "未找到数据" }));
  }
  data.list.splice(index, 1);
  let dataStr = JSON.stringify(data);
  console.log(dataStr);
  fs.writeFile(path.join(__dirname, "../data/user.json"), dataStr, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end(JSON.stringify({ msg: "删除失败" }));
    }
    res.statusCode = 200;
    res.end(JSON.stringify({ msg: "删除成功" }));
  });
};
//修改
const modifyCar = (req, res) => {};
//搜索
const searchCar = (req, res) => {};

function userList() {
  let data = fs.readFileSync(
    path.join(__dirname, "../data/user.json"),
    "utf-8"
  );
  return data;
}
module.exports = {
  userlist,
  deleteUser,
  addCar,
  modifyCar,
  searchCar,
};
