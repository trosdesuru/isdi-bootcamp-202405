# -v: path -X: Method -d: parameters .json format
curl -v http://localhost:8080/users/authenticate.user -X POST -d '{"username":"brunodiaz", "password":"123123123"}'