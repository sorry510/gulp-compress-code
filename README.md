## init
1. git clone xxx
2. npm/cnpm install --global gulp-cli # 全局安装gulp
3. npm/cnpm install or yarn

## use

1. 填写 config.js
2. cp .env.example .env 在.env文件中将你需要的压缩内容填写为1，不需要的填写为0
3. 在本项目根目录下执行命令
```
gulp
```

## example
直接执行命令gulp，可以在dist目录看到结果

## bug
如果需要打包的js文件，不再此项目下，会报找不到`uglifyify`的错,暂时无法解决

```
Error: Cannot find module 'uglifyify'
```