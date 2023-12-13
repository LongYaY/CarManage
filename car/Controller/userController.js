const fs = require("fs");
var path = require("path");
const file = path.join(__dirname, "../data/user.json");
const userlist = (req, res) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      res.end(500);
    } else {
      res.end(data);
    }
  });
};
// 添加;
const addCar = (req, res) => {
  console.log(req.body);
  let add = req.body;
  // console.log(add);
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) {
      res.statusCode = 500;
      res.end("失败");
    } else {
      let car = JSON.parse(data);
      // console.log(car);
      car.list.push(add);
      fs.writeFile(file, JSON.stringify(car), "utf-8", function (err) {
        if (err) {
          res.statusCode = 500;
          res.end("写入失败");
        } else {
          res.statusCode = 200;
          res.end("添加成功");
        }
      });
    }
  });
};
// 删除用户;
const deleteUser = (req, res) => {
  let id = req.url.split("?")[1].split("=")[1];
  let data = JSON.parse(userList());
  // console.log(data);
  let index = data.list.findIndex((item) => item.idcard == id);
  if (index == -1) {
    res.statusCode = 200;
    res.end(JSON.stringify({ msg: "未找到数据" }));
  }
  data.list.splice(index, 1);
  let dataStr = JSON.stringify(data);
  // console.log(dataStr);
  fs.writeFile(file, dataStr, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end(JSON.stringify({ msg: "删除失败" }));
    }
    res.statusCode = 200;
    res.end(JSON.stringify({ msg: "删除成功" }));
  });
};
//详情
const detailsCar = (req, res) => {
  let id = req.url.split("?")[1].split("=")[1];
  console.log(id);
  let data = JSON.parse(userList());
  console.log(data);
  let details = data.list.find((item) => item.idcard == id);
  if (!details) {
    res.statusCode = 200;
    res.end(JSON.stringify({ msg: "未找到数据" }));
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify(details));
  res.json({
    code: 200,
    msg: "查询成功",
  });
};
//修改
const modifyCar = (req, res) => {
  let id = req.url.split("?")[1].split("=")[1];
  console.log(id);
  let data = req.body;
  console.log(data);
  let datalist = getCarData();
  console.log(datalist);
  let index = datalist.data.findIndex((item) => item.idcard == id);
  console.log(index);
  if (index == -1) {
    res.json({
      code: 404,
      msg: "未找到数据",
    });
  }
  datalist[index] = {
    ...datalist[index],
    ...data,
  };
  witeData(datalist);
  res.json({
    code: 200,
    msg: "修改成功",
  });
};

//搜索
const searchCar = (req, res) => {
  // res.json({
  //   code: 200,
  //   msg: "搜索成功",
  // });
  let id = ("utf-8", req.url.split("?")[1].split("=")[1]);
  console.log(decodeURIComponent(id));
  let data = JSON.parse(userList());
  let datali = data.list.filter((item) =>
    item.brand.includes(decodeURIComponent(id))
  );
  console.log(datali);
  if (!datali) {
    res.statusCode == 200;
    res.end(JSON.stringify({ msg: "未找到数据" }));
    return;
  }
  res.statusCode == 200;
  res.end(JSON.stringify(datali));
  res.json({ code: 200, msg: "查询成功" });
};

const witeData = (data) => {
  fs.writeFileSync(file, JSON.stringify({ list: data }));
  return;
};
const getCarData = (page = 1, size) => {
  let data = fs.readFileSync(file, "utf-8");
  data = JSON.parse(data).list;
  size = size || data.length;
  if (page && size) {
    data.data = data.slice((page - 1) * size, page * size);
  }
  return data;
};
function userList() {
  let data = fs.readFileSync(file, "utf-8");
  return data;
}
module.exports = {
  userlist,
  deleteUser,
  addCar,
  detailsCar,
  modifyCar,
  searchCar,
};
